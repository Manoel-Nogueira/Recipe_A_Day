"use client";
import { motion } from "framer-motion";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { Text } from "./text";

interface HeaderProps extends ComponentProps<"div"> {

    className?: string,

}

export function Header (props: HeaderProps) {

    return (

        <motion.div
            
            animate={{ translateY: [-100, 0] }}
            transition={{ duration: 0.5 }}
            className={twMerge("flex items-baseline justify-center pt-[2rem]", props.className)}
        >

            <div className="h-[4rem] w-[4rem] sm:h-[6rem] sm:w-[6rem] pt-[0.10rem]">
                <img src="/pan.png" alt="logo" />
            </div>

            <div className="ml-2">
                <Text className="text-[3rem] sm:text-[5rem] font-curely font-black text-[#C0392B] leading-none">Recipe a Day</Text>
            </div>

        </motion.div>

    )

}