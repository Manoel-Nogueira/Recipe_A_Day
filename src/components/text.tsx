import { ComponentProps, ReactElement } from "react";
import { twMerge } from "tailwind-merge";

interface TextProps extends ComponentProps<"div"> {

    children: string | number | ReactElement,

}

export function Text (props: TextProps) {

    return (

        <div {...props} className={twMerge("", props.className)}>
            {props.children}
        </div>

    )

}