import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repository, setRepository] = useState([]);

  useEffect(() => { 
    async function loadRepository(){
      const reponse = await api.get("repositories");
      setRepository(reponse.data);
    }
    loadRepository();
  },[]);

  async function handleAddRepository() {
    const repositorio = {
      title: `Desafio 03: Conceitos do ReactJS - ${Date.now()}`,
      url: "https://github.com/LuanAmaro/desafio-conceitos-node-gostack",
      techs: ["NodeJS", "JavaScript"]
    };

    try {
      const { data } = await api.post("repositories", repositorio);
      setRepository([...repository, data]);
    } catch (error) {
      alert('Erro ao adicionar um novo repositorio, tente novamente.');
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);
      setRepository(repository.filter(rep => rep.id !== id));
    } catch (error) {
      alert('Erro ao deletar repositorio, tente novamente.');
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repository.map((rep) =>
            <li key={rep.id}>
              {rep.title}
              <button onClick={() => handleRemoveRepository(rep.id)}>
                  Remover
              </button>
            </li>
        )}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
