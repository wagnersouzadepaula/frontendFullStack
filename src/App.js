import GlobalStyle from "./styles/global"; //importa a globalstyle com o css para o projeto
import styled from "styled-components";
import Form from "./components/Form.js"; // importa o formulário para editar os livros.
import Grid from "./components/Grid";
import FormAutores from "./components/FormAutores"; // importa o formulário para editar os autores.
import GridAutores from "./components/GridAutores";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify"; // feedback que aparece na tela quando o usuário faz alguma ação.
import "react-toastify/dist/ReactToastify.css"; // importa a biblioteca da linha acima.
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 2000px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [livros, setLivros, autores, setAutores] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getLivros = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/biblioteca");
      setLivros(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1))); // Colocar os livros em ordem alfabética.
    } catch (error) {
      toast.error(error);
    }
  };

  const getAutores = async () => {
    try {
      const resAutor = await axios.get("http://localhost:4000/api/autores");
      setAutores(resAutor.data.sort((a, b) => (a.nome > b.nome ? 1 : -1))); // Colocar os livros em ordem alfabética.
    } catch (error) {
      toast.error(error);
    }
  };  

  useEffect(() => {
    getLivros();
  }, [setLivros]);

  useEffect(() => {
    getAutores();
  }, [setAutores]);  

  return (
    <>
      <Container>
        <Title>LIVROS</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getLivros={getLivros} />
        <Grid setOnEdit={setOnEdit} livros={livros} setLivros={setLivros} />
      </Container>
{/*      <Container>
        <Title>AUTORES</Title>
        <FormAutores onEdit={onEdit} setOnEdit={setOnEdit} getAutores={getAutores} />
        <GridAutores setOnEdit={setOnEdit} autores={autores} setAutores={setAutores} />
      </Container>
*/}
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default App;
