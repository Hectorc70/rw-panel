/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface SearchInputProps {
  label?: string | undefined; // Etiqueta del input
  error?: FieldError; // Manejo de errores
  name: string; // Nombre del campo (clave para `react-hook-form`)
  register: UseFormRegisterReturn<any>; // Registro de React Hook Form
  className?: string; // Clases CSS opcionales
  placeholder?: string; // Placeholder opcional
  maxLength?: number; // Maximo largo del texto
  onSearch?: (value: string) => void; // Función para manejar el evento de búsqueda
}

const SearchInput: React.FC<SearchInputProps> = ({
  name,
  register,
  label,
  error,
  className = '',
  placeholder = 'Buscar...',
  maxLength = 100,
  onSearch,
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className={`mb-4 flex flex-col ${className}`}>
      {label && <label htmlFor={name} className="text-gray-700">
        {label}
      </label>}
      <div className="flex items-center border rounded-md overflow-hidden">
        <input
          id={name}
          type="text"
          placeholder={placeholder}
          value={searchValue}
          {...register}
          onChange={handleChange}
          className="mt-1 p-2 w-full border-none focus:outline-none"
          maxLength={maxLength}
        />
        <button
          type="button"
          onClick={() => onSearch && onSearch(searchValue)}
          className="bg-primary rounded-md  text-white p-2 hover:bg-hoverPrimary focus:outline-none"
        >
          Buscar
        </button>
      </div>
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  );
};

export default SearchInput;
