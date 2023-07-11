import * as yup from 'yup';

export interface TodoFormModel {
  title: string;
  comment: string;
  isCompleted: boolean;
}

export const todoSchema = yup.object({
  title: yup.string().required(),
  comment: yup.string(),
  isCompleted: yup.boolean(),
});
