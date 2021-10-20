import {
  forwardRef,
  InputHTMLAttributes,
  Ref,
  useEffect,
  useState
} from "react";

interface InputProps {
  error?: string;
}

function Input(
  {
    error: propsErrorName,
    ...restProps
  }: InputHTMLAttributes<HTMLInputElement> & InputProps,
  ref: Ref<HTMLInputElement>
) {
  const [error, setError] = useState(null);

  useEffect(() => {
    const eventHandler = (e: any) => {
      const resErr = e.detail?.find(
        (err: any) => String(err.path) === String(propsErrorName)
      );
      setError(resErr?.message || null);
    };

    window.addEventListener("errors", eventHandler);
    return () => window.removeEventListener("errors", eventHandler);
  }, []);

  return (
    <div>
      <input {...restProps} ref={ref} />
      {error && <p className="input__error">{error}</p>}
    </div>
  );
}

export default forwardRef(Input);
