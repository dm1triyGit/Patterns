import { ITodo } from '@app/shared/types';
import { TodoFormModel } from '../components';
import {
  useCreateTodoMutation,
  useEditTodoMutation,
  useLazyGetTodosQuery,
} from '@app/stores/api';
import { useAppDispatch } from '@app/stores';
import { UseFormReset } from 'react-hook-form';
import { setToaster, toggleModalState } from '@app/stores/slices';

interface HookProps {
  todo: ITodo | null;
  resetForm: UseFormReset<TodoFormModel>;
}

interface HookData {
  onSubmit: (data: TodoFormModel) => void;
  resetEditForm: () => void;
}

export const useSubmitForm = ({ todo, resetForm }: HookProps): HookData => {
  const [createTodo] = useCreateTodoMutation();
  const [editTodo] = useEditTodoMutation();
  const [getTodos] = useLazyGetTodosQuery();
  const dispatch = useAppDispatch();

  const resetEditForm = (): void => {
    resetForm();
    dispatch(toggleModalState({ state: false }));
  };

  const onSubmit = (data: TodoFormModel): void => {
    if (!!todo) {
      editTodo({
        ...data,
        createdDate: todo.createdDate,
      })
        .unwrap()
        .then(() => {
          resetForm();
          getTodos();
          dispatch(toggleModalState({ state: false }));
          dispatch(
            setToaster({
              message: 'Запись изменена',
              severety: 'warning',
              key: todo.id,
            }),
          );
        })
        .catch(reason => {
          console.error('reason:', reason);
          dispatch(
            setToaster({
              message: `Ошибка ${JSON.stringify(reason ?? '')}`,
              severety: 'error',
              key: todo.id,
            }),
          );
        });

      return;
    }

    const newTodo: Omit<ITodo, 'id'> = { ...data, createdDate: new Date() };
    createTodo(newTodo)
      .unwrap()
      .then(() => {
        resetForm();
        getTodos();
        dispatch(toggleModalState({ state: false }));
        dispatch(
          setToaster({
            message: 'Запись создана',
            severety: 'success',
            key: new Date().getTime(),
          }),
        );
      })
      .catch(reason => {
        console.error('reason:', reason);
        dispatch(
          setToaster({
            message: `Ошибка ${JSON.stringify(reason ?? '')}`,
            severety: 'error',
            key: new Date().getTime(),
          }),
        );
      });
  };

  return {
    onSubmit,
    resetEditForm,
  };
};
