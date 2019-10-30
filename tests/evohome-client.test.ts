import  { EvohomeClient, HeatSetpointStatus } from '../src/index'
const snooze = (ms: number)=> new Promise(resolve => setTimeout(resolve, ms));

describe("EvohomeClient", () => {
  let client: EvohomeClient;

  // If your Environment contains the credentials, it will test the actual service.
  const username: string | undefined = process.env.EVOHOME_USERNAME;
  const password: string | undefined = process.env.EVOHOME_PASSWORD;
  const haveCredentials: boolean = (username != undefined && password != undefined);

  beforeAll(() => {
    if (haveCredentials) {
      client = new EvohomeClient(username!, password!);
    }
  })

  it('is instantiable', () => {
    expect(new EvohomeClient('test', 'test')).toBeInstanceOf(EvohomeClient)
  })

  if (haveCredentials) {
    it('works', async () => {
      
      // First login
      const loginResult = await client.login(0);
      expect(loginResult).toBeDefined();

      // Try to load data
      let locationsResult = await client.getLocations();
      //console.log(JSON.stringify(locationsResult, null, 2));
      expect(locationsResult).toBeDefined();

      if(locationsResult!.length > 0) {
        let office = locationsResult![0].devices.find(d => d.name === 'Kantoor');
        expect(office).toBeDefined();
        if (office != undefined) {
          console.log('Setting HeatSetpoint to 18 for Office')
          const setTempResult = await client.setHeatSetpoint(office.deviceID, HeatSetpointStatus.Temporary, 18, 5);
          expect(setTempResult).toBe(true);
          locationsResult = await client.getLocations();
          office = locationsResult![0].devices.find(d => d.name === 'Kantoor');
          console.log(JSON.stringify(office, null, 2))
          const setTemp = office!.thermostat.changeableValues.heatSetpoint.value;
          expect(setTemp).toBe(18);
        }
      }

    })
  } else {
    it.skip('works', () => {})
  }
})
