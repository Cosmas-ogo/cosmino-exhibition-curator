import ExhibitionEditor from "../components/ExhibitionEditor";

export default function Exhibition() {
  return (
    <main className="mx-auto max-w-5xl px-3 py-6">
      <h1 className="text-2xl font-semibold">My Exhibition</h1>
      <ExhibitionEditor />
    </main>
  );
}
