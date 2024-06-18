import { Button } from '../ui/button';

const buttonVariants = {
  lambdaGlow:
    'flex items-center py-2 px-3 space-x-2  justify-center font-medium disabled:opacity-50 h-fit transition-shadow hover:shadow-[0_0_2px_#fb4500,inset_0_0_2px_#fb4500,0_0_2px_#fb4500,0_0_10px_#fb4500,0_0_10px_#fb4500] hover:bg-[#FB4500] rounded-full text-base bg-[#FB4500] text-[#212325]',
  defaultPrimary:
    'flex items-center justify-center space-x-2 py-2 px-3 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-0  disabled:pointer-events-none disabled:opacity-50 bg-primary text-[#212325] text-primary-foreground hover:bg-primary/90  rounded-full bg-clip-padding backdrop-filter text-base bg-white backdrop-blur-sm bg-opacity-70 border border-opacity-10 border-gray-100',
};

export default function CTAButton({
  disabled = false,
  children,
  variant = 'defaultPrimary',
  onClick = async () => {},
}: {
  disabled?: boolean;
  children: React.ReactNode;
  variant?: keyof typeof buttonVariants;
  onClick?: () => Promise<void>;
}) {
  return (
    <Button
      className={buttonVariants[variant]}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
