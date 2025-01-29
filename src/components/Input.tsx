/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface FormInputProps {
  label: string; // Etiqueta del input
  name: string; // Nombre del campo (clave para `react-hook-form`)
  type?: string; // Tipo de input (por defecto será "text")
  placeholder?: string; // Placeholder opcional
  register: UseFormRegisterReturn<any>; // Registro de React Hook Form
  error?: FieldError; // Manejo de errores
  className?: string; // Clases CSS opcionales
  maxLength?: number | undefined
  minLength?: number | undefined
  disabled?: boolean
  defaultValue?: string | number | readonly string[] | undefined
}


const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = 'text',
  placeholder = '',
  register,
  error,
  className = '',
  maxLength = 20,
  minLength = undefined,
  disabled=false,
  defaultValue
}) => {
  return (
    <div className={`mb-4 flex flex-col ${className}`}>
      <label htmlFor={name} className=" text-gray-700">
        {label}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register}
        className="mt-1 p-2 w-full border rounded-md  focus:outline-none"
        maxLength={maxLength}
        minLength={minLength}
        disabled={disabled}
        defaultValue={defaultValue}
      />
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  );
};

export default FormInput;
