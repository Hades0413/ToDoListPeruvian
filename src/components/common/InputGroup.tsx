import React from "react";
import { Field, ErrorMessage } from "formik";

// Definir el tipo de las props para el InputGroup
interface InputGroupProps {
  formik: any;
  name: string;
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const InputGroup: React.FC<InputGroupProps> = ({
  formik,
  name,
  type,
  placeholder,
  icon,
  onChange,
  value,
}) => (
  <div
    className={`input-group ${
      formik.touched[name] && formik.errors[name] ? "error" : ""
    }`}
  >
    {icon}
    <Field
      type={type}
      className="auth-input"
      name={name}
      placeholder={placeholder}
      value={value || formik.values[name]}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        formik.handleChange(e);
        if (onChange) onChange(e);
      }}
    />
    <ErrorMessage name={name} component="div" className="error-message" />
  </div>
);

export default InputGroup;
