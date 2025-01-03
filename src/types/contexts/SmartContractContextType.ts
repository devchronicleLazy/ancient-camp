export interface Certificate {
  courseId: number;
  courseName: string;
  studentAddress: string;
  completionDate: number;
  metadata: string;
}

export interface MintCertificateArgs {
  courseId: number;
  courseName: string;
  metadata: string;
}

export type Mint = {
  mintCertificate: (args: MintCertificateArgs) => Promise<void>;
  isMintPending: boolean;
  hash: `0x${string}` | undefined;
  isConfirming: boolean;
  isSuccess: boolean;
};

export interface SmartContractContextType {
  Mint: Mint;
}

export type Wait = {
  isConfirming: boolean;
  isConfirmed: boolean;
};
