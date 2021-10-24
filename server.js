const axios = require("axios");
const express = require("express");
const app = express();

const url = "https://api.github.com/orgs/takenet/repos";

app.get("/crepositories", async (req, res) => {
  try {
    // Requisicao e filtragem para retornar apenas os repositorios com a linguagem C#
    const { data } = await axios(url);
    const filteredData = data.filter((repo) => repo.language === "C#");
    const response = {};

    // Criacao de um objeto com os dados do repositorio
    filteredData.forEach((repo) => {
      response[repo.name] = {
        name: repo.full_name,
        description: repo.description,
        language: repo.language,
      };
    });

    res.send(response);
  } catch (error) {
    console.log(error);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
