const headers = { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" };

export async function createGeminiToken(apiKey, fetcher = fetch) {
  if (!apiKey) throw new Error("Natural voice is not configured yet.");
  const now = Date.now();
  const response = await fetcher("https://generativelanguage.googleapis.com/v1beta/auth_tokens", {
    method: "POST",
    headers: { "content-type": "application/json", "x-goog-api-key": apiKey },
    body: JSON.stringify({
      uses: 1,
      expireTime: new Date(now + 30 * 60 * 1000).toISOString(),
      newSessionExpireTime: new Date(now + 60 * 1000).toISOString()
    })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.name) throw new Error(data?.error?.message || "Natural voice could not start.");
  return { token: data.name, model: "gemini-2.5-flash-native-audio-preview-12-2025" };
}

async function handler(request, env = {}) {
  if (request.method !== "POST") return new Response(JSON.stringify({ error: "Use the voice button to start." }), { status: 405, headers });
  try {
    return new Response(JSON.stringify(await createGeminiToken(env.GEMINI_API_KEY)), { headers });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 503, headers });
  }
}

export const onRequestPost = context => handler(context.request, context.env);
export const onRequestGet = context => handler(context.request, context.env);
