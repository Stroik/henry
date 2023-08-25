interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export const PageHeader = ({ title, subtitle }: PageHeaderProps) => (
  <div className="page-header">
    <h1>{title}</h1>
    {subtitle && <p className="text-xl">{subtitle}</p>}
  </div>
);
