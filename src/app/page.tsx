import Image from "next/image";
import Header from "./Components/Header";
import Hero from "./Components/Hero";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <main className="w-full min-h-screen">
        <Header />
        <Hero />
      </main>
      
    </div>
  );
}
