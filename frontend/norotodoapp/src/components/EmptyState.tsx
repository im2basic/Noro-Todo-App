interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <section className="flex flex-col items-center pt-20">
      {icon && (
        <div className="text-gray-600 mb-4">
          {icon}
        </div>
      )}
      <h2 className="text-lg text-gray-400 mb-2">{title}</h2>
      <p className="text-sm text-gray-500">{description}</p>
    </section>
  );
}