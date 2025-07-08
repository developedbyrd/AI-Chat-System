export async function GET() {
  try {
    const mockHistory = [
      {
        id: "1",
        message: "Hello! How can I help you today?",
        timestamp: new Date(Date.now() - 60000).toISOString(),
        sender: 'ai' as const,
        status: 'sent' as const
      }
    ];
    
    return new Response(JSON.stringify({
      messages: mockHistory,
      conversationId: crypto.randomUUID()
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to load chat history' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}