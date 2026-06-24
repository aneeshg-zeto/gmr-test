import { useEffect, useState } from 'react';
import { chatService } from '../services/chatService';

const welcomeMessage = {
  id: 1,
  role: 'assistant',
  content: 'Welcome to GMR Real Estate AI. Tell me your budget, city, or BHK preference and I will help you find the right home.'
};

export default function useChat() {
  const [messages, setMessages] = useState([welcomeMessage]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setMessages([welcomeMessage]);
  }, []);

  const clearChat = () => setMessages([welcomeMessage]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const nextMessages = [
      ...messages,
      { id: Date.now(), role: 'user', content: trimmed }
    ];

    setMessages(nextMessages);
    setInput('');
    setIsTyping(true);

    try {
      const response = await chatService.sendMessage(
        trimmed,
        nextMessages.map(({ role, content }) => ({ role, content }))
      );

      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: 'assistant',
          content: response.reply || response.message || 'No response received yet.'
        }
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: 'assistant',
          content: 'The chat service is not reachable right now. Please start the API server and try again.'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return {
    messages,
    input,
    setInput,
    isTyping,
    sendMessage,
    clearChat
  };
}