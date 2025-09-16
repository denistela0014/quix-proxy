import express from "express";
import puppeteer from "puppeteer";

const app = express();
const PORT = process.env.PORT || 3000;

// URL do quiz original
const QUIZ_URL = "https://pilatespro.site";

// Checkout original que será substituído
const ORIGINAL_CHECKOUT = "https://lastlink.com/p/C31A451F4/checkout-payment";

// Seu checkout da Kiwify
const MEU_CHECKOUT = "https://pay.kiwify.com.br/I7LKmAh";

app.get("*", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: "new", // executa sem abrir janela
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    // Navega para o quiz original
    await page.goto(QUIZ_URL + req.originalUrl, {
      waitUntil: "networkidle2",
    });

    // Pega o HTML já renderizado
    let content = await page.content();

    // Substitui o checkout original pelo seu
    content = content.replace(new RegExp(ORIGINAL_CHECKOUT, "g"), MEU_CHECKOUT);

    await browser.close();

    res.send(content);
  } catch (err) {
    console.error("Erro no proxy:", err);
    res.status(500).send("Erro ao carregar página");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
