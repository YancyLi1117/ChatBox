# **ChatBox - AI-Powered Chat Application**  

## **📌 Project Overview**  
ChatBox is a **Next.js-based AI chat application** that supports **WebSockets**, **persistent chat history**, and a **dark mode toggle**. The UI is inspired by ChatGPT, featuring a sidebar for chat navigation and a responsive chat window for seamless user interaction.

---

## **🛠️ Features**
### **1️⃣ Chat System**
- Users can create multiple chat sessions, each stored in **localStorage**.
- Messages are stored persistently and limited to the **last 100** for optimal performance.
- WebSockets are used for **real-time AI responses** (currently mocked, but ready for OpenAI API integration).
  
### **2️⃣ Sidebar Navigation**
- **Collapsible sidebar** with chat list management.
- **New chat** button for creating new conversations.
- **Delete button** (appears on hover) for removing old chats.


### **3️⃣ UI & UX**
- **Dark Mode Toggle** (persists in localStorage).
- **Smooth hover effects** for sidebar elements.
- **Chat bubbles** styled dynamically based on the sender.
- **Auto-scroll to latest message** in chat.
- **Chat input expands** up to 5 lines like ChatGPT.

### **4️⃣ Persistent Data**
- Chats and messages are stored in **localStorage**.
- **Dark mode preference** is saved and applied automatically.
- WebSockets reset correctly when switching between chats.


## **🚀 Getting Started**

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/YancyLi1117/chatbox.git
cd chatbox
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Start the Development Server**
```sh
npm run dev
```
The app will be available at **`http://localhost:3000`** (or a custom domain if configured).

---

## **🔗 Environment Variables**
To use OpenAI API (if needed), create a `.env.local` file:
```
NEXT_PUBLIC_OPENAI_API_KEY=your-api-key-here
```

---

## **🎨 UI Customizations**
### **Dark & Light Mode**
- The UI dynamically updates based on **dark/light mode** selection.
- **Dark mode preference is stored** in `localStorage`.

### **Sidebar Behavior**
- **Expands and collapses** smoothly.
- **Chat list shrinks vertically** when collapsed.
- **Delete button appears only on hover** (stays on the right).

---


## **🤖 Future Improvements**
✅ **Integrate OpenAI API** for real AI-generated responses.  
✅ **Add user authentication** to sync chats across devices.  
✅ **Deploy to production** using Vercel.  

---

## **📜 License**
This project is open-source under the **MIT License**.

---

### **💡 Final Notes**
If you have any issues or feature requests, feel free to open an issue! 🚀🔥