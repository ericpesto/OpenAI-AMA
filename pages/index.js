import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [questionInput, setQuestionInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: questionInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setQuestionInput("");
  }

  return (
    <div>
      <Head>
        <title>Open AI Ask Me Anything</title>
        <link rel="icon" href="/8ball.svg" />
      </Head>

      <main className={styles.main}>
        <h3>Ask me anything 🤔</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="question"
            placeholder="Enter an question"
            value={questionInput}
            onChange={(e) => setQuestionInput(e.target.value)}
          />
          <input type="submit" value="Generate answer" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
