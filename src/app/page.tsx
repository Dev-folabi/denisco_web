export default function HomePage() {
  return (
    <main className="container" style={{ paddingTop: "96px", paddingBottom: "96px" }}>
      <span className="eyebrow">Integrated Agriculture</span>
      <h1
        className="font-serif text-forest mt-4"
        style={{ fontSize: "clamp(30px, 6vw, 50px)", fontWeight: 600 }}
      >
        DENISCO Global Agriculture
      </h1>
      <p className="text-muted mt-4 max-w-xl" style={{ fontSize: "15px" }}>
        Nigeria&apos;s leading integrated agriculture company. Quality farm
        products, expert consultation, and sustainable farming solutions.
      </p>
    </main>
  );
}
