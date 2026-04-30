function createPublicConfig() {
  const nextPublicEmail = process.env.NEXT_PUBLIC_EMAIL;
  if (!nextPublicEmail) throw new Error("NEXT_PUBLIC_EMAIL is not set");

  return { nextPublicEmail };
}

export const clientConfig = createPublicConfig();
