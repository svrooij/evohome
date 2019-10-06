import { EvohomeDevice } from './device'
import { Weather } from './weather'
export interface EvohomeLocation {
  locationID: number;
  name: string;
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  type: string;
  hasStation: boolean;
  devices: EvohomeDevice[];
  // oneTouchButtons: any[];
  weather: Weather,
  daylightSavingTimeEnabled: boolean;
  // timeZone;
  oneTouchActionsSuspended: boolean;
  isLocationOwner: boolean;
  locationOwnerID: number;
  locationOwnerName: string;
  locationOwnerUserName: string;
  canSearchForContractors: boolean;
}