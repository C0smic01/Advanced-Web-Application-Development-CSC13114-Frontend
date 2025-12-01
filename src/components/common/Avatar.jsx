import React from 'react';

export const Avatar = ({ name, size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl',
  };
  
  const colors = [
    'bg-gradient-to-br from-pink-500 to-rose-500',
    'bg-gradient-to-br from-purple-500 to-indigo-500',
    'bg-gradient-to-br from-blue-500 to-cyan-500',
    'bg-gradient-to-br from-green-500 to-emerald-500',
    'bg-gradient-to-br from-orange-500 to-amber-500',
    'bg-gradient-to-br from-red-500 to-pink-500',
  ];
  
  // Generate consistent color based on name
  const colorIndex = name ? name.charCodeAt(0) % colors.length : 0;
  const color = colors[colorIndex];
  
  return (
    <div 
      className={`
        ${sizes[size]} ${color}
        rounded-full flex items-center justify-center
        text-white font-semibold shadow-lg
        ${className}
      `}
    >
      {name}
    </div>
  );
};
