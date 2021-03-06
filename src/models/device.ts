import { EvohomeThermostat } from "./thermostat";
/**
 * Evohome device, gives details about a device.
 *
 * @export
 * @interface EvohomeDevice
 */
export interface EvohomeDevice {
  gatewayID: number;
  deviceID: number;
  thermostatModelType: string;
  deviceType: number;
  name: string;
  scheduleCapable: boolean;
  holdUntilCapable: boolean;
  thermostat: EvohomeThermostat;
  // alertSettings
  isUpgrading: boolean;
  isAlive: boolean;
  thermostatVersion: string;
  macID: string;
  locationID: number;
  domainID: number;
  instance: number;
}