export default function About() {
  return (
    <main className="mx-auto max-w-3xl px-3 py-6 prose">
      <h1>About</h1>
      <p>
        This educational app lets you search and curate artworks from open
        collections provided by The Metropolitan Museum of Art and the Cleveland
        Museum of Art.
      </p>
      <h2>Data sources</h2>
      <ul>
        <li>The Met Collection API (Open Access)</li>
        <li>Cleveland Museum of Art Open Access API</li>
      </ul>
      <h2>Accessibility</h2>
      <p>
        We aim for keyboard accessibility, screen reader labels, and sufficient
        color contrast.
      </p>
    </main>
  );
}
