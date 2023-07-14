import { ITodo } from '@app/shared/types';
import { useDeleteTodoMutation } from '@app/stores/api';
import { Edit, Delete } from '@mui/icons-material';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import { useAppDispatch } from '@app/stores';
import {
  deleteStoredTodo,
  setToaster,
  toggleModalState,
} from '@app/stores/slices';
import { CardLoader } from './card-loader';

interface Props {
  todo: ITodo;
}

export const TodoCard = ({ todo }: Props): JSX.Element => {
  const [deleteTodo, { isLoading }] = useDeleteTodoMutation();
  const dispatch = useAppDispatch();

  const handleDeleteTodo = (id: number): void => {
    deleteTodo(id)
      .unwrap()
      .then(() => {
        dispatch(deleteStoredTodo(id));
        dispatch(
          setToaster({
            message: 'Запись удалена',
            severety: 'warning',
            key: todo.id,
          }),
        );
      })
      .catch(reson => {
        dispatch(
          setToaster({
            message: JSON.stringify(reson),
            severety: 'error',
            key: todo.id,
          }),
        );
      });
  };

  const handleEditTodo = (todo: ITodo): void => {
    dispatch(toggleModalState({ state: true, item: todo }));
  };

  return (
    <Card
      sx={{ minWidth: 275, position: 'relative' }}
      key={todo.id}
      elevation={4}
    >
      {isLoading && <CardLoader />}
      <CardContent>
        {todo.createdDate && (
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {new Date(todo.createdDate).toLocaleDateString()}
          </Typography>
        )}
        <Typography variant="h5">{todo.title}</Typography>
        {todo.comment && (
          <Typography variant="body2">{todo.comment}</Typography>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Button
          size="small"
          startIcon={<Edit />}
          disabled={isLoading}
          onClick={() => handleEditTodo(todo)}
        >
          Edit
        </Button>
        <Button
          size="small"
          color="error"
          startIcon={<Delete />}
          disabled={isLoading}
          onClick={() => handleDeleteTodo(todo.id)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};
