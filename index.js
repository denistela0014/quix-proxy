const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

// 🔗 Links
const QUIZ_URL = "https://pilatespro.site";
const CHECKOUT_ORIGINAL = "https://lastlink.com/p/C31A451F4/checkout-payment";
const CHECKOUT_SEU = "https://pay.kiwify.com.br/I7LKmAh";

// Proxy genérico: pega qualquer rota e repassa para o quiz
app.get("*", async (req, res) => {
  try {
    // Monta a URL de destino
    const destino = QUIZ_URL + req.originalUrl;

    // Busca a página do quiz
    const resposta = await fetch(destino);
    let html = await resposta.text();

    // Substitui o checkout original pelo seu checkout Kiwify
    html = html.replace(new RegExp(CHECKOUT_ORIGINAL, "g"), CHECKOUT_SEU);

    // Retorna a página
    res.send(html);
  } catch (erro) {
    console.error("Erro ao carregar quiz:", erro);
    res.status(500).send("Erro ao carregar quiz");
  }
});

// Inicia servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

