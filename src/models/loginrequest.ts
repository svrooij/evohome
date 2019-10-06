export class LoginRequest {
  Username: string;
  Password: string;
  ApplicaionID: string;
  constructor(username: string, password: string, applicationId: string) {
    this.Username = username;
    this.Password = password;
    this.ApplicaionID = applicationId;
  }
}