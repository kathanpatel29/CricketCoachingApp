export default function Input({
    label,
    type = 'text',
    value,
    onChange,
    error,
    required,
    placeholder,
    className = ''
  }) {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`
            w-full px-3 py-2 border rounded-md shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500
            ${error ? 'border-red-300' : 'border-gray-300'}
            ${className}
          `}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }