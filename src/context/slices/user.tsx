import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "context/reduxStore";
import { AuthState, Profile } from "interfaces";
import firebase from "firebase/app";
import {
	deleteAccountAndInfo,
	logOut,
	signInWithEmailAndPassword,
	signUpWithEmailAndPassword,
} from "libs/firebase/auth";
import { fetchProfile, formatAuthState } from "libs/userInfo";
import { selectSignupWithDemo } from "./demo";

export type UserStatus =
	| "idle"
	| "loading"
	| "succeeded"
	| "failed"
	| "loggedOut";
interface InitialState {
	auth: AuthState | null;
	profile: Profile | null;
	rememberMe: boolean;
	status: UserStatus;
	error: string | undefined;
	isReady: boolean;
}
const initialState: InitialState = {
	auth: null,
	profile: null,
	rememberMe: true,
	status: "idle",
	error: "",
	isReady: false,
};

export const initUser = createAsyncThunk(
	"user/initUser",
	async ({ rawUser }: { rawUser: firebase.User }, { getState }) => {
		const signupWithDemo = selectSignupWithDemo(getState() as RootState);
		const authState = await formatAuthState(rawUser);
		const profile = await fetchProfile(authState, signupWithDemo);
		return { authState, profile };
	}
);

interface emailPayload {
	type: "email";
	email: string;
	password: string;
}
interface googlePayload {
	type: "google";
}
type LoginPayload<T extends "email" | "google"> = T extends "email"
	? emailPayload
	: googlePayload;
export const login = createAsyncThunk(
	"user/login",
	async (loginPayload: LoginPayload<"email" | "google">, { getState }) => {
		const rememberMe = selectRememberMe(getState() as RootState);
		let res: {
			user: firebase.User | null;
			error: string;
		};
		if (loginPayload.type === "email") {
			const { email, password } = loginPayload;
			res = await signInWithEmailAndPassword({
				email,
				password,
				rememberMe: rememberMe,
			});
		} else {
			return {
				user: null,
				error: "",
			};
		}
		return { error: res.error, hasUser: res.user?.uid };
	}
);

export const logout = createAsyncThunk("user/logout", async () => {
	logOut();
	return "done!";
});

export const deleteUser = createAsyncThunk("user/deleteUser", async () => {
	const res = await deleteAccountAndInfo();
	return res;
});

interface signupPayload {
	email: string;
	password: string;
}
export const signup = createAsyncThunk(
	"user/signup",
	async ({ email, password }: signupPayload, { getState }) => {
		const rememberMe = selectRememberMe(getState() as RootState);
		const { user, error } = await signUpWithEmailAndPassword({
			email,
			password,
			rememberMe: rememberMe,
		});
		return { error, hasUser: user?.uid };
	}
);

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setRememberMe(state, action: PayloadAction<boolean>) {
			state.rememberMe = action.payload;
		},
		setStatus(state, action: PayloadAction<UserStatus>) {
			state.status = action.payload;
		},
		startLoading(state) {
			state.isReady = false;
		},
		clearError(state) {
			state.error = "";
		},
		completeLoading(state) {
			state.isReady = true;
		},
		completeTutorial(state) {
			if (!state.profile) return;
			state.profile.isFirstLogin = false;
		},
	},
	extraReducers: (builder) => {
		function startLoading(state: InitialState, action: PayloadAction) {
			state.status = "loading";
			state.error = "";
		}
		function succeededLogin(state: InitialState, action: PayloadAction<any>) {
			// user取得時のstatus=succeededはinitUser()側で設定
			if (!action.payload.hasUser) {
				state.status = "failed";
				state.error = action.payload.error;
			} else {
				state.isReady = false;
			}
		}
		function failed(state: InitialState, action: any) {
			state.status = "failed";
			state.error = action.error.message;
		}
		builder
			.addCase(initUser.pending, startLoading)
			.addCase(login.pending, startLoading)
			.addCase(signup.pending, startLoading);
		builder.addCase(logout.pending, (state) => {
			state.status = "loading";
			state.error = "";
			state.isReady = false;
		});
		builder.addCase(initUser.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.auth = action.payload.authState;
			state.profile = action.payload.profile;
		});
		builder
			.addCase(login.fulfilled, succeededLogin)
			.addCase(signup.fulfilled, succeededLogin);
		builder.addCase(logout.fulfilled, (state) => {
			state.status = "loggedOut";
			state.auth = null;
			state.profile = null;
		});
		builder.addCase(deleteUser.fulfilled, (state, action) => {
			if (action.payload.error) {
				state.status = "failed";
				state.error = action.payload.error as string;
			} else {
				state.status = "loggedOut";
				state.auth = null;
				state.profile = null;
			}
		});
		builder
			.addCase(initUser.rejected, failed)
			.addCase(login.rejected, failed)
			.addCase(logout.rejected, failed)
			.addCase(signup.rejected, failed)
			.addCase(deleteUser.rejected, failed);
	},
});

export const {
	setRememberMe,
	setStatus,
	completeLoading,
	startLoading,
	completeTutorial,
	clearError,
} = userSlice.actions;
export default userSlice.reducer;

export const selectRememberMe = (state: RootState) => state.user.rememberMe;
export const selectStatus = (state: RootState) => state.user.status;
export const selectProfile = (state: RootState) => state.user.profile;
export const selectError = (state: RootState) => state.user.error;
export const selectAuthState = (state: RootState) => state.user.auth;
export const selectUid = (state: RootState) => state.user.auth?.user.uid;
export const selectIsReady = (state: RootState) => state.user.isReady;
