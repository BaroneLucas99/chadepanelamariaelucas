const express = require('express');
const path = require('path');
const mercadopago = require('mercadopago');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure suas credenciais
mercadopago.configure({
  access_token: 'SUA_ACCESS_TOKEN'
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
          unit_price: 159.63,
          currency_id: 'BRL'
        }
      ],
      back_urls: {
        success: 'https://SEUSITE.com/lista.html',
        failure: 'https://SEUSITE.com/lista.html',
        pending: 'https://SEUSITE.com/lista.html'
      },
      auto_return: 'approved'
    };

    const response = await mercadopago.preferences.create(preference);
    res.json({ id: response.body.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});