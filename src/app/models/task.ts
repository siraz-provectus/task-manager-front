export class Task{
  constructor(
      public id?: number,
      public title?: string,
      public description?: string,
      public status?: string,
      public rating?: number,
      public reporter_id?: number,
      public assigned_to?: number,
      public assigned_by?: number
  ) {  }
}