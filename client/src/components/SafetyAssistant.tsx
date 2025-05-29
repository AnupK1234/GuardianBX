import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X, Send, Bot, User } from "lucide-react";
import axios from "@/lib/axios";

interface Message {
  id: number;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

interface SafetyAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const SafetyAssistant: React.FC<SafetyAssistantProps> = ({
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your BX Safety Assistant. I can help you with safety tips, emergency procedures, and answering questions about your neighborhood. How can I help you today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const sampleResponses = [
    "For immediate emergencies, always call 911. For non-emergency police matters in the Bronx, you can call (718) 590-5000.",
    "Great question! Here are some safety tips: Stay aware of your surroundings, keep your phone charged, and let someone know your location when out late.",
    "The safest areas in the Bronx typically include Riverdale, Pelham Bay, and parts of Fordham. Always check recent community reports for current conditions.",
    "To report a non-emergency incident, you can use our app's Report feature or call 311 for city services.",
    "Community watch programs are active in many Bronx neighborhoods. Check with your local precinct or community board for details.",
  ];

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    try {
      const res = await axios.post("/chatbot/message", { message: inputValue });

      const assistantMessage: Message = {
        id: messages.length + 2,
        text: res.data.reply || "Sorry, I could not process that.",
        sender: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "An error occurred while getting a response.",
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50">
      <Card className="w-96 h-[30rem] shadow-lg">
        <CardHeader className="bg-blue-600 text-white rounded-t-lg py-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-sm">
              <Bot className="h-5 w-5 mr-2" />
              BX Safety Assistant
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-blue-700 h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 flex flex-col h-96">
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[80%] ${
                    message.sender === "user"
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === "user" ? "bg-blue-100" : "bg-gray-100"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <User className="h-3 w-3 text-blue-600" />
                    ) : (
                      <Bot className="h-3 w-3 text-gray-600" />
                    )}
                  </div>
                  <div
                    className={`rounded-lg p-2 text-sm ${
                      message.sender === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t p-3">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about safety in the Bronx..."
                className="flex-1 text-sm"
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafetyAssistant;
