const axios = require("axios");
const express = require("express");
const app = express();

const url = "https://api.github.com/orgs/takenet/repos";

app.get("/crepositories", async (req, res) => {
  try {
    // Requisicao e filtragem para retornar apenas os repositorios com a linguagem C#
    const { data } = await axios(url);
    const filteredData = data
      .filter((repo) => repo.language === "C#")
      .slice(0, 5);
    const response = {};

    // Criacao de um objeto com os dados do repositorio
    let i = 0;
    filteredData.forEach((repo) => {
      response[i] = {
        name: repo.full_name,
        description: repo.description,
        // Nao era necessario, mas utilizei para garantir que todas as linguagens sejam C#
        language: repo.language,
        // Nao era necessario, mas utilizei a data de criacao para garantir a ordem dos repositorios
        created_at: repo.created_at,
      };
      i++;
    });

    res.send(response);
  } catch (error) {
    console.log(error);
  }
});

async function getlibraryData() {}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
