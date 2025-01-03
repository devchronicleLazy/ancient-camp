import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";

import { MintCertificateArgs } from "@/types/contexts/SmartContractContextType";
import { contractABI } from "@/contracts/abi";

export function useMintCertificate() {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const mintCertificate = async ({
    courseId,
    courseName,
    metadata,
  }: MintCertificateArgs) => {
    try {
      writeContract({
        address: "0xb41dD39a91D438CdC95169Ee6eC20aE88b780e73",
        abi: contractABI,
        functionName: "mintCertificate",
        args: [courseId, courseName, metadata],
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // Call useWaitForTransactionReceipt at the top level of the hook
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return { mintCertificate, isPending, hash, isConfirming, isConfirmed, error };
}
