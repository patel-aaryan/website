import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import data from "../data/portfolio.json";
import { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Head>
        <title>{data.name}</title>
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App;