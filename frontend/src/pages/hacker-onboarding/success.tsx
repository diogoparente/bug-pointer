import CustomLink from "@/components/custom-link";
import { Page } from "@/components/page";
import { SubHeader } from "@/components/text";
import Head from "next/head";

const Success = () => (
  <Page isMandatoryConnection>
    <Head>
      <title>{"Bug Pointer | Hacker Onboarding"}</title>
    </Head>
    <main className="flex flex-1 flex-col items-center justify-center gap-8">
      <SubHeader>Hacker Pass minted successfully!</SubHeader>
      <CustomLink href="/contests" type="button" color="green">
        Go to Contests
      </CustomLink>
    </main>
  </Page>
);

export default Success;
