import { Paragraph, SubHeader } from "@/components/text";
import { Input } from "@/components/input";
import { Page } from "@/components/page";
import { TextArea } from "@/components/text-area";
import Button from "@/components/button";
import { SubmitHandler, useForm } from "react-hook-form";

const defaultValues: Contest = {
  contestAddress: "",
  sponsor: "",
  overview: "",
  scope: "",
  outOfScope: "",
  links: "",
  name: "",
  startAt: "",
  closeAt: "",
  prize: "",
};

const CreateContest = () => {
  const { register, handleSubmit } = useForm<Contest>({ defaultValues });

  const onSubmitHandler = async (values: Contest) => {
    await fetch("/api/contest", {method: "POST", body: JSON.stringify(values)});
  };

  return (
    <Page isMandatoryConnection>
      <main className="flex flex-1 flex-col items-center justify-center gap-8 py-24">
        <SubHeader>First Step</SubHeader>
        <Paragraph>
          Add the basic information about your Contest. During the first two days of the Contest the judge will be
          selected
        </Paragraph>
        <form className="flex w-3/5 flex-col gap-6" onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="flex flex-row items-center justify-between gap-20">
            <Input
              color="purple"
              type="text"
              label="Contest Name"
              className="flex-1"
              register={register}
              name="contestName"
            />

            <div className="flex flex-row items-center justify-between gap-8">
              <Input color="purple" type="date" label="Start Date" register={register} name="startDate" />
              <Input color="purple" type="date" label="End Date" register={register} name="endDate" />{" "}
            </div>
          </div>
          <TextArea
            color="purple"
            label="Overview"
            className="min-h-[14rem] flex-1"
            register={register}
            name="overview"
          />
          <TextArea color="purple" label="Scope" className="min-h-[14rem] flex-1" register={register} name="scope" />
          <TextArea
            color="purple"
            label="Out Of Scope"
            className="min-h-[14rem] flex-1"
            register={register}
            name="outOfScope"
          />
          <TextArea
            color="purple"
            label="Relevant Links"
            className="min-h-[14rem] flex-1"
            register={register}
            name="relevantLinks"
          />
          <Input
            color="purple"
            type="text"
            label="Bounty Value(USDC)"
            className="flex-1"
            register={register}
            name="bountyValue"
          />
          <div className="flex w-full flex-col items-center justify-between">
            <Paragraph className="mt-6 text-center text-base">
              In order to create a contest you have to lock the bounty value
            </Paragraph>
            <Button color="purple" type="submit" size="large" className="mx-auto mt-4 w-fit">
              Create Contest
            </Button>
          </div>
        </form>
      </main>
    </Page>
  );
};

export default CreateContest;
