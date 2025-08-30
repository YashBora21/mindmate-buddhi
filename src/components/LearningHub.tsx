import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

const LearningHub = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  const mythsFacts = [
    {
      myth: "Talking about stress makes it worse.",
      fact: "Actually, talking about stress with trusted people or professionals helps reduce its impact and provides healthy coping strategies.",
      emoji: "😰"
    },
    {
      myth: "Mental health issues are just a phase that will pass.",
      fact: "Mental health conditions are real medical conditions that benefit from proper care, support, and sometimes professional treatment.",
      emoji: "🌱"
    },
    {
      myth: "Only weak people struggle with mental health.",
      fact: "Mental health challenges can affect anyone regardless of strength, success, or background. Seeking help shows courage and self-awareness.",
      emoji: "💪"
    },
    {
      myth: "Young people don't have real problems to stress about.",
      fact: "Academic pressure, social dynamics, and future uncertainties create significant stress for young people that deserves recognition and support.",
      emoji: "🎓"
    },
    {
      myth: "You should handle mental health problems alone.",
      fact: "Support from friends, family, and professionals is crucial for mental wellness. Community and connection are powerful healing tools.",
      emoji: "🤝"
    }
  ];

  const currentItem = mythsFacts[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % mythsFacts.length);
    setIsRevealed(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + mythsFacts.length) % mythsFacts.length);
    setIsRevealed(false);
  };

  const handleReveal = () => {
    setIsRevealed(true);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Awareness Hub</h1>
        <p className="text-muted-foreground">Myth vs Fact</p>
      </div>

      <div className="relative mb-6">
        <Button
          onClick={handlePrev}
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 rounded-full bg-card shadow-card"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <Button
          onClick={handleNext}
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 rounded-full bg-card shadow-card"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>

        <Card className="p-6 bg-card shadow-card min-h-[300px] flex flex-col justify-center">
          <div className="text-center mb-4">
            <div className="text-4xl mb-3">{currentItem.emoji}</div>
            <div className={cn(
              "inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4",
              !isRevealed ? "bg-warning text-warning-foreground" : "bg-success text-success-foreground"
            )}>
              {!isRevealed ? "MYTH" : "FACT"}
            </div>
          </div>

          <div className="text-center mb-6">
            <p className="text-foreground text-lg leading-relaxed">
              {!isRevealed ? `"${currentItem.myth}"` : currentItem.fact}
            </p>
          </div>

          {!isRevealed && (
            <Button
              onClick={handleReveal}
              className="mx-auto bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105"
            >
              Tap to reveal the fact
            </Button>
          )}
        </Card>
      </div>

      <div className="flex justify-center gap-2 mb-6">
        {mythsFacts.map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === currentIndex ? "bg-primary" : "bg-muted"
            )}
          />
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
        <Lightbulb className="w-4 h-4" />
        <span>Swipe or use arrows to explore more myths & facts</span>
      </div>
    </div>
  );
};

export default LearningHub;