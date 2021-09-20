import { ChallengeData, ChallengePost } from "../models/Challenges";

export default interface ChallengeContextInterface {
  getAllChallenges(): Promise<ChallengeData[]>;
  getChallenge(id: string): Promise<ChallengeData | null>;
  createChallenge(data: ChallengePost): Promise<void>;
}
