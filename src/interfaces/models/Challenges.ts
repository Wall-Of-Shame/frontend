import { AvatarAnimal, AvatarColor, UserList } from "./Users";

export interface ChallengeId {
  challengeId: string;
}

export type ChallengeType = "LAST_TO_COMPLETE" | "NOT_COMPLETED";

// Input schema for the `POST /challenges` route.
export interface ChallengePost {
  title: string;
  description?: string;
  startAt: string;
  endAt: string;
  type: ChallengeType;
  participants: string[];
}

// Return schema for the `GET /challenges/:challengeId` route.
export interface ChallengeData {
  challengeId: string;
  title: string;
  description?: string;
  startAt: string | null;
  endAt: string;
  participantCount: number;
  type: ChallengeType;
  hasReleasedResult: boolean;
  owner: DeepPartialUserMini;
  participants: {
    accepted: {
      completed: UserMini[];
      notCompleted: UserMini[];
    };
    pending: UserMini[];
  };
}

// Return schema for the `GET /challenges` route
export interface ChallengeList {
  ongoing: ChallengeData[];
  pendingResponse: ChallengeData[];
  pendingStart: ChallengeData[];
  history: ChallengeData[];
}

// Input schema for the `PATCH /challenges/:challengeId` route
export interface ChallengePatch {
  title?: string;
  description?: string;
  startAt?: string;
  endAt?: string;
  type?: ChallengeType;
  participants?: string[];
}

// Internal type. They do not match to any route specifically, but rather used to construct them.
export type UserMini = Pick<
  UserList,
  "userId" | "username" | "name" | "avatar"
> & {
  completedAt?: string;
  evidenceLink?: string;
};
// Deep partial of UserMini
// This is to support the corner case of user being able to create a challenge without having a username/name/avatar
// They should be prompted to add one asap
type DeepPartialUserMini = Pick<UserMini, "userId"> &
  Partial<Pick<UserMini, "username" | "name">> &
  {
    [P in keyof Pick<UserList, "avatar">]: Partial<Pick<UserList, "avatar">[P]>;
  };

export interface Shame {
  name: string;
  title: string;
  type: string;
  time: string;
  timestamp: number;
  avatar: {
    animal: AvatarAnimal;
    color: AvatarColor;
    background: string;
  };
}
