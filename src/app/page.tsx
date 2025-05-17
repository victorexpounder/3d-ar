import Image from "next/image";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import Glasses from "./Components/Glasses";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <main className="w-full min-h-screen">
        <Header />
        <Hero />
        <Glasses />
      </main>
      
    </div>
  );
}
