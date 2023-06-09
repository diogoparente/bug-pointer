/* eslint-disable max-len */
import useAuthentication from "@/hooks/useAuthentication";
import { SubHeader } from "../text";
import { cn } from "@/utils/utils";
import { useState, useEffect } from "react";

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
    <div className={cn(`flex min-h-screen w-screen flex-col items-center justify-start`, className)}>
      {!isMandatoryConnection || isMounted ? (
        isAuthed ? (
          children
        ) : (
          <main className="flex flex-1 flex-col items-center justify-center p-4">
            <SubHeader className="text-center">You need to connect your wallet to continue</SubHeader>
          </main>
        )
      ) : null}
    </div>
  );
}

export { Page };
