export async function POST(request: Request) {
  try {
    const { message, conversationId } = await request.json();
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const aiResponses = [
      "That's an interesting question! Let me think about it...",
      "I understand what you're asking. Here's my perspective:",
      "Based on what you've shared, I would suggest:",
      "That's a great point. Here are some thoughts:",
      "I'd be happy to help you with that. Consider this:",
      "Excellent question! From my analysis:",
      "Let me break this down for you:",
      "I appreciate you sharing that. My recommendation would be:",
      "That's something I can definitely assist with:",
      "Interesting perspective! Here's what I think:"
    ];
    
    const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
    const contextualResponse = `${randomResponse} (Replying to: "${message.slice(0, 50)}${message.length > 50 ? '...' : ''}")`;
    
    const aiMessage = {
      id: crypto.randomUUID(),
      message: contextualResponse,
      timestamp: new Date().toISOString(),
      sender: 'ai' as const,
      status: 'sent' as const
    };
    
    return new Response(JSON.stringify(aiMessage), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to process message' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}