import { Button } from "./components/Button";

function App() {
  return (
    <div>
      <h1>Hello World</h1>
      <Button text="Clique aqui" />
      {/* <Button text={1} /> */}
      {/* <Button text={["1", "2", "3"]} /> */}
      <Button />

      {/** Propriedade em que todo componente tem acesso: "children". */}
      {/* <Button>Novo Botão</Button> */}

    </div>
  );
}

export default App;