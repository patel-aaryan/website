import "server-only";

function requireEnv(name: string): string {
  const raw = process.env[name];
  if (!raw?.trim()) throw new Error(`Missing required environment variable: ${name}`);

  return raw.trim();
}

export const serverConfig = {
  /** Address used as the Resend `from` identity (must match a verified domain in Resend) */
  fromEmail: requireEnv("FROM_EMAIL"),
  toEmail: requireEnv("TO_EMAIL"),
};
