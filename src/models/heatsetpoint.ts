export enum HeatSetpointStatus {
  Temporary,
  Hold,
  Scheduled
}

export interface IHeatSetpoint {
  Value?: number;
  Status: HeatSetpointStatus;
  NextTime?: Date;
}

export class HeatSetpoint implements IHeatSetpoint {
  Value?: number;  
  Status: HeatSetpointStatus;
  NextTime?: Date;
  constructor(status: HeatSetpointStatus, value?: number, minutes?: number) {
    this.Status = status;
    if (status !== HeatSetpointStatus.Scheduled) {
      if (value === null) throw new Error('value should be set');
      this.Value = value;

      if (status === HeatSetpointStatus.Temporary) {
        if (minutes === null || minutes === undefined) throw new Error('minutes is required')
        const now = new Date();
        const timezoneOffsetInMinutes = now.getTimezoneOffset();
        this.NextTime = new Date(now);
        this.NextTime.setMinutes(now.getMinutes() - timezoneOffsetInMinutes + minutes);
        this.NextTime.setSeconds(0);
        this.NextTime.setMilliseconds(0);
      }

    }
  }
}