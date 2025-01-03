'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion } from 'framer-motion';
import { ChevronDown, Network, User, Wallet } from 'lucide-react';

export default function CustomConnectButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        if (!ready) {
          return (
            <div
              aria-hidden="true"
              className="opacity-0 pointer-events-none select-none"
            />
          );
        }

        if (!connected) {
          return (
            <motion.button
              onClick={openConnectModal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-5 py-3 
                            bg-gradient-to-br from-indigo-600 to-purple-600 
                            text-white 
                            hover:from-indigo-700 hover:to-purple-700 
                            transition-all duration-300 
                            rounded-xl 
                            shadow-xl hover:shadow-2xl 
                            group"
            >
              <Wallet className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
              <span className="font-bold tracking-wider text-sm">
                Connect Wallet
              </span>
            </motion.button>
          );
        }

        if (chain.unsupported) {
          return (
            <motion.button
              onClick={openChainModal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-3 
                            bg-gradient-to-br from-red-500 to-red-600 
                            text-white 
                            hover:from-red-600 hover:to-red-700 
                            transition-all duration-300 
                            rounded-xl 
                            shadow-xl hover:shadow-2xl 
                            font-bold tracking-wider text-sm 
                            flex items-center gap-2"
            >
              <Network className="w-5 h-5" />
              Wrong Network
            </motion.button>
          );
        }

        return (
          <div className="flex items-center space-x-3">
            {/* Chain Button */}
            <motion.button
              onClick={openChainModal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2.5 
                            bg-white border border-gray-200 
                            text-gray-700 
                            hover:bg-gray-50 
                            transition-all duration-300 
                            rounded-xl 
                            shadow-md hover:shadow-lg 
                            flex items-center"
            >
              {chain.hasIcon && chain.iconUrl && (
                <img
                  src={chain.iconUrl}
                  alt={chain.name ?? 'Chain icon'}
                  className="w-5 h-5 mr-2 rounded-full"
                />
              )}
              <span className="font-semibold text-sm">
                {chain.name === '' ? '' : chain.name}
              </span>
              <ChevronDown className="w-4 h-4 ml-2 text-gray-400" />
            </motion.button>

            {/* Account Button */}
            <motion.button
              onClick={openAccountModal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2.5 
                            bg-gradient-to-br from-blue-50 to-white 
                            border border-gray-200 
                            text-gray-700 
                            hover:bg-gray-100 
                            transition-all duration-300 
                            rounded-xl 
                            shadow-md hover:shadow-lg 
                            flex items-center gap-2"
            >
              {account.ensAvatar ? (
                <img
                  src={account.ensAvatar}
                  alt="ENS Avatar"
                  className="w-6 h-6 rounded-full border-2 border-blue-200"
                />
              ) : (
                <User className="w-5 h-5 text-gray-500" />
              )}
              <span className="font-semibold text-sm max-w-[100px] truncate">
                {account.displayName}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </motion.button>
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
