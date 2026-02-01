const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();

// --- 1. CONFIGURATION DU MINI-SERVEUR (Pour Render/UptimeRobot) ---
const PORT = process.env.PORT || 10000;
app.get('/', (req, res) => {
  res.send('Moltbot Telegram est en ligne !');
});
app.listen(PORT, () => {
  console.log(`Serveur web actif sur le port ${PORT}`);
});

// --- 2. CONFIGURATION DU BOT TELEGRAM ---
// On récupère le Token que tu vas mettre dans Render
const token = process.env.TELEGRAM_TOKEN;

// Création du bot qui utilise le "polling" (écoute les messages)
const bot = new TelegramBot(token, {polling: true});

console.log("Moltbot Telegram démarré...");

// --- 3. COMMANDES DU BOT ---

// Répond au message /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Bonjour ! Je suis Moltbot, ton assistant Telegram hébergé sur Render.");
});

// Répond au mot "ping"
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  if (msg.text.toLowerCase() === 'ping') {
    bot.sendMessage(chatId, 'Pong ! Je suis bien connecté.');
  }
});
