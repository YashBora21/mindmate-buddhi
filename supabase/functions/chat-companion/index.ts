import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [], tone = "gentle" } = await req.json();
    
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set');
    }

    // Check for high-risk content (self-harm, suicidal thoughts)
    const riskKeywords = ['suicide', 'kill myself', 'end my life', 'self-harm', 'hurt myself', 'want to die', 'no point living'];
    const isHighRisk = riskKeywords.some(keyword => 
      message.toLowerCase().includes(keyword)
    );

    let systemPrompt = `You are MannMitra, a compassionate mental health companion for students in India. You provide emotional support, validate feelings, and offer gentle coping strategies.

CONVERSATION GUIDELINES:

1. STARTING CONVERSATION:
- Greet warmly: "Hi, I'm glad you reached out today. How are you feeling right now?"
- Always use a gentle, caring tone by default

2. GENERAL SUPPORT MODE (stress/anxiety/sadness but NOT suicidal):
- Validate their feelings first
- Offer small, simple coping suggestions
- Invite further sharing
- Example: "That sounds really tough, thank you for telling me. You're not alone in feeling this way. Sometimes, even taking a few slow, deep breaths can ease the pressure a little. Would you like to try that now, or talk more about what's been on your mind?"

3. TONE VARIATIONS:
- GENTLE (default): Warm, understanding, supportive
- CHEERFUL: More upbeat, encouraging with emojis like 🌟 💙
- FORMAL: Professional, structured, clinical but still caring

4. SAFETY RESPONSES:
If user mentions self-harm or suicidal thoughts, immediately respond with:
"It sounds like you're in a lot of pain right now, and I'm really concerned for your safety. Please know that I care about you, but I am not a medical professional. The most important thing right now is for you to reach out for support.

Here are confidential helplines you can call:
• AASRA: +91-22-27546669
• Vandrevala Foundation: 1860 2662 345  
• Snehi: +91-9582208181

You don't have to go through this alone. Please reach out to a trusted friend, family member, or teacher right now. I'll be here to listen if you'd like to keep talking."

5. CLOSING CONVERSATIONS:
"I'm really glad you shared your feelings with me today. Remember, taking care of yourself is important, and you're not alone in this. Whenever you'd like to talk again, I'll be here for you. Take care of yourself. 💙"

CURRENT TONE: ${tone}
${isHighRisk ? 'CRITICAL: User may be at risk - prioritize safety response above all else.' : ''}

Keep responses concise, warm, and focused on emotional support. Always validate feelings before offering suggestions.`;

    // Build conversation context
    const messages = [
      { role: "system", content: systemPrompt }
    ];

    // Add conversation history
    conversationHistory.forEach((msg: any) => {
      messages.push({
        role: msg.isUser ? "user" : "model",
        content: msg.content
      });
    });

    // Add current message
    messages.push({
      role: "user", 
      content: message
    });

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: messages.map(msg => ({ text: `${msg.role}: ${msg.content}` })).slice(-10) // Keep last 10 messages for context
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      console.error('Gemini API error:', await response.text());
      throw new Error('Failed to generate response');
    }

    const data = await response.json();
    console.log('Gemini response:', data);

    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm here to listen. Could you tell me more about how you're feeling?";

    return new Response(JSON.stringify({ 
      response: generatedText,
      isHighRisk 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chat-companion function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      response: "I'm here to support you. Sometimes I have technical difficulties, but your feelings matter to me. How are you doing right now?"
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});