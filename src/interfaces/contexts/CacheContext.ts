export default interface CacheContextInterface {
  isLatestVersion: boolean;
  refreshCacheAndReload: () => void;
}
