import { ConnectButton } from "@rainbow-me/rainbowkit";
export default function Navbar() {
  return (
    <nav className="mb-1 flex w-full items-center justify-between gap-8 px-16 py-8">
      <ConnectButton />
    </nav>
  );
}
