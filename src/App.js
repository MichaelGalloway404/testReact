import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [phrase, setPhrase] = useState("");
  const [phrases, setPhrases] = useState([]);

  const submitPhrase = async () => {
    await fetch("http://localhost:5000/api/phrases", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phrase }),
    });

    setName("");
    setPhrase("");
  };

  const loadPhrases = async () => {
    const res = await fetch("http://localhost:5000/api/phrases");
    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error("API returned:", data);
      alert("API error — check console");
      return;
    }

    setPhrases(data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Phrase Wall</h1>

      <input
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <input
        placeholder="Your phrase"
        value={phrase}
        onChange={(e) => setPhrase(e.target.value)}
      />
      <br />

      <button onClick={submitPhrase}>Submit</button>
      <button onClick={loadPhrases} style={{ marginLeft: 10 }}>
        Load Phrases
      </button>

      <ul>
        {phrases.map((p, i) => (
          <li key={i}>
            <strong>{p.name}:</strong> {p.phrase}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
