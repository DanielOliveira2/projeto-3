const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Habilita CORS para todas as rotas
app.use(express.json()); // Para parsear JSON no corpo das requisições (não usado neste exemplo, mas bom ter)

// Caminho para o arquivo de eventos
const eventsFilePath = path.join(__dirname, 'eventos.json');

// Endpoint da API para buscar eventos
app.get('/api/events', (req, res) => {
  fs.readFile(eventsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo eventos.json:', err);
      // Verifica o tipo de erro para fornecer uma resposta mais específica
      if (err.code === 'ENOENT') {
        return res.status(404).json({ message: 'Arquivo de eventos não encontrado.' });
      }
      return res.status(500).json({ message: 'Erro interno do servidor ao tentar ler os eventos.' });
    }

    try {
      const events = JSON.parse(data);
      res.json(events);
    } catch (parseError) {
      console.error('Erro ao fazer parse do JSON de eventos.json:', parseError);
      res.status(500).json({ message: 'Erro interno do servidor ao processar os dados dos eventos.' });
    }
  });
});

// Rota raiz para verificar se o servidor está no ar
app.get('/', (req, res) => {
  res.send('Servidor da API PalhasGeek está no ar!');
});

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor da API PalhasGeek rodando na porta ${PORT}`);
  console.log(`Acesse os eventos em: http://localhost:${PORT}/api/events`);
});
