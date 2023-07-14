import { useAppDispatch, useAppSelector } from '@app/stores';
import { toggleModalState } from '@app/stores/slices';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { TodoForm } from './todo-form';
import CloseIcon from '@mui/icons-material/Close';

export const TodoModal = (): JSX.Element => {
  const { modalOpen, editedItem } = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(toggleModalState({ state: false }));
  };

  const getModalTitle = (): string =>
    Boolean(editedItem) ? 'Редактировать' : 'Создать';

  return (
    <Dialog open={modalOpen} onClose={handleClose} fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <span>{getModalTitle()}</span>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TodoForm />
      </DialogContent>
    </Dialog>
  );
};
