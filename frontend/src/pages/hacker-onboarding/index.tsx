import { Paragraph, SubHeader } from "@/components/text";
import { Page } from "@/components/page";
import IdKit from "@/components/id-kit";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useHasHackerPass from "@/hooks/useHasHackerPass";

const HackerOnboarding = () => {
  const { hasHackerPass } = useHasHackerPass();

  const router = useRouter();

  useEffect(() => {
    if (hasHackerPass) {
      router.push("/contests");
    }
  }, [hasHackerPass, router]);

  return (
    <Page isMandatoryConnection>
      <main className="flex flex-1 flex-col items-center justify-center gap-8">
        <SubHeader>Claim your Hacker Pass!</SubHeader>
        <Paragraph>Validate your identity with WorldCoin and mint your Hacker Pass to start!</Paragraph>
        <IdKit />
      </main>
    </Page>
  );
};

export default HackerOnboarding;
