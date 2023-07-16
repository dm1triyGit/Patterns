import { ITodo } from '@app/shared/types';
import { useDeleteTodoMutation } from '@app/stores/api';
import { Edit, Delete } from '@mui/icons-material';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Checkbox,
} from '@mui/material';
import { useAppDispatch } from '@app/stores';
import {
  deleteStoredTodo,
  setToaster,
  toggleModalState,
} from '@app/stores/slices';
import { useHandleComplete } from '../hooks';

interface Props {
  todo: ITodo;
}

export const TodoCard = ({ todo }: Props): JSX.Element => {
  const [deleteTodo, { isLoading }] = useDeleteTodoMutation();
  const dispatch = useAppDispatch();
  const { setCompleted, completed } = useHandleComplete({
    todo,
  });

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

  const handleCompleteTask = (): void => {
    setCompleted(prev => !prev);
  };

  return (
    <Card
      sx={{ minWidth: 275, position: 'relative' }}
      key={todo.id}
      elevation={4}
    >
      <CardContent sx={{ display: 'grid', gridTemplateColumns: '4fr 1fr' }}>
        <Box className="card-left">
          {todo.createdDate && (
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {new Date(todo.createdDate).toLocaleDateString()}
            </Typography>
          )}
          <Typography variant="h5">{todo.title}</Typography>
          {todo.comment && (
            <Typography variant="body2">{todo.comment}</Typography>
          )}
          {todo.reminderDate && (
            <Typography sx={{ fontSize: 14, mt: 2 }} color="text.secondary">
              Напоминание: {new Date(todo.reminderDate).toLocaleDateString()}
            </Typography>
          )}
        </Box>
        <Box
          className="card-right"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Checkbox
            size="medium"
            checked={completed}
            onChange={handleCompleteTask}
          />
        </Box>
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
