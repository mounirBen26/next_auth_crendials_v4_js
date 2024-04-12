import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center cursor-pointer p-24">
      Have an account? <Link href="/login" className="hover:text-red-500 hover:font-bold">Login</Link>
      Don't have an account?<Link href="/register" className="hover:text-blue-500 hover:font-bold" >Register</Link>
    </main>
  );
}
