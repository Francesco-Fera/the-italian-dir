import Image from "next/image";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <div className='container mx-auto px-4 py-16 sm:px-6 lg:px-8'>
      <Hero />
    </div>
  );
}
