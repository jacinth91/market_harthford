import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, TrendingUp, TrendingDown, AlertTriangle, LineChart, DollarSign, CloudLightning, BarChart3 } from 'lucide-react';
import QueryResult from './QueryResult';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  showSuggestions: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ showSuggestions }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const metrics = [
    {
      category: "Financial Performance",
      value: "Net Income: $5.1 billion",
      details: "$1.42 per share",
      trend: "up" as const
    },
    {
      category: "Financial Performance",
      value: "Revenue: $20.4 billion",
      details: "2% YoY decline",
      trend: "down" as const
    },
    {
      category: "Financial Performance",
      value: "Net Interest Income",
      details: "Decreased by 11%",
      trend: "down" as const
    },
    {
      category: "Financial Performance",
      value: "Noninterest Income",
      details: "Increased by 12%",
      trend: "up" as const
    },
    {
      category: "Credit Quality",
      value: "Credit Loss Provisions",
      details: "$1.1 billion set aside",
      trend: "neutral" as const
    },
    {
      category: "Credit Quality",
      value: "Net Loan Charge-Offs",
      details: "Rose to 0.49% of average loans",
      trend: "up" as const
    },
    {
      category: "Loans and Deposits",
      value: "Average Loans",
      details: "$910.3 billion (down 3% YoY)",
      trend: "down" as const
    },
    {
      category: "Loans and Deposits",
      value: "Average Deposits",
      details: "Stable at $1.3 trillion",
      trend: "neutral" as const
    }
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: query
    };

    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);
    setShowResults(false);

    // Simulate API response
    setTimeout(() => {
      const newAssistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Here are the financial metrics based on your query:'
      };

      setMessages(prev => [...prev, newAssistantMessage]);
      setQuery('');
      setIsLoading(false);
      setShowResults(true);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex">
          {/* Main chat area */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-2xl rounded-lg px-4 py-2 ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p>{message.content}</p>
                    {message.type === 'assistant' && showResults && (
                      <QueryResult metrics={metrics} />
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg px-4 py-2">
                    <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Suggestions sidebar */}
          {showSuggestions && (
            <div className="w-72 border-l border-gray-200 p-4 overflow-y-auto">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Suggested Queries</h3>
              <div className="space-y-2">
                {[
                  { icon: TrendingUp, title: "Revenue Analysis", query: "What was the total revenue in Q3 2024?" },
                  { icon: TrendingDown, title: "Interest Income", query: "How did net interest income perform?" },
                  { icon: LineChart, title: "Segment Performance", query: "Show segment performance metrics" },
                  { icon: AlertTriangle, title: "Credit Quality", query: "What are the credit quality indicators?" },
                  { icon: DollarSign, title: "Premium Growth", query: "Show written premium growth trends" },
                  { icon: CloudLightning, title: "Catastrophe Impact", query: "Detail catastrophe losses for Q3" },
                  { icon: BarChart3, title: "Reserve Development", query: "Explain reserve development trends" }
                ].map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setQuery(suggestion.query);
                      if (textareaRef.current) {
                        textareaRef.current.focus();
                      }
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2 group"
                  >
                    <suggestion.icon className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                        {suggestion.title}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chat input area */}
      <div className="px-4 pb-4">
        <div className="mx-auto max-w-3xl">
          <form onSubmit={handleSubmit} className="relative">
            <textarea
              ref={textareaRef}
              rows={1}
              className="block w-full px-4 py-3 pr-20 text-gray-900 placeholder-gray-500 rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 border border-gray-200"
              style={{
                minHeight: '56px',
                maxHeight: '200px'
              }}
              placeholder="Ask about Q3 2024 financial metrics..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="absolute right-2 bottom-2 inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </form>
          <p className="mt-2 text-xs text-center text-gray-500">
            Press Enter to send, Shift + Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;