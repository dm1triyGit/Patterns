import { InputComponent } from '@app/components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
import { useAppSelector } from '@app/stores';
import { useEffect } from 'react';
import { TodoFormModel, todoSchema } from './todo-schema';
import { useSubmitForm } from '../hooks';
import { Dayjs } from 'dayjs';

const defaultValues: TodoFormModel = {
  title: '',
  comment: '',
  reminderDate: new Date(),
};

export const TodoForm = (): JSX.Element => {
  const { editedItem } = useAppSelector(state => state.todos);
  const { control, reset, formState, handleSubmit, setValue, watch } =
    useForm<TodoFormModel>({
      defaultValues,
      resolver: yupResolver(todoSchema),
    });

  useEffect(() => {
    if (editedItem) {
      setValue('title', editedItem.title);
      setValue('comment', editedItem.comment);
      setValue('reminderDate', editedItem.reminderDate);
    }
  }, [editedItem]);

  const { onSubmit, resetEditForm } = useSubmitForm({
    todo: editedItem,
    resetForm: reset,
  });

  const datePickerChangeHandler = (value: unknown) => {
    const date = (value as Dayjs).toDate();
    setValue('reminderDate', date);
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

      <InputComponent
        type="date"
        name="reminderDate"
        id="reminderDate"
        style={{ mb: 4 }}
        formControl={control}
        placeholoder="Дата напоминания"
        dateValue={watch('reminderDate')}
        onDateChange={datePickerChangeHandler}
        minDateValue={new Date()}
        error={!!formState.errors.reminderDate}
        errorMessage={
          !!formState.errors.reminderDate
            ? formState.errors.reminderDate.message
            : undefined
        }
      />

      <Button type="submit" variant="contained">
        Сохранить
      </Button>
      {editedItem && (
        <Button color="warning" sx={{ ml: 2 }} onClick={resetEditForm}>
          Сбросить
        </Button>
      )}
    </Box>
  );
};
