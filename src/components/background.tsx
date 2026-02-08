import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface BackgroundProps extends ComponentProps<"div"> {

    className?: string,

}

export function Background (props: BackgroundProps) {

    return (

        <div {...props} className={twMerge("fixed h-full w-full bg-[#EFE0D0] opacity-40 z-0 mask-[url(/food.svg)] animate-diagonal", props.className)}></div>

    )

}