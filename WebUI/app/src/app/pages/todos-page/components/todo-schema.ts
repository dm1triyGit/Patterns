import * as yup from 'yup';

export interface TodoFormModel {
  title: string;
  comment: string | undefined;
  isCompleted: boolean | undefined;
}

export const todoSchema = yup.object({
  title: yup.string().required(),
  comment: yup.string(),
  isCompleted: yup.boolean(),
});
