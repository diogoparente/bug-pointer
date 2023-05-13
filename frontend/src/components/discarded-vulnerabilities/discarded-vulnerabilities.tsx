import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Button from "../button";
import Tag from "../tag";
import { SubHeader } from "../text";
import { SetStateAction } from "react";

interface DiscardedVulnerabilitiesProps {
  submittedVulnerabilities: ExtendedSubmittedVulnerability[];
  setSubmittedVulnerabilities: React.Dispatch<SetStateAction<ExtendedSubmittedVulnerability[]>>;
}

const DiscardedVulnerabilitiesManager = ({
  submittedVulnerabilities,
  setSubmittedVulnerabilities,
}: DiscardedVulnerabilitiesProps) => {
  const [submittedVulnerabilitiesAux, setSubmittedVulnerabilitiesAux] = useState(
    submittedVulnerabilities.filter((vul) => vul.status !== "Reviewed")
  );

  const handleVulnerabilityStatusChange = (id: string) => {
    setSubmittedVulnerabilitiesAux((prev) =>
      prev.map((vul) => (vul.id === id ? { ...vul, status: vul.status === "Pending" ? "Discarded" : "Pending" } : vul))
    );
  };

  const handleSaveVulnerabilities = () => {
    setSubmittedVulnerabilities([
      ...submittedVulnerabilitiesAux,
      ...submittedVulnerabilities.filter((vul) => vul.status === "Reviewed"),
    ]);
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/70 data-[state=open]:animate-overlayShow" />
      <Dialog.Content className="fixed left-[50%] top-[50%] flex max-h-[85vh] translate-x-[-50%] translate-y-[-50%] flex-col items-center justify-between rounded-md bg-backgroundGrey px-12 py-8 focus:outline-none data-[state=open]:animate-contentShow">
        <SubHeader className="text-2xl">Discard Vulnerabilities</SubHeader>
        <div className="mb-8 mt-6 flex flex-col gap-6">
          {submittedVulnerabilitiesAux.map((vulnerability) => (
            <button key={vulnerability.id} onClick={() => handleVulnerabilityStatusChange(vulnerability.id)}>
              <Tag color={vulnerability.status === "Discarded" ? "red" : "grey"}>{vulnerability.name}</Tag>
            </button>
          ))}
        </div>
        <Dialog.Close asChild>
          <Button color="green" size="small" onClick={handleSaveVulnerabilities}>
            Save
          </Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
};

const DiscardedVulnerabilities = ({
  submittedVulnerabilities,
  setSubmittedVulnerabilities,
}: DiscardedVulnerabilitiesProps) => {
  return (
    <div>
      <div className="mb-2 flex w-full flex-row justify-between">
        <SubHeader>Discarded Vulnerabilities</SubHeader>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button size="small" color="green">
              Manage
            </Button>
          </Dialog.Trigger>
          <DiscardedVulnerabilitiesManager
            submittedVulnerabilities={submittedVulnerabilities}
            setSubmittedVulnerabilities={setSubmittedVulnerabilities}
          />
        </Dialog.Root>
      </div>
      <div className="flex flex-row flex-wrap items-center justify-start gap-6">
        {submittedVulnerabilities
          .filter((vul) => vul.status === "Discarded")
          .map((vulnerability) => (
            <Tag color="red" key={vulnerability.id}>
              {vulnerability.name}
            </Tag>
          ))}
      </div>
    </div>
  );
};

export { DiscardedVulnerabilities };
