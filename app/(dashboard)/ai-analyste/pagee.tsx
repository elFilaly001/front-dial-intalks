
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, MessageSquare, Plus } from "lucide-react";

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type ChatHistory = {
  id: string;
  title: string;
  lastMessage: string;
};

const Page = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Bonjour ! Je suis votre Analyste IA. Comment puis-je vous aider à analyser vos données de réseaux sociaux aujourd\'hui ?' }
  ]);
  const [input, setInput] = useState('');
  const [currentChatId, setCurrentChatId] = useState<string>('default');

  // Simulated chat history
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([
    { id: '1', title: 'Analyse des Performances Instagram', lastMessage: 'Quels sont les métriques clés pour Instagram ?' },
    { id: '2', title: 'Comparaison des Concurrents', lastMessage: 'Comparez notre engagement avec les concurrents' },
    { id: '3', title: 'Tendances des Sentiments', lastMessage: 'Montrez-moi l\'analyse des sentiments au fil du temps' },
  ]);

  const sendMessage = () => {
    if (input.trim()) {
      setMessages(prev => [...prev, { role: 'user', content: input }]);
      setInput('');
      // Update chat history title if it's the first message
      if (messages.length === 1) {
        const newTitle = input.length > 30 ? input.substring(0, 30) + '...' : input;
        setChatHistory(prev => prev.map(chat => 
          chat.id === currentChatId ? { ...chat, title: newTitle, lastMessage: input } : chat
        ));
      }
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Merci pour votre question. J\'analyse les données... (Ceci est une réponse d\'exemple)' }]);
      }, 1000);
    }
  };

  const startNewChat = () => {
    const newChatId = Date.now().toString();
    const newChat: ChatHistory = {
      id: newChatId,
      title: 'Nouvelle Conversation',
      lastMessage: 'A commencé une nouvelle discussion'
    };
    setChatHistory(prev => [newChat, ...prev]);
    setCurrentChatId(newChatId);
    setMessages([
      { role: 'assistant', content: 'Bonjour ! Je suis votre Analyste IA. Comment puis-je vous aider à analyser vos données de réseaux sociaux aujourd\'hui ?' }
    ]);
  };

  const loadChat = (chatId: string) => {
    setCurrentChatId(chatId);
    // In a real app, load messages from backend
    // For now, just set to initial
    setMessages([
      { role: 'assistant', content: 'Bonjour ! Je suis votre Analyste IA. Comment puis-je vous aider à analyser vos données de réseaux sociaux aujourd\'hui ?' }
    ]);
  };

  return (
    <div className="@container/main">
      <div className="w-full mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Analyste IA
            <div className="flex flex-row gap-1 mt-2 mb-4">
              <div className="w-[20%] h-1 bg-[#f02cb9] rounded-full"></div>
              <div className="w-[10%] h-1 bg-[#35b9f4] rounded-full"></div>
            </div>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar for Chat History */}
          <div className="lg:col-span-1">
            <Card className="h-[600px] gap-2">
              <CardHeader className="pb-1 px-0">
                <div
                  className="p-3 cursor-pointer rounded-lg hover:bg-muted transition-colors border-b"
                  onClick={startNewChat}
                >
                  <div className="flex items-start gap-2">
                    <Plus className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">Nouvelle Discussion</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground font-medium pt-2 pb-0 pl-6">Vos Discussions</p>
              </CardHeader>
              <CardContent className="p-0 pt-0">
                <div className="space-y-1 max-h-[500px] overflow-y-auto">
                  {chatHistory.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => loadChat(chat.id)}
                      className={`px-2 py-1 cursor-pointer rounded-lg hover:bg-muted transition-colors ${
                        chat.id === currentChatId ? 'bg-muted' : ''
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <MessageSquare className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{chat.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Discuter avec l&apos;Analyste IA</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Demandez des informations sur vos analyses de réseaux sociaux..."
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} size="icon" className="bg-main">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;