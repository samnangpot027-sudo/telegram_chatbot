const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const express = require("express");

const TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });

console.log("🚀 Bot is starting...");

// -------------------------
// Answer Database
// -------------------------
const answers = {
  one: "សូមរង់ចាំពី 5-10 នាទី ហើយរាយការណ៍ទៅ support។",
  two: "បញ្ជាក់ជាមួយហាងធ្វើថ្មី និង រាយការណ៍ទៅ support។",
  three: "សូមខល 3 ដងឡើងទៅ។ បើមិនទទួល សូមរាយការណ៍ទៅ support។",
  four: "សូមទាក់ទងអតិថិជន និងប្រើ Map ក្នុង App។ បើមិនឃើញ សូមទាក់ទង Support។",
  five: "កុំដឹកទៅទីតាំងថ្មីដោយខ្លួនឯង។ រាយការណ៍ទៅ support ជាមុនសិន។",
  six: "សូមឈប់ដឹកសិន ហើយធ្វើតាមការណែនាំរបស់ Support។",
  seven: "សូមថតរូបភស្តុតាង ហើយរាយការណ៍ទៅ support ភ្លាមៗ។",
  eight: "សូមចូលទៅពិនិត្យគណនីក្នុង Driver App។",
  nine: "សូមប្រមូលប្រាក់ពីអតិថិជន ហើយទូរទាត់ទៅក្រុមហ៊ុនក្រោយម៉ោងដឹក។",
  ten: "ត្រូវជូនដំណឹងទៅប្រធានក្រុមជាមុនសិន ដើម្បីសុំការអនុញ្ញាត។",
  eleven: "សុវត្ថិភាពជាមុន! ទាក់ទងប្រធានភ្លាមៗ និងផ្ញើទីតាំងគ្រោះថ្នាក់។",
  twelve: "បិទអេបសិន រាយការណ៍ទៅប្រធានផ្នែក និងថតរូបភស្តុតាង។",
  thirteen: "រក្សាសុវត្ថិភាព និងរាយការណ៍ទៅ Support។ កុំឈ្លោះជាមួយអតិថិជន។",
  fourteen: "បើក GPS និង Internet ឡើងវិញ ហើយ Restart App។",
  fifteen: "ពិនិត្យ Internet និង Status Online របស់អេប។",
  sixteen: "សូមទាក់ទងទៅប្រធានផ្នែក។",
  seventeen:
    "បញ្ហាដែលពាក់ព័ន្ធហាង/អតិថិជន → Support\nបញ្ហាផ្ទាល់អ្នកដឹក → Supervisor",
};

// -------------------------
// Menu Function (Send or Edit)
// -------------------------
function showMenu(
  chatId,
  messageId = null,
  text = "សូមជ្រើសរើសសំណួរមួយខាងក្រោម 👇",
) {
  const options = {
    chat_id: chatId,
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
            text: "2. ហាងធ្វើម្ហូបខុស តើត្រូវធ្វើដូចម្តេច?",
            callback_data: "two",
          },
        ],
        [{ text: "3. អតិថិជនមិនទទួលទូរស័ព្ទ?", callback_data: "three" }],
        [{ text: "4. ខ្ញុំរកទីតាំងអតិថិជនមិនឃើញ?", callback_data: "four" }],
        [{ text: "5. អតិថិជនប្តូរទីតាំងដឹក?", callback_data: "five" }],
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
        [{ text: "8. ខ្ញុំចង់ដឹងប្រាក់ចំណូលថ្ងៃនេះ?", callback_data: "eight" }],
        [{ text: "9. បុងមាន COD តើត្រូវធ្វើដូចម្តេច?", callback_data: "nine" }],
        [{ text: "10. អាចឈប់ម៉ោងធ្វើការបានទេ?", callback_data: "ten" }],
        [{ text: "11. មានគ្រោះថ្នាក់ចរាចរណ៍?", callback_data: "eleven" }],
        [{ text: "12. ម៉ូតូខូច មិនទាន់មាន Order?", callback_data: "twelve" }],
        [
          {
            text: "13. អតិថិជនមានអាកប្បកិរិយាមិនល្អ?",
            callback_data: "thirteen",
          },
        ],
        [{ text: "14. App មិនអាប់ដេតបាន?", callback_data: "fourteen" }],
        [{ text: "15. មិនអាចចុចទទួលបុង?", callback_data: "fifteen" }],
        [{ text: "16. ភ្លេច Password?", callback_data: "sixteen" }],
        [
          {
            text: "17. ពេលណាទាក់ទង Support vs Supervisor?",
            callback_data: "seventeen",
          },
        ],
      ],
    },
  };

  if (messageId) {
    bot.editMessageText(text, { ...options, message_id: messageId });
  } else {
    bot.sendMessage(chatId, text, options);
  }
}

// -------------------------
// Start Command
// -------------------------
bot.onText(/\/start/, (msg) => {
  showMenu(msg.chat.id);
});

// -------------------------
// Button Click Handler
// -------------------------
bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;
  const option = query.data;

  const answerText = `📌 ចម្លើយ:\n${answers[option]}\n\nសូមជ្រើសសំណួរផ្សេងទៀត 👇`;

  showMenu(chatId, messageId, answerText);
  bot.answerCallbackQuery(query.id);
});

// -------------------------
// Express Server (Render/Hosting)
// -------------------------
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Bot is running ✅"));
app.listen(PORT, () => console.log("🌐 Server running on port", PORT));
