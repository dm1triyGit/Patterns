import { useAppSelector } from '@app/stores';

export const TodosPage = (): JSX.Element => {
  const { list } = useAppSelector(state => state.todos);

  return (
    <>
      <section>
        <h1>Todos Page Component</h1>
        <ul>
          {list.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </>
  );
};
