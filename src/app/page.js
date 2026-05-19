export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-5xl font-bold text-blue-600 mb-4">Welcome to DriveFleet</h1>
      <p className="text-gray-500 text-lg max-w-xl">
        Your trusted platform to explore, book, and manage car rentals — fast, simple, and secure.
      </p>
      
      <a
        href="/cars"
        className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-700 transition"
      >
        Explore Cars →
      </a>
    </section>
  );
}