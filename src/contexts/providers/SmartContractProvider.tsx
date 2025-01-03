// import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
// import SmartContractContext from '../components/SmartContractContext';
// import {
//     MintCertificateArgs,
//     Wait,
// } from '@/types/contexts/SmartContractContextType';
// import { abi } from '@/contracts/abi';

// type Props = {
//     children: React.ReactNode;
// };

// const contractAddress = '0x079EEb91118AffeAC3B7FA9A20cC68f2ea40Ec58';

// export const SmartContractProvider = ({ children }: Props) => {
//     const { data: hash, error, isPending, writeContract } = useWriteContract();

//     const mintCertificate = async ({
//         courseId,
//         courseName,
//         metadata,
//         student,
//     }: MintCertificateArgs) => {
//         try {
//             writeContract({
//                 address: contractAddress,
//                 abi,
//                 functionName: 'mintCertificate',
//                 args: [student, courseId, courseName, metadata],
//             });

//             const result: Wait = wait();
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     const wait = (): Wait => {
//         const { isLoading: isConfirming, isSuccess: isConfirmed } =
//             useWaitForTransactionReceipt({
//                 hash,
//             });

//         return { isConfirming, isConfirmed };
//     };

//     return (
//         <SmartContractContext.Provider
//             value={{ Mint: { mintCertificate, isMintPending: isPending, hash, isConfirming, isSuccess: } }}
//         >
//             {children}
//         </SmartContractContext.Provider>
//     );
// };
