import Image from "next/image";

export default function Home() {
  return (
    <div className="flex grow justify-between flex-col items-end min-h-screen px-7 pt-7 gap-2 font-[family-name:var(--font-geist-sans)] bg-black">
      <main className="flex grow h-full w-full bg-gray-800 flex-col">
        <canvas />
      </main>
      <footer>
        <div className="text-xs text-gray-500 font-[family-name:var(--font-geist-mono)] pb-3">
          <a
            className="flex items-center gap-1 hover:underline hover:underline-offset-4"
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
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
        </div>
      </footer>
    </div>
  );
}
