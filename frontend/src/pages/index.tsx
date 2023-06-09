import CustomLink from "@/components/custom-link";
import { NftCard } from "@/components/nft-card/nft-card";
import { Page } from "@/components/page";
import { Header } from "@/components/text";

export default function Home() {
  return (
    <Page>
      <main className="flex flex-1 flex-col items-center justify-center gap-20 p-6">
        <Header className="px-32 text-center text-white">A sybil-resistant bug bounty platform</Header>
        <NftCard />
        <div className="flex flex-row items-center justify-center gap-16">
          <CustomLink type="button" color="purple" className="text-xl" size="large" href={"/create-contest"}>
            I&#39;m a Sponsor
          </CustomLink>
          <CustomLink type="button" color="green" className="text-xl" size="large" href={"/hacker-onboarding"}>
            I&#39;m a Hacker
          </CustomLink>
        </div>
      </main>
    </Page>
  );
}
