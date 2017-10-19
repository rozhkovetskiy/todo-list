export class TaskModel {
  id: number;
  title: string;
  date: Date;
  isDone: boolean;

  constructor(data: any = {}) {
    this.id = data.id || void 0;
    this.title = data.title || 'No title';
    this.date = new Date(data.date) || new Date();
    this.isDone = data.isDone || false;
  }
}
