const express = require('express');
const path = require('path');
const mercadopago = require('mercadopago');

const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});


app.use(express.static('public'));
app.use(express.json());

app.post('/criar-preferencia', async (req, res) => {
  try {
    const preference = {
      items: [
        {
          title: 'Conjunto de panelas antiaderente',
          quantity: 1,
          unit_price: 00.03,
          currency_id: 'BRL'
        }
      ],
      back_urls: {
        success: 'https://baronelucas99.github.io/chadepanelamariaelucas/agradecimento.html',
        failure: 'https://baronelucas99.github.io/chadepanelamariaelucas/',
        pending: 'https://baronelucas99.github.io/chadepanelamariaelucas/lista.html'
      },
      auto_return: 'approved'
    };

   const response = await mercadopago.preferences.create(preference);
    res.json({ id: response.body.id });
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro ao criar preferência");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
