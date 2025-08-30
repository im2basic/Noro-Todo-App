interface ActionButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function ActionButton({ href, children, className = "" }: ActionButtonProps) {
  return (
    <div className="flex justify-center absolute bottom-0 left-0 right-0 transform translate-y-1/2">
      <a
        href={href}
        className={`bg-blue-600 hover:bg-blue-700 px-88 py-3 rounded-lg font-semibold transition ${className}`}
      >
        {children}
      </a>
    </div>
  );
}