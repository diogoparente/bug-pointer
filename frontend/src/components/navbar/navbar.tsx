import Link from "next/link";
import { ConnectButton } from "../connect-button";
import { FadingLine } from "../lines";
import Image from "next/image";
import { cn } from "@/utils/utils";
import useHasHackerPass from "@/hooks/useHasHackerPass";

function Navbar() {
  const { hasHackerPass, hackerPassLevel, isLoading } = useHasHackerPass();

  return (
    <nav className="relative flex w-full items-center justify-between px-5 py-2">
      <Link href="/">
        <Image alt="bug-pointer logo" src={"/logo.png"} height={75} width={75} />
      </Link>
      <div className="flex flex-row items-center gap-4">
        {!isLoading && (
          <p className={cn("font-semibold text-white", !hasHackerPass && "text-red-600")}>
            {hasHackerPass ? "Hacker - Level " + hackerPassLevel : "No Hacker Pass"}
          </p>
        )}
        <ConnectButton />
      </div>
      <FadingLine className="absolute bottom-0 left-0" />
    </nav>
  );
}

export { Navbar };
