import Image from "next/image";
import { Canvas } from "./Canvas";

export default function Home() {
  return (
    <div className="flex justify-between flex-col items-end min-h-screen gap-2 font-[family-name:var(--font-geist-mono)] bg-black">
      <Canvas />
      <footer className="w-full p-2">
        <a
          className="flex items-center gap-1 hover:underline hover:underline-offset-4 text-xs text-gray-500"
          href="https://cargocollective.com/sagejenson/physarum"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/brain.svg"
            alt="brain icon"
            width={16}
            height={16}
          />
          Physarum
        </a>
      </footer>
    </div>
  );
}
