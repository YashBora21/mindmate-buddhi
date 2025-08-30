import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'bot', content: string }>>([]);

  const handleStart = () => {
    setIsStarted(true);
    setMessages([
      {
        type: 'bot',
        content: "Hello! I'm MindMate, your mental wellness companion. I'm here to listen and support you on your journey. What's on your mind today?"
      }
    ]);
  };

  const handleSend = () => {
    if (!message.trim()) return;
    
    setMessages(prev => [...prev, { type: 'user', content: message }]);
    setMessage("");
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'bot',
        content: "Thank you for sharing that with me. It takes courage to express your feelings. Remember, you're not alone in this journey. How are you feeling right now?"
      }]);
    }, 1000);
  };

  if (!isStarted) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-6 text-center">
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-accent rounded-full flex items-center justify-center">
            <MessageCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">MannMitra</h1>
          <p className="text-muted-foreground text-lg">Your Mental Wellness Companion</p>
        </div>
        
        <Card className="p-6 mb-8 bg-card shadow-card">
          <h2 className="text-xl font-semibold mb-3 text-foreground">Ready to talk?</h2>
          <p className="text-muted-foreground">
            I'm here to listen and support you on your mental wellness journey.
          </p>
        </Card>
        
        <Button 
          onClick={handleStart}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 shadow-soft"
        >
          Start Talking to MindMate
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <Card className={`max-w-[80%] p-3 ${
              msg.type === 'user' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card shadow-card'
            }`}>
              <p className="text-sm">{msg.content}</p>
            </Card>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-border bg-card">
        <div className="flex gap-2">
          <Textarea
            placeholder="Share what's on your mind..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 min-h-[44px] max-h-32 resize-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button 
            onClick={handleSend}
            disabled={!message.trim()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground p-3"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;