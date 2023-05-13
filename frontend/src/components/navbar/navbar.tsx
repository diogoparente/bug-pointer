import { ConnectButton } from "../connect-button";
import { FadingLine } from "../fading-line";
function Navbar() {
  return (
    <nav className="relative flex w-full items-center justify-between p-4">
      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-mainPurple to-mainGreen"></div>
      <ConnectButton />
      <FadingLine className="absolute bottom-0 left-0" />
    </nav>
  );
}

export { Navbar };
