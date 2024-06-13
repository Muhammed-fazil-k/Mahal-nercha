import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  const {disabled} = rest;
  return (
    <button
      {...rest}
      className={clsx(
        'flex h-10 items-center rounded-lg px-4 text-sm font-medium',
        disabled
          ? 'bg-gray-200 text-gray-500 cursor-not-allowed' // Apply styles for disabled state
          : 'bg-blue-500 text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600',
        className
      )}
      aria-disabled={disabled} // Set aria-disabled attribute for accessibility
    >
      {children}
    </button>
  );
}
