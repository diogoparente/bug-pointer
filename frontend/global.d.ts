type DefaultProps<P = unknown> = P & { children?: ReactNode | undefined; className?: string | undefined };

type PropsWithClassName<P = unknown> = P & { className?: string | undefined };

type Contest = {
  contestAddress: string;
  sponsor: string;
  overview: string;
  scope: string;
  outOfScope: string;
  links: string;
  name: string;
  startAt: Date;
  closeAt: Date;
  prize: string;
};

type FilteredVulnerability = {
  id: number;
  name: string;
  proofOfConcept: string;
  severity: SeverityDegrees;
  contestAddress: string;
};

type FilteredVulnerabilityWithSubmitted = FilteredVulnerability & {
  associatedVulnerabilities: SubmittedVulnerability[];
};

type SeverityDegrees = "Critical" | "High" | "Medium" | "Low";

type VulnerabilityStatus = "Reviewed" | "Discarded" | "Pending";

type ExtendedSubmittedVulnerability = SubmittedVulnerability & {
  status: VulnerabilityStatus;
};

type SubmittedVulnerability = {
  id: number;
  contestAddress: string;
  name: string;
  proofOfConcept: string;
  ownerAddress: string;
  filteredVulnerabilityId: number | null;
};

type WithoutId<T extends { id: string | number }> = Omit<T, "id">;
