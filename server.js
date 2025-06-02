const express = require('express');
const cors = require('cors');
const mercadopago = require('mercadopago');
require('dotenv').config(); // Carrega variáveis do .env

const app = express();
app.use(express.json());
app.use(cors());

// Configura Mercado Pago com token do .env
mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN
});

app.get('/', (req, res) => {
  res.send('Servidor rodando! Use a rota /create_preference para criar preferência.');
});


// Endpoint para criar preferência
app.post('/create_preference', async (req, res) => {
  try {
    const preference = {
      items: [
        {
          title: 'Conjunto de panelas antiaderente',
          quantity: 1,
          currency_id: 'BRL',
          unit_price: 0.03
        }
      ],
      back_urls: {
        success: 'https://seusite.com/lista.html', // Substitua pelo seu
        failure: 'https://seusite.com/erro.html',
        pending: 'https://seusite.com/pendente.html'
      },
      auto_return: 'approved'
    };

    const response = await mercadopago.preferences.create(preference);
    res.json({ id: response.body.id });
  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    res.status(500).json({ error: 'Erro ao criar preferência' });
  }
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
