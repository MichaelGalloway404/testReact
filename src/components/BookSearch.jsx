import { useState } from "react";
import { getIsbnFromName } from "../api/openLibrary";

function BookSearch() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async () => {
    setLoading(true);
    const data = await getIsbnFromName(title, author);
    setResults(data);
    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Book Search</h2>

      <input
        placeholder="Book title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />

      <input
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <br />

      <button onClick={searchBooks}>
        Search
      </button>

      {loading && <p>Loading...</p>}

      <ul>
        {results.map((book, i) => (
          <li key={i} style={{ marginBottom: 15 }}>
            <strong>{book.title}</strong><br />
            {book.author}<br />
            {book.isbn && <span>ISBN: {book.isbn}</span>}<br />
            <img
              src={book.coverUrl}
              alt={book.title}
              style={{ marginTop: 5 }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookSearch;
