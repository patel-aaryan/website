import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import data from "../data/portfolio.json";

function App({ Component, pageProps }) {
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
