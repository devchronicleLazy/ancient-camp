import { useToast } from '@/hooks/use-toast';
import { useMintCertificate } from '@/hooks/use-mint-certificate';
import { Button } from '@headlessui/react';
import { Loader2 } from 'lucide-react';

interface MintCertificateButtonProps {
  student: any;
  courseId: number;
  courseName: string;
}

export function MintCertificateButton({
  student,
  courseId,
  courseName,
}: MintCertificateButtonProps) {
  const { mintCertificate, isPending, hash, isConfirming, isConfirmed, error } =
    useMintCertificate();
  const toast = useToast();

  const handleMint = async () => {
    const metadata = JSON.stringify({
      course: courseName,
      student: student?.name, // Assuming `student` object has a `name` field
      completedAt: new Date().toISOString(),
    });

    try {
      await mintCertificate({
        courseId,
        courseName,
        metadata,
      });

      // Show success toast if minting is successful
      toast.toast({
        title: 'Certificate Minted',
        description: `Your certificate for the course "${courseName}" has been successfully minted!`,
        duration: 4000,
      });

      // Log the transaction hash for reference (optional)
      console.log('Minted Token ID:', hash); // `hash` will contain the transaction hash
    } catch (err) {
      // Show error toast if minting fails
      toast.toast({
        title: 'Minting Failed',
        description: `An error occurred while minting your certificate for "${courseName}". Please try again later.`,
        duration: 4000,
      });

      console.error('Minting failed:', err);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      {isConfirming ? (
        <div className="text-gray-500">Confirming transaction...</div>
      ) : isConfirmed ? (
        <div className="text-green-500">Certificate minted successfully!</div>
      ) : error ? (
        <div className="text-red-500">Minting failed: {error.message}</div>
      ) : null}

      <Button
        onClick={handleMint}
        disabled={isPending || isConfirming}
        className={`flex items-center justify-center px-4 py-2 text-white font-semibold rounded-lg transition-colors 
          ${
            isPending || isConfirming
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }
        `}
      >
        {isPending || isConfirming ? (
          <>
            <Loader2 className="animate-spin w-4 h-4 mr-2" />{' '}
            {/* Spinner icon */}
            {isConfirming ? 'Confirming...' : 'Minting...'}
          </>
        ) : (
          'Mint Certificate'
        )}
      </Button>
    </div>
  );
}
