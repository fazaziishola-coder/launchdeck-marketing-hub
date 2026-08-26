import { generateWithGemini } from './geminiClient';

export interface AIProviderConfig {
  name: 'Gemini' | 'OpenAI' | 'Anthropic' | 'FallbackTemplate';
  model: string;
  apiKeyEnv: string;
  isAvailable: boolean;
  quotaStatus: 'HEALTHY' | 'WARNING' | 'EXHAUSTED';
  lastUsed?: Date;
  failoverCount: number;
}

const PROVIDER_STATUS: AIProviderConfig[] = [
  { name: 'Gemini', model: 'gemini-1.5-flash', apiKeyEnv: 'GEMINI_API_KEY', isAvailable: true, quotaStatus: 'HEALTHY', failoverCount: 0 },
  { name: 'OpenAI', model: 'gpt-4o-mini', apiKeyEnv: 'OPENAI_API_KEY', isAvailable: true, quotaStatus: 'HEALTHY', failoverCount: 0 },
  { name: 'Anthropic', model: 'claude-3-5-haiku-20241022', apiKeyEnv: 'ANTHROPIC_API_KEY', isAvailable: true, quotaStatus: 'HEALTHY', failoverCount: 0 },
  { name: 'FallbackTemplate', model: 'rule-based-generator', apiKeyEnv: '', isAvailable: true, quotaStatus: 'HEALTHY', failoverCount: 0 },
];

export async function executePromptWithFallback(prompt: string, systemInstruction?: string): Promise<{ text: string; providerUsed: string }> {
  for (const provider of PROVIDER_STATUS) {
    if (provider.name === 'Gemini' && process.env.GEMINI_API_KEY) {
      try {
        const text = await generateWithGemini(prompt, systemInstruction);
        if (text) {
          provider.lastUsed = new Date();
          provider.quotaStatus = 'HEALTHY';
          return { text, providerUsed: 'Google Gemini (gemini-1.5-flash)' };
        }
      } catch (e: any) {
        provider.failoverCount++;
        provider.quotaStatus = String(e?.message).includes('429') ? 'EXHAUSTED' : 'WARNING';
        console.warn(`[Fallback Router] Gemini failed (${e?.message}). Failing over...`);
      }
    }
  }

  return { text: '', providerUsed: 'Fallback Engine' };
}

export async function executeWithFallback<T>(
  promptTask: (provider: AIProviderConfig) => Promise<T>,
  onFailover?: (from: string, to: string, reason: string) => void
): Promise<{ result: T; providerUsed: string; failoversOccurred: number }> {
  let lastError: any = null;
  let failoversOccurred = 0;

  for (let i = 0; i < PROVIDER_STATUS.length; i++) {
    const provider = PROVIDER_STATUS[i];
    const apiKey = provider.apiKeyEnv ? process.env[provider.apiKeyEnv] : 'LOCAL_KEY';

    if (!apiKey && provider.name !== 'FallbackTemplate') {
      provider.quotaStatus = 'WARNING';
      continue;
    }

    try {
      const result = await promptTask(provider);
      provider.lastUsed = new Date();
      provider.quotaStatus = 'HEALTHY';

      return {
        result,
        providerUsed: `${provider.name} (${provider.model})`,
        failoversOccurred,
      };
    } catch (error: any) {
      lastError = error;
      provider.failoverCount++;
      const errorMessage = String(error?.message || error);
      const isQuotaError =
        errorMessage.includes('429') ||
        errorMessage.includes('quota') ||
        errorMessage.includes('RESOURCE_EXHAUSTED') ||
        errorMessage.includes('rate_limit_exceeded');

      provider.quotaStatus = isQuotaError ? 'EXHAUSTED' : 'WARNING';
      failoversOccurred++;

      const nextProvider = PROVIDER_STATUS[i + 1] ? PROVIDER_STATUS[i + 1].name : 'Rule-Based Fallback Engine';

      if (onFailover) {
        onFailover(provider.name, nextProvider, errorMessage);
      }
    }
  }

  throw new Error(`All AI model providers failed. Last error: ${String(lastError)}`);
}

export function getProviderHealthStatus(): AIProviderConfig[] {
  return PROVIDER_STATUS.map((p) => ({
    ...p,
    isAvailable: Boolean(p.apiKeyEnv ? process.env[p.apiKeyEnv] : true),
  }));
}
