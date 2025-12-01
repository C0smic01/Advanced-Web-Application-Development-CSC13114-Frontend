import React from 'react';

export const Input = ({ 
  label, 
  error, 
  icon: Icon,
  className = '', 
  containerClassName = '',
  ...props 
}) => {
  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
        
        <input
          className={`
            w-full rounded-xl border border-slate-300 bg-white px-4 py-3
            ${Icon ? 'pl-11' : ''}
            text-slate-900 placeholder:text-slate-400
            transition-all duration-200
            focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10
            hover:border-slate-400
            disabled:bg-slate-50 disabled:cursor-not-allowed
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600 animate-slide-up">
          {error}
        </p>
      )}
    </div>
  );
};
