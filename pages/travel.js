import { useState } from "react";
import styles from "./travel.module.css";
import Navbar from "../components/Navbar";

function Visit() {
  //number, destination, period
  const [numberInput, setNumberInput] = useState("");
  const [destinationInput, setDestinationInput] = useState("");
  const [periodInput, setPeriodInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generateAdvise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number: numberInput,
          destination: destinationInput,
          period: periodInput,
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data.result);
      setNumberInput("");
      setDestinationInput("");
      setPeriodInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Navbar />
      <div className={styles.travel}>
        {!result && (
          <div className={styles.overlay}>
            <h2>Travel suggestions</h2>
            <h4>
              Do you plan to travel soon or on a specific season and you need
              some suggestions on what to do?
            </h4>
            <p>
              ChatGPT can suggest "a number" of things to do or visit when you
              travel to acertain "destination". You can even be more specific
              and provide the "season or period" in which you travel to get more
              appropriate suggestions.
            </p>
            <form className={styles.form} onSubmit={onSubmit}>
              <input
                className={styles.input}
                type="text"
                name="suggestions"
                placeholder="Desired number of suggestions"
                value={numberInput}
                onChange={(e) => setNumberInput(e.target.value)}
              />
              <input
                className={styles.input}
                type="text"
                name="destination"
                placeholder="Enter a destination"
                value={destinationInput}
                onChange={(e) => setDestinationInput(e.target.value)}
              />
              <input
                className={styles.input}
                type="text"
                name="when"
                placeholder="When do you plan to visit?"
                value={periodInput}
                onChange={(e) => setPeriodInput(e.target.value)}
              />
              <input className={styles.button} type="submit" value="Suggest" />
            </form>
          </div>
        )}
        <div className={styles.result}>{result}</div>
      </div>
    </div>
  );
}

export default Visit;
