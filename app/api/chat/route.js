export async function POST(request) {
  try {
    const { messages, model = 'llama-3.1-8b-instant' } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Messages array is required' }), {
        status: 400
      })
    }

    const GROQ_API_KEY = process.env.GROQ_API_KEY
    
    if (!GROQ_API_KEY) {
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500
      })
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: 0.8,
        max_tokens: 1500,
        stream: false
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      return new Response(JSON.stringify({ 
        error: errorData.error?.message || 'Groq API request failed' 
      }), {
        status: response.status
      })
    }

    const data = await response.json()
    return new Response(JSON.stringify(data))
    
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500
    })
  }
}