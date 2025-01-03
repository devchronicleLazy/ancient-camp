'use client';

import { SmartContractContextType } from '@/types/contexts/SmartContractContextType';
import { createContext } from 'react';

const SmartContractContext = createContext<SmartContractContextType>(null!);

export default SmartContractContext;
