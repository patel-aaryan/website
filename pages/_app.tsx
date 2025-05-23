import "../styles/globals.css";
import "../styles/projects.css";
import "../styles/projectsMobile.css";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import data from "../data/portfolio.json";
import { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultTheme="dark">
      <Head>
        <title>{data.name}</title>
      </Head>
      <div className="mx-4">
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}

export default App;
