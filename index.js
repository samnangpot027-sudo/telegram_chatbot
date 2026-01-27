// index.js
const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const express = require("express");

// -------------------------
// Telegram bot setup
// -------------------------
const TOKEN = process.env.BOT_TOKEN; // Read bot token from .env
const channelId = "@myhelpcenter01"; // Replace with your channel ID or username

// Create the bot with polling
const bot = new TelegramBot(TOKEN, { polling: true });

console.log("🚀 Bot is starting...");

// -------------------------
// Helper function for menu actions
// -------------------------
function handleOption(chatId, option) {
  if (option === "help") {
    bot.sendMessage(
      chatId,
      "សូមប្រញ៉ាប់ទាក់ទៅផ្នែកដំណោះស្រាយជាបន្ទាន់ និង បញ្ជាក់ពីបញ្ហានិមួយៗផង!",
    );
  } else if (option === "answers") {
    bot.sendMessage(
      chatId,
      "ត្រូវជិះទៅតំបន់ទីតាំងដែលមានហាងច្រើន និង នៅជិតហាងបំផុត!",
    );
  } else {
    // Show main menu
    bot.sendMessage(chatId, "សូមជ្រើសរើសមួយក្នុងចំណោមជម្រើសខាងក្រោម:", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "1. នៅពេលអ្នកដឹកជួបបញ្ហាតើត្រូវធ្វើដូចម្តេច?",
              callback_data: "help",
            },
          ],
          [
            {
              text: "2. ធ្វើដូចម្តេចទើបដឹកបានច្រើន?",
              callback_data: "answers",
            },
          ],
        ],
      },
    });
  }
}

// -------------------------
// Post menu to channel (first time only)
// -------------------------
bot
  .sendMessage(channelId, "👋 Welcome! Please choose an option below:", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "1. នៅពេលអ្នកដឹកជួបបញ្ហាតើត្រូវធ្វើដូចម្តេច?",
            url: "https://t.me/myhelpcenter01_bot?start=help",
          },
        ],
        [
          {
            text: "2. ធ្វើដូចម្តេចទើបដឹកបានច្រើន?",
            url: "https://t.me/myhelpcenter01_bot?start=answers",
          },
        ],
      ],
    },
  })
  .then(() => console.log("✅ Menu posted to channel"))
  .catch((err) => {
    if (err.response && err.response.body && err.response.body.description) {
      console.log(
        "❌ Cannot post to channel yet:",
        err.response.body.description,
      );
    } else {
      console.log("❌ Cannot post to channel yet:", err.message || err);
    }
  });

// -------------------------
// Handle /start command with optional parameter
// -------------------------
bot.onText(/\/start(?:\s(.+))?/, (msg, match) => {
  const chatId = msg.chat.id;
  const param = match[1]; // may be undefined
  console.log(
    `📌 /start ${param || ""} received from: ${msg.chat.username || msg.chat.id}`,
  );
  handleOption(chatId, param);
});

// -------------------------
// Handle inline button clicks
// -------------------------
bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;
  console.log(
    `🔘 Button clicked: ${query.data} by ${query.from.username || query.from.id}`,
  );
  handleOption(chatId, query.data);
  bot.answerCallbackQuery(query.id);
});

// -------------------------
// Optional: log all messages (for debugging)
// -------------------------
bot.on("message", (msg) => {
  console.log("📩 Received message:", msg.text);
});

// -------------------------
// Dummy Express server (for Render free tier)
// -------------------------
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("✅ Telegram bot is running!");
});

app.listen(PORT, () => {
  console.log(`🌐 Dummy server running on port ${PORT}`);
});
