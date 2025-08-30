interface HeaderProps {
  title?: string;
  subtitle?: string;
  icon?: string;
}

export default function Header({ title = "Todo", subtitle = "App", icon = "🚀" }: HeaderProps) {
  return (
    <header className="flex flex-col items-center py-22">
      <div className="flex items-center gap-2">
        <span className="text-xl">{icon}</span>
        <h1 className="text-3xl font-extrabold">
          <span className="text-blue-400">{title}</span>
          <span className="text-purple-400">{subtitle}</span>
        </h1>
      </div>
    </header>
  );
}