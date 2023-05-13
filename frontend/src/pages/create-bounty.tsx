import { Paragraph, SubHeader } from "@/components/text";
import { Input } from "@/components/input";
import { Page } from "@/components/page";
import { TextArea } from "@/components/text-area";
import Button from "@/components/button";

const CreateBounty = () => {
  return (
    <Page isMandatoryConnection>
      <main className="flex flex-1 flex-col items-center justify-center gap-8 py-24">
        <SubHeader>First Step</SubHeader>
        <Paragraph>
          Add the basic information about your Contest. During the first two days of the Contest the judge will be
          selected
        </Paragraph>
        <div className="flex flex-row items-center justify-between">
          <Input color="purple" type="text" label="Contest Name" />
          <div className="flex flex-row items-center justify-between gap-8">
            <Input color="purple" type="date" label="Start Date" />
            <Input color="purple" type="date" label="End Date" />
          </div>
        </div>
      </main>
    </Page>
  );
};

export default CreateBounty;
