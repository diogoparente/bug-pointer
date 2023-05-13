type DefaultProps<P = unknown> = P & { children?: ReactNode | undefined; className?: string | undefined };

type PropsWithClassName<P = unknown> = P & { className?: string | undefined };

type SubmittedVulnerability = {
  id: string;
  name: string;
  proofOfConcept: string;
  ownerAddress: string;
};

type FilteredVulnerability = {
  id: string;
  name: string;
  proofOfConcept: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  associatedVulnerabilities: SubmittedVulnerability[];
};

type Contest = {
  contestAddress: string;
  overview: string;
  scope: string;
  outOfScope: string;
  links: string;
  name: string;
  startAt: string;
  closeAt: string;
  prize: string;
  submittedVulnerabilities: SubmittedVulnerability[];
  filteredVulnerabilities: FilteredVulnerability[];
};
