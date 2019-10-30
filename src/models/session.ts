export interface UserInfo {
  userID: number;
  username: string;
  firstname: string;
  lastname: string;
  streetAddress: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  telephone: string;
  userLanguage: string;
  isActivated: boolean;
  deviceCount: number;
  tenantID: number;
  securityQuestion1: string;
  securityQuestion2: string;
  securityQuestion3: string;
  latestEulaAccepted: boolean;
}
/**
 * The session contains a lot of information about the user. We use the SessionId and the userInfo.UserID
 *
 * @export
 * @interface EvohomeSession
 */
export interface EvohomeSession {
  sessionId: string;
  userInfo: UserInfo;
}