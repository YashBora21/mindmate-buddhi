import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [thoughts, setThoughts] = useState("");
  const [aiTip, setAiTip] = useState("");

  const moods = [
    { id: "sad", emoji: "😔", label: "Sad", color: "mood-sad" },
    { id: "okay", emoji: "😐", label: "Okay", color: "mood-okay" },
    { id: "good", emoji: "🙂", label: "Good", color: "mood-good" },
    { id: "great", emoji: "😄", label: "Great", color: "mood-great" },
  ];

  const handleGetTip = () => {
    const tips = {
      sad: "It's okay to feel sad sometimes. Try taking deep breaths, going for a short walk, or talking to someone you trust. Remember, this feeling will pass.",
      okay: "You're doing fine! Consider doing something that brings you small joy - maybe listening to your favorite song or having a warm drink.",
      good: "Great to hear you're feeling good! This is a perfect time to practice gratitude or do something kind for someone else.",
      great: "Wonderful! You're radiating positive energy. Consider sharing this joy with others or using this energy to tackle something you've been putting off."
    };
    
    const moodKey = selectedMood as keyof typeof tips;
    setAiTip(tips[moodKey] || "Keep taking care of your mental health. You're doing great by checking in with yourself!");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Mood Tracker</h1>
        <p className="text-muted-foreground">How are you feeling today?</p>
      </div>

      <Card className="p-6 mb-6 bg-card shadow-card">
        <h2 className="text-lg font-semibold mb-4 text-center text-foreground">
          How are you feeling today?
        </h2>
        
        <div className="grid grid-cols-4 gap-3 mb-6">
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => setSelectedMood(mood.id)}
              className={cn(
                "flex flex-col items-center p-3 rounded-lg transition-all duration-300",
                "hover:scale-105 active:scale-95",
                selectedMood === mood.id
                  ? `bg-${mood.color}/20 ring-2 ring-${mood.color}`
                  : "hover:bg-muted/50"
              )}
            >
              <span className="text-3xl mb-1">{mood.emoji}</span>
              <span className="text-xs font-medium text-foreground">{mood.label}</span>
            </button>
          ))}
        </div>

        <div className="mb-4">
          <h3 className="text-md font-medium mb-2 text-foreground">Write your thoughts...</h3>
          <Textarea
            placeholder="What's on your mind today? Share your thoughts and feelings..."
            value={thoughts}
            onChange={(e) => setThoughts(e.target.value)}
            className="min-h-[100px] resize-none"
          />
        </div>

        <Button
          onClick={handleGetTip}
          disabled={!selectedMood}
          className="w-full bg-success hover:bg-success/90 text-success-foreground font-medium py-3 rounded-lg transition-all duration-300"
        >
          Get AI Tip
        </Button>
      </Card>

      {aiTip && (
        <Card className="p-4 bg-gradient-primary text-white shadow-soft">
          <h4 className="font-semibold mb-2">💡 Your Personalized Tip</h4>
          <p className="text-sm opacity-90">{aiTip}</p>
        </Card>
      )}
    </div>
  );
};

export default MoodTracker;