const express = require('express');

const app = express();
const fs = require('fs').promises;

const dataPathFile = './data.json';
app.use(express.json());

app.get('/api/tickets', async (req, res) => {
  const tickets = await fs.readFile(dataPathFile, 'utf-8');
  const jsTickets = JSON.parse(tickets);
  if (req.query.searchText) {
    const filterTickets = jsTickets.filter(
      (ticket) => ticket.title.toLowerCase().includes(req.query.searchText.toLowerCase()),
    );
    res.send(filterTickets);
  } else {
    res.send(jsTickets);
  }
});

module.exports = app;
