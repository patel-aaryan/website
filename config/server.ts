import "server-only";

function requireEnv(name: string): string {
  const raw = process.env[name];
  if (!raw?.trim()) throw new Error(`Missing required environment variable: ${name}`);

  return raw.trim();
}

export const serverConfig = {
  mailgunDomain: requireEnv("MAILGUN_DOMAIN"),
  fromEmail: requireEnv("FROM_EMAIL"),
  toEmail: requireEnv("TO_EMAIL"),
};
