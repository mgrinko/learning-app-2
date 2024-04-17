import Link from "next/link";

export default function Home() {
  return (
    <div>
      <nav>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>

      <main className="column">
        <h1>Hello Next.js</h1>
      </main>
    </div>
  );
}
