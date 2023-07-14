import { useEffect, useState } from 'react';
import { useDebounce } from '@app/shared/hooks/use-debounce';
import { ITodo } from '@app/shared/types';
import { useEditTodoMutation } from '@app/stores/api';
import { editStoredTodo, setToaster } from '@app/stores/slices';
import { useAppDispatch } from '@app/stores';

const DEBOUNCER_DELAY = 1000;

interface HookProps {
  todo: ITodo;
}

interface HookValue {
  setCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  completed: boolean;
}

export const useHandleComplete = ({ todo }: HookProps): HookValue => {
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);
  const [editTodo] = useEditTodoMutation();
  const dispatch = useAppDispatch();

  const debouncedIsCompleted = useDebounce({
    value: isCompleted,
    delay: DEBOUNCER_DELAY,
  });

  useEffect(() => {
    if (debouncedIsCompleted !== todo.isCompleted) {
      const data: Partial<ITodo> = {
        ...todo,
        isCompleted: debouncedIsCompleted,
      };

      editTodo(data)
        .unwrap()
        .then(() => {
          dispatch(editStoredTodo({ ...data, id: todo.id }));
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
    }
  }, [debouncedIsCompleted]);

  return {
    setCompleted: setIsCompleted,
    completed: isCompleted,
  };
};
