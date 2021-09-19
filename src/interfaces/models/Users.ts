export interface UserData {
  userId: string;
  email: string;
  username: string;
  name?: string;
  completedChallengeCount: number;
  failedChallengeCount: number;
  settings: Settings;
}

export interface UserPatchData {
  username: string;
  name?: string;
  settings: Settings;
}

export interface Settings {
  deadlineReminder: boolean;
  invitations: boolean;
}

export interface Avatar {
  animal: "CAT" | "DOG" | "RABBIT";
  color: string;
  background: string;
}
