import { loadFirebase } from "libs/firebase";
import { deleteAccountInfo } from "./db";
const { firebase } = loadFirebase();
export const auth = firebase.auth();
export default auth;


type Props1 = {
  email: string,
  password: string,
  rememberMe: boolean
}
export const signInWithEmailAndPassword = async ({ email, password, rememberMe }: Props1) => {
  try {
    const authPersistence =
      rememberMe ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.NONE
    const userCred = await firebase.auth().setPersistence(authPersistence)
      .then(() => {
        return auth.signInWithEmailAndPassword(email, password)
      })
    return { user: userCred.user, error: "" }
  } catch (error) {
    switch (error.code) {
      case 'auth/invalid-email':
        return { user: null, error: "入力されたメールアドレスは有効ではありません" }
      case 'auth/wrong-password':
        return { user: null, error: "入力されたパスワードが正しくありません" }
      case 'auth/user-not-found':
        return { user: null, error: "入力されたメールアドレスのユーザーは登録されていません。未登録の場合は新規アカウント登録をお願いします" }
      default:
        return { user: null, error: `エラー【${error.code}】：${error.message}` }
    }
  }
}

export const logOut = () => {
  auth.signOut()
}

export const signUpWithEmailAndPassword =
  async ({ email, password, rememberMe }: Props1) => {
    try {
      const authPersistence =
        rememberMe ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.NONE
      const userCred = await firebase.auth().setPersistence(authPersistence)
        .then(() => {
          return auth.createUserWithEmailAndPassword(email, password)
        })
      return { user: userCred.user, error: "" }
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          return { user: null, error: "入力されたメールアドレスは有効ではありません" }
        case 'auth/email-already-in-use':
          return { user: null, error: "入力されたメールアドレスは既に使用されています" }
        case 'auth/weak-password':
          return { user: null, error: "安全性の低いパスワードのため登録できません。パスワードは6文字以上である必要があります" }
        default:
          return { user: null, error: `エラー【${error.code}】：${error.message}` }
      }
    }
  }

type Props = {
  email: string,
}
export const resetPassword = async ({ email }: Props) => {
  try {
    await auth.sendPasswordResetEmail(email)
    return { res: "リセット成功", error: "" }
  } catch (error) {
    switch (error.code) {
      case 'auth/invalid-email':
        return { res: null, error: "入力されたメールアドレスは有効ではありません" }
      case 'auth/user-not-found':
        return { res: null, error: "そのメールアドレスで登録されているアカウントはありません" }
      default:
        return { res: null, error: `エラー【${error.code}】：${error.message}` }
    }
  }
}

export const deleteAccountAndInfo = async () => {
  try {
    const user = await auth.currentUser;
    if (!user) throw new Error("no user");
    await deleteAccountInfo(user.uid)
    await user.delete()
    return { res: "アカウント削除成功", error: "" }
  } catch (error) {
    switch (error.code) {
      case 'auth/requires-recent-login':
        return { res: null, error: "この操作は重要なためログイン後一定時間以内しか行えません。お手数ですが再ログインをお願いします" }
      default:
        return { res: null, error: `エラー【${error.code}】：${error.message}` }
    }
  }
}