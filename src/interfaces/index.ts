export declare interface AppProps {
  children: React.ReactNode; // best, accepts everything (see edge case below)
  functionChildren?: (name: string) => React.ReactNode; // recommended function as a child render prop type
  // functionChildren: (name: string) => React.ReactNode; // recommended function as a child render prop type
  style?: React.CSSProperties; // to pass through style props
  onChange?: React.FormEventHandler<HTMLInputElement>; // form events! the generic parameter is the type of event.target
  //  more info: https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/#wrappingmirroring
}

export type AuthState = {
  user: {
    uid: string;
    email: string | null;
    name: string | null;
    provider: string | undefined;
    photoUrl: string | null;
  };
};
export interface Profile {
  createdAt: string;
  name: string;
  isFirstLogin: boolean;

};
export type UserState = AuthState & {
  profile: Profile;
  loading: boolean,
  rememberMe: boolean
};

export interface HappinessCategory {
  id: number,
  emoji: string,
  name: string
  examples: string[]
}

export type TextFieldKey =
  "title" | "detail" | "feelingAt" | "feelingAfter" | "whySuccessed";
export type TextFieldLabel =
  "今日あった良かったこと" | "できごとの詳細" | "その時の気分" | "その後の気分" | "どうして上手くいったのか";
export type FieldKey =
  "category" | TextFieldKey;

export interface TextField<N, L, T> {
  name: N
  label: L,
  value: string,
  type: T,
}
export type Event = {
  id: number,
  category: HappinessCategory | null,
  textFields: [
    TextField<"title", "今日あった良かったこと", "main">,
    TextField<"detail", "できごとの詳細", "detail">,
    TextField<"feelingAt", "その時の気分", "detail">,
    TextField<"feelingAfter", "その後の気分", "detail">,
    TextField<"whySuccessed", "どうして上手くいったのか", "detail">,
  ]
}
export type DiaryDate = {
  seconds: number,
  nanoseconds: number
}

export interface Diary {
  date: DiaryDate,
  events: Event[]
}

export type EventDetailLabel =
  "できごとの詳細" |
  "その時とその後の気分" |
  "どうして上手くいったのか"

export type DiariesState = {
  dividedDiariesByMonth: Diary[][];
  selectedPeriod: string;
  lastDate: number | null;
  updatedDiaries: Diary[];
  initialDiaries: Diary[];
  loading: boolean;
};