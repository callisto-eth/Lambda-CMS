import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="px-5 py-10 border-t border-white border-opacity-10 ">
      <Image
        src={'/Logo.svg'}
        alt="Lambda"
        width={80}
        height={80}
        className="col-span-2"
      />
      <div className="flex space-x-4 px-3 text-lg">
        <Link
          href="/toc"
          className="text-[#b4b3b4] hover:text-white transition-colors"
        >
          Terms
        </Link>
        <Link
          href="/privacy"
          className="text-[#b4b3b4] hover:text-white transition-colors"
        >
          Privacy
        </Link>
        <Link
          href="/security"
          className="text-[#b4b3b4] hover:text-white transition-colors"
        >
          Security
        </Link>
      </div>
    </footer>
  );
}
