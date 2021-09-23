// Partial response schema for the `GET /users` route.
// Full response is Array<UserList>
// Partial response schema for the `GET /users` route.
// Full response is Array<UserList>
export interface UserList {
  userId: string;
  name: string;
  username: string;
  completedChallengeCount: number;
  failedChallengeCount: number;
  avatar: Avatar;
}

// Return schema for the `GET /self` route.
export interface UserData {
  userId: string;
  email: string;
  username?: string;
  name?: string;
  completedChallengeCount?: number;
  failedChallengeCount?: number;
  vetoedChallengeCount?: number;
  avatar: Avatar;
  settings: {
    deadlineReminder: boolean;
    invitations: boolean;
  };
}

// Partial return schema for the `GET /self/friends` route.
// Full response is Array<UserList>
export interface UserFriends {
  userId: string;
  name: string;
  username: string;
  befriendedAt: string;
  avatar: Avatar;
}

// Input schema for the `PATCH /self` route.
export interface UserPatch {
  name: string;
  username: string;
  avatar: Avatar;
  settings: {
    deadlineReminder?: boolean;
    invitations?: boolean;
  };
}

export interface Avatar {
  animal: AvatarAnimal;
  color: AvatarColor;
  background: string;
}

export interface Settings {
  deadlineReminder: boolean;
  invitations: boolean;
}

export type AvatarAnimal = "CAT" | "DOG" | "RABBIT";
export type AvatarColor = "PRIMARY" | "SECONDARY" | "TERTIARY";
