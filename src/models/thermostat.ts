import { HeatSetpoint } from './heatsetpoint'
import { Units } from './units';

export interface ChangeableValues {
  mode: string;
  heatSetpoint: HeatSetpoint;
  vacationHoldDays: number;
}

/**
 * A thermostat is the object defining the thermostat properties of a device.
 *
 * @export
 * @interface EvohomeThermostat
 */
export interface EvohomeThermostat {
  units: Units;
  indoorTemperature: number;
  allowedModes: string[];
  minHeatSetpoint: number;
  maxHeatSetpoint: number;
  changeableValues: ChangeableValues;
  scheduleCapable: boolean;
  vacationHoldChangeable: boolean;
  vacationHoldCancelable: boolean;
  scheduleHeatSp: number;
}