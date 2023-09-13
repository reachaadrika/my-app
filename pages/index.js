// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <h3> College Dunia Next.js assignment </h3>
       <h3>Click on the following Go To Schools to get started </h3>
      <Link href="/schools">Go to Schools</Link>
    </div>
  );
}

