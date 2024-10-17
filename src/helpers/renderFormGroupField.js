import React from "react";

const renderFormGroupField = (props) => {
  const {
    input,
    label,
    tips,
    required,
    type,
    placeholder,
    meta: { touched, error, warning },
    disabled,
  } = props;
  const Icon = props.icon;

  return (
    <div className={`form-group ${props.className}`}>
      {type === "checkbox" ? (
        <div className="form-check">
          <input
            {...input}
            type="checkbox"
            id={input.name}
            className={`form-check-input ${touched && error ? "is-invalid" : ""} ${touched && !error ? "" : ""}`}
          />
          <label
            className={`form-check-label ${required ? "required" : ""}`}
            htmlFor={input.name}
          >
            {label}
          </label>
        </div>
      ) : (
        <>
          {label && (
            <label
              className={`form-label ${required ? "required" : ""}`}
              htmlFor={input.name}
            >
              {label}
            </label>
          )}
          <div className="input-group">
            {Icon && (
              <span className="input-group-text">
                <Icon />
              </span>
            )}
            <input
              {...input}
              type={type}
              id={input.name}
              placeholder={placeholder}
              disabled={disabled}
              className={`form-control ${touched && error ? "is-invalid" : ""} ${touched && !error ? "is-valid" : ""}`}
            />
          </div>
        </>
      )}
      {touched &&
        ((error && <div className="invalid-feedback">{error}</div>) ||
          (warning && <span>{warning}</span>))}
      {tips && <div className="form-text">{tips}</div>}
    </div>
  );
};

export default renderFormGroupField;
