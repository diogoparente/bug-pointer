type DefaultProps<P = unknown> = P & { children?: ReactNode | undefined; className?: string | undefined };

type PropsWithClassName<P = unknown> = P & { className?: string | undefined };

type SubmittedVulnerability = {
  id: number;
  name: string;
  proofOfConcept: string;
  ownerAddress: string;
  contestAddress: string;
};

type SeverityDegrees = "Critical" | "High" | "Medium" | "Low";

type FilteredVulnerability = {
  id: string;
  name: string;
  proofOfConcept: string;
  severity: SeverityDegrees;
  associatedVulnerabilities: SubmittedVulnerability[];
};

type VulnerabilityStatus = "Reviewed" | "Discarded" | "Pending";

type ExtendedSubmittedVulnerability = SubmittedVulnerability & {
  status: VulnerabilityStatus;
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
