export interface ITodo {
  id: number;
  title: string;
  comment: string;
  createdDate: Date;
  isCompleted: boolean;
  reminderDate?: Date;
}
