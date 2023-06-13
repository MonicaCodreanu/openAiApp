import { useState } from "react";
import styles from "./index.module.css";
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
      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Free travel suggestions</h3>
        <h4>
          Tell me where do you travel and when (summer/winter) and I can suggest
          travel destinations.
        </h4>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Desired number of suggestions"
            value={numberInput}
            onChange={(e) => setNumberInput(e.target.value)}
          />
          <input
            type="text"
            name="animal"
            placeholder="Enter a destination"
            value={destinationInput}
            onChange={(e) => setDestinationInput(e.target.value)}
          />
          <input
            type="text"
            name="animal"
            placeholder="When do you plan to visit?"
            value={periodInput}
            onChange={(e) => setPeriodInput(e.target.value)}
          />
          <input type="submit" value="Generate travel destinations" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}

export default Visit;
