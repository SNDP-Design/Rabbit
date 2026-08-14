import test from "node:test";
import assert from "node:assert/strict";
import { createGeminiToken } from "../functions/api/gemini-token.js";

test("creates a short-lived Gemini Live token without exposing the API key", async () => {
  let request;
  const result = await createGeminiToken("private-key", async (url, options) => {
    request = { url, options };
    return { ok: true, json: async () => ({ name: "ephemeral-token" }) };
  });
  assert.equal(result.token, "ephemeral-token");
  assert.equal(result.model, "gemini-2.5-flash-native-audio-preview-12-2025");
  assert.equal(request.options.headers["x-goog-api-key"], "private-key");
  assert.doesNotMatch(request.options.body, /private-key/);
  const body = JSON.parse(request.options.body);
  assert.equal(body.uses, 1);
});

test("requires secure server configuration", async () => {
  await assert.rejects(() => createGeminiToken(""), /not configured/i);
});
