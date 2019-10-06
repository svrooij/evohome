import {Units} from './units'
export interface Weather {
  condition: string;
  temperature: number;
  units: Units;
  humidity: number;
  phrase: string;
}