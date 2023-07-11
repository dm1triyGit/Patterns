import { Fab, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { StyledSection } from '@app/shared/assets/styled-components';
import AddIcon from '@mui/icons-material/Add';
import { TodoCard, TodoModal } from './components';
import { useGetTodosQuery } from '@app/stores/api';
import { Toaster } from '@app/components';
import { ITodo } from '@app/shared/types';
import { useAppDispatch } from '@app/stores';
import { toggleModalState } from '@app/stores/slices';
import { Breakpoints } from '@app/shared/assets';

export const TodosPage = (): JSX.Element => {
  const { isLoading, isError, data } = useGetTodosQuery();
  const dispatch = useAppDispatch();
  const isTablet = useMediaQuery(Breakpoints.TABLET);

  const openModal = (): void => {
    dispatch(toggleModalState({ state: true }));
  };

  const sortedTodos = (list: ITodo[]): ITodo[] =>
    list
      .slice()
      .sort(
        (a, b) =>
          new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime(),
      );

  return (
    <>
      <StyledSection>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} lg={8}>
            <Typography variant="h3" textAlign="center" sx={{ mb: 2 }}>
              Todos
            </Typography>
            {isLoading && <span>Loading...</span>}
            {isError && <span>ERROR</span>}
            {data && (
              <Stack spacing={2}>
                {sortedTodos(data).map(todo => (
                  <TodoCard todo={todo} key={todo.id} />
                ))}
              </Stack>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            sx={{ display: { xs: 'none', md: 'unset' } }}
          >
            Aside Column
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
