"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cucumber from "@/components/ui/Cucumber";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, MessageSquare } from "lucide-react";
 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Plus,
  Radio,
  BarChart3,
  Brain,
  Settings,
  X,
  Trash2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AnalysisItem {
  id: string;
  name: string;
  created: string;
  lastViewed: string;
}

const analysisData: AnalysisItem[] = [
  {
    id: "1",
    name: "Analyze",
    created: "Oct 18, 2018",
    lastViewed: "Oct 18, 2018",
  },
  {
    id: "2",
    name: "Analyze (1)",
    created: "Oct 18, 2018",
    lastViewed: "Oct 28, 2018",
  },
  {
    id: "3",
    name: "Analyze - Listerine- eng no tw",
    created: "Oct 18, 2018",
    lastViewed: "Oct 18, 2018",
  },
  {
    id: "4",
    name: "Analyze McDonalds",
    created: "Oct 18, 2018",
    lastViewed: "Oct 18, 2018",
  },
  {
    id: "5",
    name: "Rumi Spice (Home)",
    created: "May 4, 2017",
    lastViewed: "Oct 28, 2018",
  },
];

type DashboardType = "ecoute" | "audience" | "mentions" | "sentiments" | null;

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type ChatHistory = {
  id: string;
  title: string;
  lastMessage: string;
};

export default function AIAnalystePage() {
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [selectedDashboardType, setSelectedDashboardType] = useState<DashboardType>(null);
  const [dashboardName, setDashboardName] = useState("");
  const [selectedSearch, setSelectedSearch] = useState("");
  const itemsPerPage = 5;
  const totalItems = analysisData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(analysisData.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    }
  };

  const isAllSelected =
    selectedItems.length === analysisData.length && analysisData.length > 0;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

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
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <Cucumber />
      </div>
      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white inline-flex flex-col">
          Analyste IA
          <div className="flex flex-row gap-1 mt-2 mb-4">
            <div className="w-[20%] h-1 bg-[#f02cb9] rounded-full"></div>
            <div className="w-[10%] h-1 bg-main rounded-full"></div>
          </div>
        </h2>
      </div>


      <div className="w-full mx-auto">

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

      <div className="mt-8 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
        {/* Selection Toolbar */}
        {selectedItems.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 bg-main/5 border-b border-main/20">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedItems([])}
                className="p-1 rounded hover:bg-main/10 transition-colors"
              >
                <X className="w-4 h-4 text-main" />
              </button>
              <span className="text-sm font-medium text-main">
                {selectedItems.length} item{selectedItems.length > 1 ? "s" : ""} selected
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  // Handle delete action
                  console.log("Delete items:", selectedItems);
                  // For demo, just clear selection
                  setSelectedItems([]);
                }}
                className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                title="Delete"
              >
                <Trash2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        )}
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-12">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="font-medium text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-1">
                  Name
                  <svg
                    className="w-3 h-3 text-main"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </div>
              </TableHead>
              <TableHead className="font-medium text-gray-700 dark:text-gray-300 text-right">
                Created
              </TableHead>
              <TableHead className="font-medium text-gray-700 dark:text-gray-300 text-right">
                Last viewed
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {analysisData.map((item) => (
              <TableRow
                key={item.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800"
                data-state={selectedItems.includes(item.id) ? "selected" : ""}
              >
                <TableCell>
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={(checked) =>
                      handleSelectItem(item.id, checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-main" />
                    <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-500 dark:text-gray-400 text-right">
                  {item.created}
                </TableCell>
                <TableCell className="text-gray-500 dark:text-gray-400 text-right">
                  {item.lastViewed}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {startItem} - {endItem} of {totalItems}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Plus Button */}
      <button
        onClick={() => {
          setModalStep(1);
          setSelectedDashboardType(null);
          setDashboardName("");
          setSelectedSearch("");
          setIsModalOpen(true);
        }}
        className="fixed bottom-8 right-8 w-14 h-14 bg-main hover:bg-main/90 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 z-40"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Create Dashboard Modal */}
      <Dialog open={isModalOpen} onOpenChange={(open) => {
        setIsModalOpen(open);
        if (!open) {
          setModalStep(1);
          setSelectedDashboardType(null);
        }
      }}>
        <DialogContent className="sm:max-w-lg p-0 overflow-hidden" showCloseButton={false}>
          {modalStep === 1 ? (
            <>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Create New Dashboard</h2>
                  <span className="text-sm text-main font-medium">1 of 2</span>
                </div>

                <div className="space-y-3">
                  {/* Ecoute Sociale Option */}
                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-main/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#f02cb9]/20 to-[#f02cb9]/5 flex items-center justify-center">
                        <Radio className="w-6 h-6 text-[#f02cb9]" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Ecoute Sociale</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Monitor companies, brands or topics.</p>
                      </div>
                    </div>
                    <Button 
                      className="bg-main hover:bg-main/90 text-white"
                      onClick={() => {
                        setSelectedDashboardType("ecoute");
                        setDashboardName("Ecoute Sociale");
                        setModalStep(2);
                      }}
                    >
                      Build Dashboard
                    </Button>
                  </div>

                  {/* Audience Option */}
                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-main/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-main/20 to-main/5 flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-main" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Audience</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Benchmark multiple companies or brands.</p>
                      </div>
                    </div>
                    <Button 
                      className="bg-main hover:bg-main/90 text-white"
                      onClick={() => {
                        setSelectedDashboardType("audience");
                        setDashboardName("Audience");
                        setModalStep(2);
                      }}
                    >
                      Build Dashboard
                    </Button>
                  </div>

                  {/* Mentions Option */}
                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-main/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <Brain className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Mentions</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Analyze a company, brand or topic.</p>
                      </div>
                    </div>
                    <Button 
                      className="bg-main hover:bg-main/90 text-white"
                      onClick={() => {
                        setSelectedDashboardType("mentions");
                        setDashboardName("Mentions");
                        setModalStep(2);
                      }}
                    >
                      Build Dashboard
                    </Button>
                  </div>

                  {/* Sentiments Option */}
                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-main/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                        <Settings className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Sentiments</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Create a custom dashboard from scratch.</p>
                      </div>
                    </div>
                    <Button 
                      className="bg-main hover:bg-main/90 text-white"
                      onClick={() => {
                        setSelectedDashboardType("sentiments");
                        setDashboardName("Sentiments");
                        setModalStep(2);
                      }}
                    >
                      Build Dashboard
                    </Button>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <Button
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-600 dark:text-gray-300"
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Attach search to dashboard</h2>
                  <span className="text-sm text-main font-medium">2 of 2</span>
                </div>

                {/* Dashboard Preview */}
                <div className="flex gap-4 mb-8 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                  <div className="w-24 h-16 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center overflow-hidden shadow-sm">
                    <div className="grid grid-cols-2 gap-1 p-1.5 w-full h-full">
                      <div className="bg-main/30 rounded-sm"></div>
                      <div className="bg-[#f02cb9]/30 rounded-sm"></div>
                      <div className="bg-primary/30 rounded-sm"></div>
                      <div className="bg-main/20 rounded-sm"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-main">
                      {selectedDashboardType === "ecoute" && "Ecoute Sociale Dashboard"}
                      {selectedDashboardType === "audience" && "Audience Dashboard"}
                      {selectedDashboardType === "mentions" && "Mentions Dashboard"}
                      {selectedDashboardType === "sentiments" && "Sentiments Dashboard"}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      A good way to explore data, this dashboard visually breaks down trends and metrics around a search.
                    </p>
                  </div>
                </div>

                {/* Choose a Search */}
                <div className="mb-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Choose a Search</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Select the search you want to analyze.</p>
                    </div>
                    <Select value={selectedSearch} onValueChange={setSelectedSearch}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Primary Search" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="primary">Primary Search</SelectItem>
                        <SelectItem value="secondary">Secondary Search</SelectItem>
                        <SelectItem value="custom">Custom Search</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Name Your Dashboard */}
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Name Your Dashboard</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Give it a clear name that signals its purpose.</p>
                    </div>
                    <div className="relative w-48">
                      <Input
                        value={dashboardName}
                        onChange={(e) => setDashboardName(e.target.value)}
                        className="pr-8"
                        placeholder="Dashboard name"
                      />
                      {dashboardName && (
                        <button
                          onClick={() => setDashboardName("")}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-main transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setModalStep(1)}
                  className="text-gray-600 dark:text-gray-300"
                >
                  Back
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-600 dark:text-gray-300"
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="bg-main hover:bg-main/90 text-white"
                    onClick={() => {
                      // Handle create dashboard based on type
                      console.log("Creating dashboard, type:", selectedDashboardType);
                      if (selectedDashboardType === "ecoute") {
                        console.log("Navigating to social-listening");
                        router.push("/ai-analyste/social-listening");
                      } else if (selectedDashboardType === "audience") {
                        router.push("/ai-analyste/audience");
                      } else if (selectedDashboardType === "mentions") {
                        router.push("/ai-analyste/mentions");
                      } else if (selectedDashboardType === "sentiments") {
                        router.push("/ai-analyste/sentiments");
                      }
                      setIsModalOpen(false);
                    }}
                  >
                    Create Dashboard
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
