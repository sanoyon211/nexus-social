export default function Avatar({
  src,
  name,
  size = 'md',
  online = false,
  className = '',
}) {
  const sizes = {
    xs: 'w-7 h-7 text-xs',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-20 h-20 text-2xl',
    '3xl': 'w-28 h-28 text-3xl',
  };

  const dotSizes = {
    xs: 'w-2 h-2 border',
    sm: 'w-2 h-2 border',
    md: 'w-2.5 h-2.5 border-2',
    lg: 'w-3 h-3 border-2',
    xl: 'w-3.5 h-3.5 border-2',
    '2xl': 'w-4 h-4 border-2',
    '3xl': 'w-4 h-4 border-2',
  };

  const initials = name
    ? name
        .split(' ')
        .map(n => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '?';

  return (
    <div className={`relative flex-shrink-0 ${className}`}>
      {src ? (
        <img
          src={src}
          alt={name || 'Avatar'}
          className={`${sizes[size]} rounded-full object-cover`}
          onError={e => {
            e.target.style.display = 'none';
            e.target.nextSibling?.classList.remove('hidden');
          }}
        />
      ) : (
        <div
          className={`${sizes[size]} rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center font-semibold text-white`}
        >
          {initials}
        </div>
      )}
      {online && (
        <span
          className={`absolute bottom-0 right-0 ${dotSizes[size]} rounded-full bg-emerald-500 border-[#0f0f26]`}
        />
      )}
    </div>
  );
}
