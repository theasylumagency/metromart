export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-page text-ink p-5">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-extrabold text-accent">404</h1>
        <p className="mt-2 text-lg text-muted">Page not found</p>
        <a href="/" className="mt-6 inline-block rounded-full bg-ink text-white px-6 py-2.5 text-sm font-semibold shadow-soft">
          Return Home
        </a>
      </div>
    </div>
  );
}
