const express = require("express");
const app = express();

const url = "https://api.github.com/orgs/takenet/repos";

app.get("/getrepos"),
  async (req, res) => {
    try {
      const response = await fetch(url);
      const responseFiltered = response.filter(
        (repo) => repo.language === "C#"
      );
      const data = {};

      responseFiltered.forEach((repo) => {
        Object.assign(data, {
          [repo.full_name]: repo.description,
        });
      });

      return res.json(data);
    } catch (error) {
      console.log(error);
    }
  };

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
