import {get, post, put} from './http'
import { EvohomeSession, LoginRequest, EvohomeLocation, HeatSetpointStatus, HeatSetpoint, EvohomeDevice } from './models'
export class EvohomeClient {
  private readonly applicationId: string;
  private readonly username: string;
  private readonly password: string;
  private session: EvohomeSession | undefined;
  private locations: EvohomeLocation[] = [];

  constructor (username: string, password: string, applicationId: string = '91db1612-73fd-4500-91b2-e63b069b185c') {
    this.applicationId = applicationId;
    this.username = username;
    this.password = password;
  }

  async login() : Promise<EvohomeSession | undefined> {
    let loginRequest = new LoginRequest(this.username, this.password, this.applicationId);

    return post<EvohomeSession>(
      'https://mytotalconnectcomfort.com/WebAPI/api/Session',
      loginRequest,
      {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
      .then(result => {
        return result.parsedBody;
      })
      .then((result) => {
        this.session = result;
        return result;
      })
  }

  private async getHeaders(): Promise<HeadersInit> {
    return new Headers({
      'Accept': 'application/json',
      'sessionID': this.session !== undefined ? this.session.sessionId : ''
    });
  }

  async getLocations(): Promise<EvohomeLocation[] | undefined> {
    if (this.session === undefined) throw new Error('Login first')
    return get<EvohomeLocation[]>(
      `https://mytotalconnectcomfort.com/WebAPI/api/locations?userId=${this.session.userInfo.userID}&allData=True`,
      await this.getHeaders()
    )
    .then(result => result.parsedBody)
    .then(result => {
      if(result !== undefined)
        this.locations = result;
      return result;
    })
  }

  async setHeatSetpoint(deviceId: number, status: HeatSetpointStatus, targetTemperature?: number, minutes?: number): Promise<boolean> {
    const heatPointRequestBody = new HeatSetpoint(status, targetTemperature, minutes);
    return put<{id: number}>(
      `https://tccna.honeywell.com/WebAPI/api/devices/${deviceId}/thermostat/changeableValues/heatSetpoint`,
      heatPointRequestBody,
      await this.getHeaders()
    )
    .then(result => result.ok)
  }
}

