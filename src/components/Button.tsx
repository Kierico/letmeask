import { ButtonHTMLAttributes } from "react";

import "../styles/button.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean
};

/**                     ...props, Rest Operation */
export function Button({ isOutlined = false, ...props }: ButtonProps) {
    return (
        <button
            className={`button ${isOutlined ? "outlined" : ""}`}
            {...props} /> /** spread (...) distribui todas as propriedades para o botão. */
    );
}