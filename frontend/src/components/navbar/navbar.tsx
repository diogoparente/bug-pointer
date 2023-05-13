import Link from "next/link";
import { ConnectButton } from "../connect-button";
import { FadingLine } from "../fading-line";

function Navbar() {
  return (
    <nav className="relative flex w-full items-center justify-between px-10 py-6">
      <Link href="/">
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-mainPurple to-mainGreen" />
      </Link>
      <ConnectButton />
      <FadingLine className="absolute bottom-0 left-0" />
    </nav>
  );
}

export { Navbar };
