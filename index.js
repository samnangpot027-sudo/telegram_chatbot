const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

const TOKEN = process.env.BOT_TOKEN;
const channelId = "@myhelpcenter01"; // your public channel username

const bot = new TelegramBot(TOKEN, { polling: true });

console.log("🚀 Bot is starting...");

// -------------------------
// Helper: Show Main Menu
// -------------------------
function showMenu(chatId) {
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

// -------------------------
// Helper: Handle Menu Actions
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
    showMenu(chatId);
  }
}

// -------------------------
// Post menu to channel (runs when bot starts)
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
    console.log(
      "❌ Cannot post to channel:",
      err.response?.body?.description || err.message,
    );
  });

// -------------------------
// Handle /start (with optional parameter)
// -------------------------
bot.onText(/\/start(?:\s(.+))?/, (msg, match) => {
  const chatId = msg.chat.id;
  const param = match[1];
  console.log(
    `📌 /start ${param || ""} from ${msg.chat.username || msg.chat.id}`,
  );
  handleOption(chatId, param);
});

// -------------------------
// Handle button clicks
// -------------------------
bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;
  console.log(`🔘 Button clicked: ${query.data}`);
  handleOption(chatId, query.data);
  bot.answerCallbackQuery(query.id);
});

// -------------------------
// Auto-reply for normal messages (NO "press start" message)
// -------------------------
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text || "";

  // Ignore commands
  if (text.startsWith("/")) return;

  console.log("📩 User message:", text);
  showMenu(chatId);
});
