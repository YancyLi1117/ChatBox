import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // ✅ Ensure this is set in `.env.local`
  dangerouslyAllowBrowser: true, // ✅ Required for frontend calls
  
});

// ✅ Function to send messages to OpenAI API
export const sendMessage = async (message: string, onMessageReceived: (response: string) => void) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // ✅ Use GPT-4 or "gpt-3.5-turbo" for lower cost
      messages: [{ role: "user", content: message }],
      temperature: 0.7,
    });

    const reply = response.choices[0]?.message?.content || "I couldn't process that.";

    onMessageReceived(reply);
  } catch (error) {
    console.error("OpenAI API Error:", error);
    onMessageReceived("Error: Failed to fetch AI response.");
  }
};

// ✅ Mimic WebSocket behavior for compatibility
export const connectWebSocket = (onMessageReceived: (message: string) => void) => {
  return {

    send: (data: string) => {
      const parsedData = JSON.parse(data);
      sendMessage(parsedData.message, onMessageReceived);
      console.log("Loaded API Key:", process.env.NEXT_PUBLIC_OPENAI_API_KEY);

    },
  } as unknown as WebSocket; // ✅ Fake WebSocket-like object to maintain compatibility
};
