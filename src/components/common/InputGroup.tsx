import React from "react";
import { Field, ErrorMessage } from "formik";

interface InputGroupProps {
  formik: any;
  name: string;
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
}

const InputGroup: React.FC<InputGroupProps> = ({
  formik,
  name,
  type,
  placeholder,
  icon,
  onChange,
  value,
  rightIcon,
  onRightIconClick,
}) => (
  <div
    className={`input-group ${
      formik.touched[name] && formik.errors[name] ? "error" : ""
    }`}
  >
    <div className="input-wrapper">
      <span className="input-icon">{icon}</span>
      <Field
        type={type}
        className={`auth-input ${rightIcon ? "with-right-icon" : ""} ${
          value || formik.values[name] ? "has-value" : ""
        }`}
        name={name}
        placeholder=" "
        value={value || formik.values[name]}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          formik.handleChange(e);
          if (onChange) onChange(e);
        }}
        id={name}
      />
      <label htmlFor={name} className="floating-label">
        {placeholder}
      </label>
      {rightIcon && (
        <button
          type="button"
          className="input-icon-right"
          aria-label="onRightIconClick"
          onClick={onRightIconClick}
        >
          {rightIcon}
        </button>
      )}
    </div>
    <ErrorMessage name={name} component="div" className="error-message" />
  </div>
);

export default InputGroup;
