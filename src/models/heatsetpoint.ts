import { HeatSetpointStatus } from "./heatsetpointstatus";

export interface HeatSetpoint {
  value?: number;
  status: HeatSetpointStatus;
  nextTime?: Date;
}
