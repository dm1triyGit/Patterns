import { InputComponent } from '@app/components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button } from '@mui/material';
import { useAppSelector } from '@app/stores';
import { useCreateTodoMutation, useEditTodoMutation } from '@app/stores/api';
import { ITodo } from '@app/shared/types';

interface TodoForm {
  title: string;
  comment: string;
  isCompleted: boolean;
}

const schema = yup.object({
  title: yup.string().required(),
  comment: yup.string(),
  isCompleted: yup.boolean(),
});

export const TodoForm = (): JSX.Element => {
  const [createTodo, createResponse] = useCreateTodoMutation();
  const [editTodo, editResponse] = useEditTodoMutation();

  const { editedItem } = useAppSelector(state => state.todos);
  const { control, reset, formState, handleSubmit } = useForm<TodoForm>({
    defaultValues: {
      title: editedItem?.title ?? '',
      comment: editedItem?.comment ?? '',
      isCompleted: false,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: TodoForm): void => {
    if (!!editedItem) {
      editTodo(data).then(() => reset());
      return;
    }

    const newTodo: Omit<ITodo, 'id'> = { ...data, createdDate: new Date() };
    createTodo(newTodo).then(() => reset());
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <InputComponent
        formControl={control}
        name="title"
        type="text"
        id="title-input"
        style={{ mb: 4 }}
        placeholoder="title"
        error={!!formState.errors.title}
        errorMessage={
          !!formState.errors.title ? formState.errors.title.message : undefined
        }
      />
      <InputComponent
        formControl={control}
        name="comment"
        type="text"
        id="comment-input"
        style={{ mb: 4 }}
        placeholoder="comment"
        error={!!formState.errors.comment}
        multiline
        errorMessage={
          !!formState.errors.comment
            ? formState.errors.comment.message
            : undefined
        }
      />
      <Button type="submit" variant="contained">
        Сохранить
      </Button>
    </Box>
  );
};
