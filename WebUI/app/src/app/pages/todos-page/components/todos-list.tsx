import { Stack } from '@mui/system';
import { TodoCard } from './todo-card';
import { useAppSelector } from '@app/stores';

export const TodosList = (): JSX.Element => {
  const { list } = useAppSelector(state => state.todos);

  return (
    <Stack spacing={2}>
      {list.map(todo => (
        <TodoCard todo={todo} key={todo.id} />
      ))}
    </Stack>
  );
};
