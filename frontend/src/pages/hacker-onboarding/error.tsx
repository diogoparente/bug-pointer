import CustomLink from "@/components/custom-link";
import { Page } from "@/components/page";
import { SubHeader } from "@/components/text";
import Head from "next/head";

const Error = () => (
  <Page isMandatoryConnection>
    <Head>
      <title>{"Bug Pointer | Hacker Onboarding"}</title>
    </Head>
    <main className="flex flex-1 flex-col items-center justify-center gap-8">
      <SubHeader>Wasn&#39;t able to mint Hacker Pass</SubHeader>
      <CustomLink href="/hacker-onboarding" type="button" color="green">
        Try Again
      </CustomLink>
    </main>
  </Page>
);

export default Error;
