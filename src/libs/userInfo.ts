import { format, addMonths, startOfMonth } from "date-fns";
import { AuthState, Profile } from "interfaces";
import { getUserProfile, setNewProfile } from "./firebase/db";
import firebase from "firebase/app";

export const getMonthsAfterSignUp = (oldestSeconds: undefined | number) => {
  if (!oldestSeconds) return []
  const oldestDiaryDate = new Date(oldestSeconds * 1000)
  let currentDate = startOfMonth(oldestDiaryDate)
  let months = []
  while (currentDate < new Date()) {
    months.push(format(currentDate, "yyyy/MM"))
    currentDate = addMonths(currentDate, 1)
  }
  return months.reverse()
}

export const formatAuthState = (user: firebase.User): AuthState => {
  return {
    user: {
      uid: user.uid,
      email: user.email,
      name: user.displayName || user.email,
      provider: user.providerData[0]?.providerId,
      photoUrl: user.photoURL,
    },
  };
};

export const fetchProfile = async (authState: AuthState, doneDemo: boolean): Promise<Profile> => {
  let userProfile = await getUserProfile(authState.user.uid);
  if (!userProfile) {
    userProfile = await setNewProfile(authState, doneDemo);
  }
  return userProfile;
};