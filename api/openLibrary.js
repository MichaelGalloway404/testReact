import axios from "axios";

export async function getIsbnFromName(title, author) {
  const covers = [];
  const params = new URLSearchParams();

  if (title) params.append("title", title);
  if (author) params.append("author", author);

  try {
    const response = await axios.get(
      `https://openlibrary.org/search.json?${params.toString()}`
    );

    for (const doc of response.data.docs || []) {
      if (doc.cover_i) {
        covers.push({
          title: doc.title,
          author: (doc.author_name || []).join(", "),
          coverUrl: `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`,
          isbn: doc.isbn?.[0] || null,
        });
      }
    }
  } catch (err) {
    console.error("OpenLibrary error:", err.message);
  }

  return covers;
}
