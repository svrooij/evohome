import { IHeatSetpoint } from './heatsetpoint'
import { Units } from './units';

export interface ChangeableValues {
  mode: string;
  heatSetpoint: IHeatSetpoint;
  vacationHoldDays: number;
}

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