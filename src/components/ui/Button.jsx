export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconRight,
  loading = false,
  disabled = false,
  onClick,
  className = "",
  type = "button",
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-150 cursor-pointer select-none disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-900/30 hover:shadow-violet-800/40 active:scale-95",
    secondary:
      "bg-[#1a1a40] hover:bg-[#222255] text-[#a78bfa] border border-[#2a2a50] hover:border-violet-600/50 active:scale-95",
    ghost:
      "bg-transparent hover:bg-[#1a1a40] text-[#8888bb] hover:text-white active:scale-95",
    outline:
      "bg-transparent border border-[#2a2a50] hover:border-violet-600 text-[#8888bb] hover:text-white active:scale-95",
    danger:
      "bg-red-600 hover:bg-red-500 text-white active:scale-95",
    success:
      "bg-emerald-600 hover:bg-emerald-500 text-white active:scale-95",
    white:
      "bg-white hover:bg-gray-100 text-gray-900 active:scale-95",
  };

  const sizes = {
    xs: "px-2.5 py-1 text-xs",
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
    xl: "px-6 py-3 text-base",
    icon: "p-2",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading ? (
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      ) : Icon ? (
        <Icon className="w-4 h-4" />
      ) : null}
      {children && <span>{children}</span>}
      {iconRight && !loading && <iconRight className="w-4 h-4" />}
    </button>
  );
}
