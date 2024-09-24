import Head from "next/head";
import data from "../data/portfolio.json";

export default function Resume() {
  return (
    <div>
      <Head>
        <title>{data.name} - Resume</title>
      </Head>
      <iframe
        className="w-full h-screen"
        src="/pdf/resume.pdf"
        style={{ border: "none" }}
      ></iframe>
    </div>
  );
}
