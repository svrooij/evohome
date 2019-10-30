import {Units} from './units'
/**
 * Honeywell loads the weather for your location, use to your liking.
 *
 * @export
 * @interface Weather
 */
export interface Weather {
  condition: string;
  temperature: number;
  units: Units;
  humidity: number;
  phrase: string;
}