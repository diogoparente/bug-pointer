import Link from "next/link";
import { ConnectButton } from "../connect-button";
import { FadingLine } from "../lines";
import Image from "next/image";

function Navbar() {
  return (
    <nav className="relative flex w-full items-center justify-between px-5 py-2">
      <Link href="/">
        <Image alt="bug-pointer logo" src={"/logo.png"} height={75} width={75} />
      </Link>
      <ConnectButton />
      <FadingLine className="absolute bottom-0 left-0" />
    </nav>
  );
}

export { Navbar };
