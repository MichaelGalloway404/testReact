import { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState("");
  const [phrase, setPhrase] = useState("");
  const [phrases, setPhrases] = useState([]);

  async function submitPhrase() {
    if (!name || !phrase) return alert("Enter name and phrase");

    const res = await fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phrase }),
    });

    const data = await res.json();

    if (!data.ok) return alert("Failed to submit");

    setName("");
    setPhrase("");
    loadPhrases(); // Refresh after submit
  }

  async function loadPhrases() {
    try {
      const res = await fetch("/api");
      const data = await res.json();

      if (!Array.isArray(data)) {
        console.error("API returned:", data);
        alert("API error — check console");
        return;
      }

      setPhrases(data);
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Failed to load phrases");
    }
  }

  return (
    <main style={{ padding: 20 }}>
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
        {phrases.map((p) => (
          <li key={p.id}>
            <strong>{p.name}:</strong> {p.phrase}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
