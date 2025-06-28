// 🧠 GyanBhoot ChatGPT + Voice
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("userInput");

// 🗣️ Send user message to GPT
async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage("user", message);
  userInput.value = "";

  const gptMessage = await getGyanReply(message);
  addMessage("bot", gptMessage);
  speak(gptMessage);
}

// 💬 Add message to chat box
function addMessage(sender, text) {
  const div = document.createElement("div");
  div.className = sender;
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// 🔮 GPT-4 API call
async function getGyanReply(userMsg) {
  const systemPrompt = `
  You are GyanBhoot – a wise, witty, and helpful Indian AI consultant.
  Speak like a friendly advisor from India.
  Use a desi tone: mix of Hindi, Hinglish and casual English.
  Keep replies short, clear, and supportive.
  Never say you're ChatGPT.
  `;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userMsg }
          ],
          temperature: 0.7
        })
      });


      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "Bhoot confused ho gaya! Try again.";
      return `🧘‍♂️ Guru kehta hai — ${reply}`;
    }

// 🎤 Voice-to-text using browser speech API
function startListening() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "hi-IN"; // Use "en-IN" for Hinglish

    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      userInput.value = voiceText;
      sendMessage();
    };

    recognition.onerror = (e) => {
      alert("Voice recognition failed.\nPlease try in a new browser tab or allow microphone.\nError: " + e.error);
    };


    recognition.start();
  }

// 🔊 Speak text aloud
function speak(text) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "hi-IN"; // Use "en-IN" for Hinglish flavor
      synth.speak(utterance);
    }

// 👋 Greeting when page loads
window.onload = () => {
      const greeting = "Namaste! Main hoon GyanBhoot — aapka AI advisor. Bolo, kya samasya hai?";
      addMessage("bot", greeting);
      speak(greeting);
    };
