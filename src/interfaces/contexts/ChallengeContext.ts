import {
  ChallengeData,
  ChallengeList,
  ChallengePost,
} from "../models/Challenges";

export default interface ChallengeContextInterface {
  getAllChallenges(): Promise<ChallengeList>;
  getChallenge(id: string): Promise<ChallengeData | null>;
  createChallenge(data: ChallengePost): Promise<void>;
  updateChallenge(id: string, data: ChallengePost): Promise<void>;
  acceptChallenge(id: string): Promise<void>;
  rejectChallenge(id: string): Promise<void>;
  completeChallenge(id: string): Promise<void>;
  uploadProof(id: string, data: any): Promise<string | null>;
}
