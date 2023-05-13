import { Paragraph, SubHeader } from "@/components/text";
import Button from "@/components/button";
import { Page } from "@/components/page";

const HackerOnboarding = () => {
  return (
    <Page isMandatoryConnection>
      <main className="flex flex-1 flex-col items-center justify-center gap-8">
        <SubHeader>Claim your Hacker Pass!</SubHeader>
        <Paragraph>Validate your identity with WorldCoin and mint your Hacker Pass to start!</Paragraph>
        <Button color="green" className="mt-6">
          Claim Hacker Pass
        </Button>
      </main>
    </Page>
  );
};

export default HackerOnboarding;
