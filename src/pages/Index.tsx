import { useState } from "react";
import BottomNavigation from "@/components/BottomNavigation";
import ChatInterface from "@/components/ChatInterface";
import MoodTracker from "@/components/MoodTracker";
import LearningHub from "@/components/LearningHub";

const Index = () => {
  const [activeTab, setActiveTab] = useState("chat");

  const renderContent = () => {
    switch (activeTab) {
      case "chat":
        return <ChatInterface />;
      case "mood":
        return <MoodTracker />;
      case "learn":
        return <LearningHub />;
      default:
        return <ChatInterface />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-calm flex flex-col">
      <main className="flex-1 pb-20 overflow-hidden">
        {renderContent()}
      </main>
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
