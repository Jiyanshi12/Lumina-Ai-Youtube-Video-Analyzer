import React, { useState } from 'react';
import { MessageSquare, Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { ChatMessage, VideoStudyPackage } from '../../types';
import { sendTutorChatMessage } from '../../services/api';

interface AITutorTabProps {
  videoPackage: VideoStudyPackage;
}

export default function AITutorTab({ videoPackage }: AITutorTabProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_welcome',
      sender: 'tutor',
      text: `Hello! I am your AI Study Tutor for "${videoPackage.metadata.title}". Ask me any questions, request code breakdowns, or ask for practice problems based on this video!`,
      timestamp: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isSending) return;

    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsSending(true);

    try {
      const replyText = await sendTutorChatMessage({
        videoTitle: videoPackage.metadata.title,
        videoContext: `${videoPackage.notes.summary}\nKey Concepts: ${videoPackage.notes.keyConcepts.map((k) => k.concept).join(', ')}`,
        message: query,
        chatHistory: messages.map((m) => ({ sender: m.sender, text: m.text })),
      });

      const tutorMsg: ChatMessage = {
        id: `msg_tutor_${Date.now()}`,
        sender: 'tutor',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, tutorMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `msg_err_${Date.now()}`,
        sender: 'tutor',
        text: 'Sorry, I encountered an issue retrieving an answer. Please try asking again!',
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsSending(false);
    }
  };

  const samplePrompts = [
    'Explain the most important concept in simple terms',
    'Give me a real-world coding example',
    'How does this topic relate to software architecture?',
    'Generate 2 tricky interview follow-up questions',
  ];

  return (
    <div className="flex flex-col h-[600px] rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm animate-in fade-in">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-md shadow-indigo-600/20">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900">AI Tutor RAG Engine</h3>
            <p className="text-[10px] text-slate-500 truncate max-w-xs">{videoPackage.metadata.title}</p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-800 border border-emerald-200">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Active Session
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
        {messages.map((m) => {
          const isUser = m.sender === 'user';
          return (
            <div key={m.id} className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                  isUser ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-indigo-700'
                }`}
              >
                {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200 shadow-sm rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-wrap">{m.text}</p>
                <span className={`mt-1.5 block text-[9px] ${isUser ? 'text-indigo-200' : 'text-slate-400'}`}>
                  {m.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {isSending && (
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-200 text-indigo-700">
              <Bot className="h-4 w-4 animate-pulse" />
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 border border-slate-200 shadow-sm">
              <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
              <span>AI Tutor is formulating answer from transcript context...</span>
            </div>
          </div>
        )}
      </div>

      {/* Sample Quick Prompts */}
      <div className="p-2 border-t border-slate-100 bg-slate-50/80 flex items-center gap-2 overflow-x-auto">
        {samplePrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => handleSend(prompt)}
            disabled={isSending}
            className="shrink-0 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-[11px] text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 transition-colors cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 border-t border-slate-100 bg-white flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask AI tutor anything about this video..."
          className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isSending}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-50 transition-colors cursor-pointer shrink-0"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
