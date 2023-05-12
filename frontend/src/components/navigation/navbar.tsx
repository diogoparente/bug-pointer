import { ConnectButton } from "../connect-button";
import { FadingLine } from "../fading-line";
import { SubHeader } from "../text";
export default function Navbar() {
  return (
    <nav className="relative flex w-full items-center justify-between p-10">
      <SubHeader className="bg-gradient-to-r from-mainPurple to-mainGreen bg-clip-text text-transparent">
        {"<Bug Pointer/>"}
      </SubHeader>
      <ConnectButton />
      <FadingLine className="absolute bottom-0 left-0" />
    </nav>
  );
}
