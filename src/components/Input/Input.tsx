import { HtmlHTMLAttributes, forwardRef } from "react";
import "./Input.css";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

type InputProps = {
  label?: string | null;
  placeholder?: string;
  id?: string;
  type?: string;
  isError?: boolean;
  name?: string;
  checked?: boolean;
  errMsg?: string;
  value?: string;  
} & HtmlHTMLAttributes<HTMLInputElement>;

const Input = forwardRef(
  (
    { label = null, id = "", isError = false, errMsg, ...props }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    if (props.type === "radio") {
      return (
        <div className="radio-input-wrapper">
          <input type="radio" {...props} id={id} />
          <label htmlFor={id}>{label}</label>
        </div>
      );
    }

    return (
      <div className="input-wrapper">
        {label && (
          <label
            className={`label ${isError ? "label-error" : ""}`}
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`input ${isError ? "input-error" : ""}`}
          id={id}
          {...props}
        />
        {isError && (
          <Tippy placement="top-end" arrow={false} content={errMsg}>
            <p className="input-error-p">{errMsg}</p>
          </Tippy>
        )}
      </div>
    );
  }
);

export default Input;
