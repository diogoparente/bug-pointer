import { useAccount } from "wagmi";

const useAuthentication = (mandatoryConnection: boolean) => {
  const { address } = useAccount();

  const isAuthed = !(mandatoryConnection && !address);

  return { isAuthed };
};

export default useAuthentication;
