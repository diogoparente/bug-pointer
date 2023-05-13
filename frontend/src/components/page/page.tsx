/* eslint-disable max-len */
import useAuthentication from "@/hooks/useAuthentication";
import { Navbar } from "@/components/navbar";
import { SubHeader } from "../text";
import { cn } from "@/utils/utils";
import { Source_Code_Pro } from "next/font/google";
import { useState, useEffect } from "react";

const source_code_pro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-code-pro",
});

interface PageProps extends DefaultProps {
  isMandatoryConnection?: boolean;
}

function Page({ className, children, isMandatoryConnection = false }: PageProps) {
  const { isAuthed } = useAuthentication(isMandatoryConnection);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div
      className={cn(
        // eslint-disable-next-line max-len
        `flex min-h-screen w-screen flex-col items-center justify-start ${source_code_pro.variable} font-sourceCodePro text-white`,
        className
      )}
    >
      <Navbar />
      {!isMandatoryConnection || isMounted ? (
        isAuthed ? (
          children
        ) : (
          <main className="flex flex-1 flex-col items-center justify-center">
            <SubHeader className="text-center">You need to connect your wallet to continue</SubHeader>
          </main>
        )
      ) : null}
    </div>
  );
}

export { Page };
