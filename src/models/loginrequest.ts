/**
 * Login request for the Evohome webservice, internal use.
 *
 * @export
 * @class LoginRequest
 */
export class LoginRequest {
  Username: string;
  Password: string;
  ApplicationID: string;
  constructor(username: string, password: string, applicationId: string) {
    this.Username = username;
    this.Password = password;
    this.ApplicationID = applicationId;
  }
}