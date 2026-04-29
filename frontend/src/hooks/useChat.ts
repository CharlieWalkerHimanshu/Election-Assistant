import { useState, useCallback } from 'react';
import { sendChatMessage } from '../services/api';
import type { ChatMessage } from '../types';

let msgCounter = 0;
function uid(): string {
  return `msg-${++msgCounter}-${Date.now()}`;
}

const WELCOME: ChatMessage = {
  id: uid(),
  role: 'assistant',
  content:
    "Hello! I'm Election Navigator 🗳️\n\nI can help you with voter registration, eligibility, finding your polling booth, and anything else about the Indian election process. What would you like to know?",
  timestamp: new Date(),
};

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    const userMsg: ChatMessage = { id: uid(), role: 'user', content, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const reply = await sendChatMessage(content);
      const assistantMsg: ChatMessage = {
        id: uid(),
        role: 'assistant',
        content: reply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const errorMsg: ChatMessage = {
        id: uid(),
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  }, []);

  return { messages, isTyping, sendMessage };
}
