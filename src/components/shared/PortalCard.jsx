export default function PortalCard({
  title,
  icon,
  action,
  children,
  className = "",
}) {
  return (
    <div className={`bar-card p-4 h-full ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          {title && (
            <h2 className="font-black bar-gold-text">
              {icon && <span className="mr-2">{icon}</span>}
              {title}
            </h2>
          )}

          {action}
        </div>
      )}

      {children}
    </div>
  );
}