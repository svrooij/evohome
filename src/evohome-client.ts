import { get, post, put } from './http'
import { EvohomeSession, LoginRequest, EvohomeLocation, HeatSetpointStatus, HeatSetpointRequest } from './models'

/**
 * EvohomeClient is the main class of this library.
 *
 * @export
 * @class EvohomeClient
 */
export class EvohomeClient {
  private readonly applicationId: string;
  private readonly username: string;
  private readonly password: string;
  private session: EvohomeSession | undefined;
  private locations: EvohomeLocation[] = [];
  private logoutTimeout?: NodeJS.Timeout | undefined;
/**
 *Creates an instance of EvohomeClient.
 * @param {string} username Your Honeywell username.
 * @param {string} password Your Honeywell password.
 * @param {string} [applicationId='91db1612-73fd-4500-91b2-e63b069b185c'] The application ID (just leave the default).
 * @memberof EvohomeClient
 */
constructor (username: string, password: string, applicationId = '91db1612-73fd-4500-91b2-e63b069b185c') {
    this.applicationId = applicationId;
    this.username = username;
    this.password = password;
  }

  /**
   *Login to the Evohome api, and start auto logout.
   *
   * @param {number} [logoutInSeconds=3600] the number of seconds after which the session is cleared (not sure about default).
   * @returns {(Promise<EvohomeSession | undefined>)}
   * @memberof EvohomeClient
   */
  async login(logoutInSeconds = 3600): Promise<EvohomeSession | undefined> {
    const loginRequest = new LoginRequest(this.username, this.password, this.applicationId);

    return post<EvohomeSession, LoginRequest>(
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
        if (result === undefined) throw new Error('Login failed')
        this.session = result;
        if (logoutInSeconds > 30) this.logoutTimeout = setTimeout(this.clearLogin, logoutInSeconds * 1000);
        return result;
      })
  }

  private clearLogin(): void {
    this.session = undefined;
  }

  public exportSession(): EvohomeSession | undefined {
    return this.session;
  }

  public restoreSession(session: EvohomeSession): void {
    this.session = session;
  }

  public restoreSessionFromSessionIdAndUserId(sessionId: string, userId: number): void {
    this.session = {sessionId: sessionId, userInfo : { userID : userId }} as EvohomeSession;
  }

  private getHeaders(): {[index: string]: string} {

    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'sessionID': this.session !== undefined ? this.session.sessionId : ''
    };
  }


  /**
   *Get all the locations known in the Evohome webservice (you usually have just one, but can be multiple)
   *
   * @returns {(Promise<EvohomeLocation[] | undefined>)}
   * @memberof EvohomeClient
   */
  async getLocations(): Promise<EvohomeLocation[] | undefined> {
    if (this.session === undefined) throw new Error('Login first')
    return get<EvohomeLocation[]>(
      `https://mytotalconnectcomfort.com/WebAPI/api/locations?userId=${this.session.userInfo.userID}&allData=True`,
      this.getHeaders()
    )
    .then(result => result.parsedBody)
    .then(result => {
      if(result !== undefined)
        this.locations = result;
      return result;
    })
  }


  /**
   * Same as getLocations, with the addition of first trying to login if you don't have a session.
   *
   * @param {number} [logoutInSeconds=3600] the number of seconds after which the session is cleared (not sure about default).
   * @returns {(Promise<EvohomeLocation[] | undefined>)}
   * @memberof EvohomeClient
   */
  async getLocationsWithAutoLogin(logoutInSeconds = 3600): Promise<EvohomeLocation[] | undefined> {
    if (this.session === undefined) await this.login(logoutInSeconds);
    return this.getLocations();
  }


  /**
   * Set the HeatPoint for a thermostat
   *
   * @param {number} deviceId The device ID
   * @param {HeatSetpointStatus} status The new State
   * @param {number} [targetTemperature] new target temperature (required when state != Scheduled)
   * @param {number} [minutes] number of minutes to set this temperature (required when state === Temporary)
   * @returns {Promise<boolean>}
   * @memberof EvohomeClient
   */
  async setHeatSetpoint(deviceId: number, status: HeatSetpointStatus, targetTemperature?: number, minutes?: number): Promise<boolean> {
    const heatSetpointRequest = new HeatSetpointRequest(status, targetTemperature, minutes);
    return put<{id: number}, HeatSetpointRequest>(
      `https://tccna.honeywell.com/WebAPI/api/devices/${deviceId}/thermostat/changeableValues/heatSetpoint`,
      heatSetpointRequest,
      this.getHeaders()
    )
    .then(result => result.ok)
  }
}

