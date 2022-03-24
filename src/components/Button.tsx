import { useState } from "react";

type ButtonProps = {
    /** ? = propriedade (argumento) opcional. */
    text?: string;
    // text?: number;

    /** generic ou parametização da tipagem. Ou "string[]". */
    // text?: Array<string>;

    /** Propriedade em que todo componente tem acesso: "children". */
    // children?: string;
}

/** Named Export */
export function Button(props: ButtonProps) {

    // let counter = 0;
    /** Estado */
    const [counter, setCounter] = useState(0);

    function increment() {
        // counter += 1;
        setCounter(counter + 1);
        // console.log(counter);
    }

    return (
        // <button>{props.text || "Default"}</button>

        /** Propriedade em que todo componente tem acesso: "children". */
        // <button>{props.children || "Children"}</button>

        <button onClick={increment}>{counter}</button>
    );
}

// export default Button;