import { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";


interface ButtonType extends ComponentProps<"button"> {

    children: string | ReactNode,

}

export function Button (props: ButtonType) {

    return (

        <button {...props} className={twMerge("p-2", props.className)}>
            {props.children}
        </button>

    )


}