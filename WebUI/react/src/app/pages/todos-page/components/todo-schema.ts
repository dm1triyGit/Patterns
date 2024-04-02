import * as yup from 'yup';

export interface TodoFormModel {
  title: string;
  comment: string | undefined;
  reminderDate: Date | undefined;
}

export const todoSchema = yup.object({
  title: yup.string().required(),
  comment: yup.string(),
  reminderDate: yup.date().min(new Date(), 'дата не ранее сегодняшего дня'),
});
