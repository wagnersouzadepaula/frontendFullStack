import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1000px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};
`;

const GridAutores = ({ autores, setAutores, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:4000/" + id)
      .then(({ data }) => {
        const newArray = autores.filter((user) => user.id !== id);

        setAutores(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
            <Th> Autor </Th>
            <Th> Nacionalidade </Th>

            <Th> ID </Th>
            <Th></Th>
            <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {autores.map((item, i) => (
          <Tr key={i}>
            <Td width="%">{item.nomeautor}</Td>
            <Td width="%">{item.nacionalidadeautor}</Td>
            <Td width="%">{item.idautor}</Td>

            <Td width="%"></Td> {/* Espaço para o botao de editar */}
            <Td width="%"></Td> {/* Espaço para o botao de excluir */}
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(item.idlivro)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default GridAutores;