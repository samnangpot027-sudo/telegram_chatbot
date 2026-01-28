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
  if (option === "one") {
    bot.sendMessage(chatId, "សូមរង់ចាំពី 5-10នាទី ហើយរាយការណ៍ទៅ support ។");
  } else if (option === "two") {
    bot.sendMessage(chatId, "បញ្ហាក់ជាមួយហាងធ្វើថ្មី និង រាយការណ៍ទៅ support ។");
  } else if (option === "three") {
    bot.sendMessage(
      chatId,
      "សូមខល 3ឡើងទៅ។ បើនៅតែមិនទទួលសូមរាយការណ៍ទៅ support។",
    );
  } else if (option === "fourth") {
    bot.sendMessage(
      chatId,
      "សូមទាក់ទងទៅអតិថិជន និងប្រើ Map ក្នុង App។ បើនៅតែមិនឃើញសូមទាក់ទងទៅ Support។",
    );
  } else if (option === "five") {
    bot.sendMessage(
      chatId,
      "កុំដឹកទៅទីតាំងថ្មីដោយខ្លួនឯង។ សូមរាយការណ៍ទៅ support ជាមុនសិន។",
    );
  } else if (option === "six") {
    bot.sendMessage(chatId, "សូមឈប់ដឹកសិន ហើយធ្វើតាមការណែនាំរបស់ Support។");
  } else if (option === "seven") {
    bot.sendMessage(chatId, "សូមថតរូបភស្តុតាង ហើយរាយការណ៍ទៅ support ភ្លាមៗ។");
  } else if (option === "eight") {
    bot.sendMessage(chatId, "សូមចូលទៅពិនិត្យគណនីក្នុង Driver App។");
  } else if (option === "nine") {
    bot.sendMessage(
      chatId,
      "សូមប្រមូលប្រាក់ពីអតិថិជន ហើយទូរទាត់ទៅក្រុមហ៊ុនបន្ទាប់ពីចប់ម៉ោងដឹក។",
    );
  } else if (option === "ten") {
    bot.sendMessage(
      chatId,
      "បាន! តែត្រូវជូនដំណឹងទៅប្រធានក្រុម ឬ ប្រធានផ្នែកដឹកជញ្ជូនជាមុនសិន ដើម្បីសុំការអនុញ្ញាត។",
    );
  } else if (option === "eleven") {
    bot.sendMessage(
      chatId,
      "សុវត្ថិភាពជាមុន! សូមទាក់ទងទៅប្រធានផ្នែកភ្លាមៗ និង ផ្ញើរទីតាំងគ្រោះថ្នាក់។",
    );
  } else if (option === "twelve") {
    bot.sendMessage(
      chatId,
      "បិទអេបទទួលបុងសិន​ រាយការណ៍ទៅប្រធានផ្នែក និង ថតរូបជាភស្តុតាង។",
    );
  } else if (option === "thirteen") {
    bot.sendMessage(
      chatId,
      "សូមរក្សាសុវត្ថិភាព និងរាយការណ៍ទៅ Support។ សូមកុំជជែក ឬ ឈ្លោះប្រកែកជាមួយអតិថិជន។",
    );
  } else if (option === "fourteen") {
    bot.sendMessage(chatId, "សូមបើក GPS និង Internet ឡើងវិញ ហើយ Restart App។");
  } else if (option === "fifteen") {
    bot.sendMessage(
      chatId,
      "សូមពិនិត្យមើល Internet និង Status Online របស់អេប។",
    );
  } else if (option === "sexteen") {
    bot.sendMessage(chatId, "សូមទាក់ទងទៅប្រធានផ្នែក។");
  } else if (option === "seventeen") {
    bot.sendMessage(
      chatId,
      "a. រាល់បញ្ហាដែលត្រូវទាក់ទងជាមួយហាង និង អតិថិជន ចាំបាច់ត្រូវរាយការណ៍ទៅ Support សុំជំនួយ។ " +
        " b. រាល់បញ្ហាដែលទាក់ទងតែអ្នកដឹកតែមួយ ត្រូវរាយការណ៍មក Supervisor។",
    );
  } else {
    // Show main menu
    bot.sendMessage(chatId, "សូមជ្រើសរើសមួយក្នុងចំណោមជម្រើសខាងក្រោម:", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "1. ហាងធ្វើម្ហូបយឺត តើត្រូវធ្វើដូចម្តេច?",
              callback_data: "one",
            },
          ],
          [
            {
              text: "2. ហាងធ្វើម្ហូបខុស​ តើត្រូវធ្វើដូចម្តេច?",
              callback_data: "two",
            },
          ],
          [
            {
              text: "3. អតិថិជនមិនទទួលទូរស័ព្ទ?",
              callback_data: "three",
            },
          ],
          [
            {
              text: "4. ខ្ញុំរកទីតាំងអតិថិជនមិនឃើញ?",
              callback_data: "fourth",
            },
          ],
          [
            {
              text: "5. អតិថិជនប្តូរទីតាំងដឹក?",
              callback_data: "five",
            },
          ],
          [
            {
              text: "6. Order ត្រូវបាន Cancel កំឡុងពេលដឹក?",
              callback_data: "six",
            },
          ],
          [
            {
              text: "7. អាហារខូច ឬ ធ្លាក់ តើត្រូវធ្វើដូចម្តេច?",
              callback_data: "seven",
            },
          ],
          [
            {
              text: "8. ខ្ញុំចង់ដឹកប្រាក់ចំណូលថ្ងៃនេះ?",
              callback_data: "eight",
            },
          ],
          [
            {
              text: "9. បុងមាន COD តើត្រូវធ្វើដូចម្តេច?",
              callback_data: "nine",
            },
          ],
          [
            {
              text: "10. តើខ្ញុំអាចច្បាប់ក្នុងម៉ោងកំពុងធ្វើការងារបានទេ?",
              callback_data: "ten",
            },
          ],
          [
            {
              text: "11. ខ្ញុំមានគ្រោះថ្នាក់ចរាចរណ៍?",
              callback_data: "eleven",
            },
          ],
          [
            {
              text: "12. ម៉ូតូខូច តែមិនទាន់មាន Order ក្នុងដៃ?",
              callback_data: "twelve",
            },
          ],
          [
            {
              text: "13. អតថិជនមានអាកប្បកិរិយាមិនល្អ?",
              callback_data: "thirteen",
            },
          ],
          [
            {
              text: "14. App ខ្ញុំមិនអាចអាប់ដេតបាន?",
              callback_data: "fourteen",
            },
          ],
          [
            {
              text: "15. ខ្ញុំមិនអាចចុចទទួលបុងបាន?",
              callback_data: "fifteen",
            },
          ],
          [
            {
              text: "16. ខ្ញុំភ្លេច Password ?",
              callback_data: "sexteen",
            },
          ],
          [
            {
              text: "17. តើពេលណាខ្ញុំត្រូវទាក់ទងទៅ Support ហើយពេលណាខ្ញុំត្រូវទាក់ទងទៅ Supervisor?",
              callback_data: "seventeen",
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
