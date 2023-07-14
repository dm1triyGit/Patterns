import {
  Fab,
  Grid,
  LinearProgress,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useEffect } from 'react';
import { StyledSection } from '@app/shared/assets/styled-components';
import AddIcon from '@mui/icons-material/Add';
import { TodoForm, TodoModal, TodosList } from './components';
import { useGetTodosQuery } from '@app/stores/api';
import { Toaster } from '@app/components';
import { useAppDispatch, useAppSelector } from '@app/stores';
import { saveTodos, toggleModalState } from '@app/stores/slices';
import { Breakpoints } from '@app/shared/assets';

export const TodosPage = (): JSX.Element => {
  const { isLoading, isError, data, error, isFetching } = useGetTodosQuery();
  const dispatch = useAppDispatch();
  const isTablet = useMediaQuery(Breakpoints.TABLET);
  const { editedItem } = useAppSelector(state => state.todos);

  useEffect(() => {
    if (data) {
      dispatch(saveTodos(data));
    }
  }, [data]);

  const openModal = (): void => {
    dispatch(toggleModalState({ state: true }));
  };

  return (
    <>
      <StyledSection>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} lg={8}>
            <Typography variant="h3" textAlign="center" sx={{ mb: 2 }}>
              Todos
            </Typography>
            {isLoading || isFetching ? <LinearProgress /> : null}
            {isError && (
              <Typography color="error" variant="h5" textAlign="center">
                ERROR {`: ${error ? JSON.stringify(error) : ''}`}
              </Typography>
            )}
            {data && <TodosList />}
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            sx={{ display: { xs: 'none', md: 'unset' } }}
          >
            <Typography variant="h5" sx={{ mb: 2 }}>
              {editedItem ? 'Редактировать' : 'Создать новую'}
            </Typography>
            <TodoForm />
          </Grid>
        </Grid>
      </StyledSection>
      {!isTablet && (
        <>
          <Fab
            color="primary"
            onClick={openModal}
            sx={{
              position: 'fixed',
              right: 20,
              bottom: 20,
              display: { md: 'none' },
            }}
          >
            <AddIcon />
          </Fab>
          <TodoModal />
        </>
      )}
      <Toaster />
    </>
  );
};
