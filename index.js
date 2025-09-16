const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

// URL do quiz original
const QUIZ_URL = "https://pilatespro.site/";

// URL do checkout final (seu)
const CHECKOUT_FINAL = "https://pay.kiwify.com.br/I7LKmAh";

// URL do checkout original (para interceptar e trocar)
const CHECKOUT_ORIGINAL = "https://lastlink.com/p/C31A451F4/checkout-payment";

// Rota principal - carrega o quiz original
app.get("/", async (req, res) => {
  try {
    const response = await fetch(QUIZ_URL);
    let body = await response.text();

    // Substitui o link do checkout original pelo seu
    body = body.replace(new RegExp(CHECKOUT_ORIGINAL, "g"), CHECKOUT_FINAL);

    res.send(body);
  } catch (err) {
    console.error("Erro ao carregar o quiz:", err);
    res.status(500).send("Erro ao carregar o quiz");
  }
});

// Mantém o servidor vivo
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
