export class TaskModel {
  id: number;
  title: string;
  date: number;
  isDone: boolean;

  constructor(data: any = {}) {
    this.id = data.id ||  '';
    this.title = data.title || '';
    this.date = data.date || this.getCurrentDateInUTC();
    this.isDone = data.isDone || false;
  }

  getCurrentDateInUTC(): number {
    const date = new Date();
    return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  }
}
