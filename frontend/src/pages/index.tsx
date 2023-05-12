import Button from "@/components/button";
import { Header } from "@/components/text";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-20">
      <Header className="px-32 text-center text-white">A sybil-resistant bounty platform</Header>
      <div className="flex flex-row items-center justify-center gap-16">
        <Button color="purple" className="text-3xl">
          I&#39;m a Sponsor
        </Button>
        <Button color="green" className="text-3xl">
          I&#39;m a Hacker
        </Button>
      </div>
    </main>
  );
}
