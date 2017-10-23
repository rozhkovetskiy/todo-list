export class TaskModel {
  id: number;
  title: string;
  date: Date;
  isDone: boolean;

  constructor(data: any = {}) {
    this.id = data.id ||  Math.floor(Math.random() * (10000 - 10 + 1)) + 10;
    this.title = data.title || '';
    this.date = data.date || new Date();
    // this.date = new Date(data.date)
    // this.date = data.date ? new Date(data.date) : new Date();
    this.isDone = data.isDone || false;
  }
}
