import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getLivros, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const livro = ref.current;

      livro.titulolivro.value = onEdit.titulolivro;
      livro.isbnlivro.value = onEdit.isbnlivro;
      livro.idautor.value = onEdit.idautor;
      livro.editoralivro.value = onEdit.editoralivro;
      livro.qtdelivrodisponivel.value = onEdit.qtdelivrodisponivel;      
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const livro = ref.current;

    if (
      !livro.titulolivro.value ||
      !livro.isbnlivro.value ||
      !livro.idautor.value ||
      !livro.editoralivro.value ||
      !livro.qtdelivrodisponivel.value
    ) {
      console.log("faltam informações")
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:4000/api/biblioteca/" + onEdit.id, {
          isbnlivro: livro.isbnlivro.value,
          titulolivro: livro.titulolivro.value,
          idautor: livro.idautor.value,
          editoralivro: livro.editoralivro.value,
          qtdelivrodisponivel: livro.qtdelivrodisponivel.value
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      console.log("tentou fazer o post");
      await axios
        .post("http://localhost:4000/api/biblioteca", {
          isbnlivro: livro.isbnlivro.value,
          titulolivro: livro.titulolivro.value,
          idautor: livro.idautor.value,
          editoralivro: livro.editoralivro.value,
          qtdelivrodisponivel: livro.qtdelivrodisponivel.value
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    livro.isbnlivro.value = "";
    livro.titulolivro.value = "";
    livro.idautor.value = "";
    livro.editoralivro.value = "";
    livro.qtdelivrodisponivel = "";

    setOnEdit(null);
    getLivros();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
    <InputArea>
        <Label>Titulo</Label>
        <Input name="titulolivro"/>
    </InputArea>
    <InputArea>
        <Label>isbn</Label>
        <Input name="isbnlivro"/>
    </InputArea>    
    <InputArea>
        <Label>id Autor</Label>
        <Input name="idautor"/>
    </InputArea>
    <InputArea>
        <Label>Editora</Label>
        <Input name="editoralivro"/>
    </InputArea>
    <InputArea>
        <Label>Qtde Disponível</Label>
        <Input name="qtdelivrodisponivel"/>
    </InputArea>   
    <Button type="submit">SALVAR</Button>                           
</FormContainer>

  );
};

export default Form;