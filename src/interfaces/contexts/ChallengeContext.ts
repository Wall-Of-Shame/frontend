import {
  ChallengeData,
  ChallengeList,
  ChallengePost,
} from "../models/Challenges";

export default interface ChallengeContextInterface {
  getAllChallenges(): Promise<ChallengeList>;
  getChallenge(id: string): Promise<ChallengeData | null>;
  createChallenge(data: ChallengePost): Promise<void>;
}
