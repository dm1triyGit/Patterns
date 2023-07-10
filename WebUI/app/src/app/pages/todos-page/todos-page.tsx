import { useGetTodosQuery } from '@app/stores/api';

export const TodosPage = (): JSX.Element => {
  const { isLoading, isError, data } = useGetTodosQuery();

  return (
    <>
      <section>
        <h1>Todos Page Component</h1>
        {isLoading && <span>Loading...</span>}
        {isError && <span>ERROR</span>}
        {data && (
          <ul>
            {data.map(todo => (
              <li key={todo.id}>{todo.title}</li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
};
