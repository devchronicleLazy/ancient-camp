import { Button } from '@/components/ui/button';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { IconChevronDown } from '@tabler/icons-react';

export default function ConnectWalletBtn() {
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

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {/* Nếu ví chưa được kết nối */}
            {!connected && (
              <Button
                onClick={openConnectModal}
                variant="default"
                className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Connect Wallet
              </Button>
            )}

            {/* Nếu chuỗi mạng không được hỗ trợ */}
            {connected && chain.unsupported && (
              <Button
                onClick={openChainModal}
                variant="destructive"
                className="rounded-none bg-red-500 text-white hover:bg-red-600"
              >
                Wrong Network
              </Button>
            )}

            {/* Nếu đã kết nối ví thành công */}
            {connected && !chain.unsupported && (
              <div className="flex items-center gap-2">
                <Button
                  onClick={openChainModal}
                  variant="default"
                  className="rounded-none bg-foreground text-background hover:bg-foreground/90"
                >
                  {chain.name && chain.name === ''
                    ? ''
                    : chain.name}
                  <IconChevronDown className="size-4 ml-2" />
                </Button>
                <Button
                  onClick={openAccountModal}
                  variant="default"
                  className="rounded-none bg-foreground text-background hover:bg-foreground/90 flex items-center gap-2"
                >
                  {account.ensAvatar && (
                    <img
                      src={account.ensAvatar}
                      alt="ENS Avatar"
                      className="w-6 h-6 rounded-full"
                    />
                  )}
                  <span>{account.displayName}</span>
                </Button>
              </div>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
