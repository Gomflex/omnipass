'use client';

import { useState, useRef, useEffect } from 'react';
import { chatbotApi } from '@/lib/api/chatbot';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const WELCOME_MESSAGES = [
  'Hello! I\'m your OMNI Pass assistant. How can I help you today?',
  '안녕하세요! OMNI Pass 도우미입니다. 무엇을 도와드릴까요?',
  'こんにちは！OMNI Passアシスタントです。どのようにお手伝いできますか？',
  '你好！我是OMNI Pass助手。我能为您做什么？',
  '¡Hola! Soy tu asistente OMNI Pass. ¿Cómo puedo ayudarte?',
  'Bonjour! Je suis votre assistant OMNI Pass. Comment puis-je vous aider?',
];

const QUICK_QUESTIONS = [
  'How do I earn points?',
  'Where can I use points?',
  'How do missions work?',
  'Find nearby stores',
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Get locale from localStorage
      const locale = localStorage.getItem('locale') || 'en';
      setCurrentLanguage(locale);
      const localeIndex = ['en', 'ko', 'ja', 'zh', 'es', 'fr'].indexOf(locale);
      const welcomeMessage = WELCOME_MESSAGES[localeIndex] || WELCOME_MESSAGES[0];

      setMessages([
        {
          id: '1',
          text: welcomeMessage,
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, messages.length]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isTyping) return;

    const userMessageText = inputText.trim();
    const userMessage: Message = {
      id: Date.now().toString(),
      text: userMessageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      // Convert messages to conversation history format for API
      const apiHistory = conversationHistory.map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

      // Add current user message to history
      apiHistory.push({
        role: 'user',
        content: userMessageText,
      });

      // Call Claude API
      const response = await chatbotApi.chat({
        message: userMessageText,
        language: currentLanguage,
        conversation_history: apiHistory,
      });

      // Update conversation history
      const updatedHistory = response.conversation_history || [];
      setConversationHistory(updatedHistory);

      // Add bot response to messages
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.response,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot API error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: '죄송합니다. 응답을 받는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.\n\nSorry, there was an error getting a response. Please try again later.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
    // Auto-send quick questions after a short delay
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 right-4 sm:bottom-20 sm:right-6 text-white rounded-full shadow-lg transition-all z-50 w-14 h-14 flex items-center justify-center"
          style={{ backgroundColor: '#cf434c' }}
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-0 left-0 right-0 sm:bottom-6 sm:right-6 sm:left-auto w-full sm:w-96 h-[calc(100vh-4rem)] sm:h-[600px] bg-white sm:rounded-lg rounded-t-lg shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-3 sm:p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base">OMNI Pass Assistant</h3>
                <p className="text-xs text-primary-100">Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-full p-1.5 sm:p-1 transition-colors flex-shrink-0"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-lg p-2.5 sm:p-3 ${
                    message.sender === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-800 shadow-md'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line break-words">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-primary-100' : 'text-gray-400'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 shadow-md rounded-lg p-2.5 sm:p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="px-3 sm:px-4 py-2 border-t border-gray-200 bg-white">
              <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {QUICK_QUESTIONS.map((question) => (
                  <button
                    key={question}
                    onClick={() => handleQuickQuestion(question)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 sm:px-3 py-1 rounded-full transition-colors whitespace-nowrap"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-3 sm:p-4 border-t border-gray-200 bg-white rounded-b-lg sm:rounded-b-lg">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
