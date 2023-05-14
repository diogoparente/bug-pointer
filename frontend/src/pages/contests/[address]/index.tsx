import { DefaultBackground } from "@/components/default-background";
import { Page } from "@/components/page";
import Button from "@/components/button";
import { FilledText } from "@/components/filled-text";
import CustomLink from "@/components/custom-link";
import { ContestHeader } from "@/components/contest-header";
import { useRouter } from "next/router";
import { GetServerSideProps } from 'next'
import { getContestByAddress } from "@/database/entities";

type ContestProps = {
  contest: Contest;
};

const Contest = ({ contest }: ContestProps) => {
  const router = useRouter();

  return (
    <Page>
      <main className="flex w-full flex-1 flex-col items-center justify-start p-10">
        <DefaultBackground className="flex w-full flex-col gap-8">
          <ContestHeader contest={contest} mode="hacker" />
          <div className="flex flex-row justify-start gap-8">
            <CustomLink color="green" href={router.asPath + "/submit-vulnerability"} type="button">
              Submit Vulnerability
            </CustomLink>
            <Button color="green" size="small">
              Apply as Judge
            </Button>
            <CustomLink color="green" href={router.asPath + "/review-vulnerabilities"} type="button">
              Review Vulnerability
            </CustomLink>
          </div>
          <FilledText label="Overview" text={contest.overview} />
          <FilledText label="Scope" text={contest.scope} />
          <FilledText label="Out of Scope" text={contest.outOfScope} />
          <FilledText label="Links" text={contest.links} />
        </DefaultBackground>
      </main>
    </Page>
  );
};

export const getStaticProps: GetServerSideProps = async (req) => {
  const contest = await getContestByAddress(req.query.address as string);

  return { props: { contest } }
}

export default Contest;
