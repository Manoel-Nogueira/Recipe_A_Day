"use client";
import { Background } from "@/components/background"
import { Text } from "@/components/text"
import { Button } from "@/components/button";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import { Header } from "@/components/header";

// I REMOVED THE TRANSLATION FEATURE BECAUSE THE TRANSLATION WAS NOT PERFECT WITH THE API I USED.
// IF I FIND AN API WITH A GOOD TRANSLATION RESULT I TRY TO IMPLEMENT.

/*
* colors
*
* #000000
* #FFFFFF
* #F0F5F9
* #FBE6D4
* #EFE0D0
* #FDF6ED
* #FFF8F0
* #FBF7F1
* #C0392B
* #A93226
* #922B21
* #E6B0AA
* #D5D8DC
* #AAB7BB
* #A0522D
* #FF7F50
* #2A6BBF
* 
* #53240C
* 
* #F23E2E
* 
* 
* #FFF3E0
* #D2691F
* #A0522D
* #3E2123
* 
* 
* #C1440E
* #826A5C
* #4C9A2A
* #2E1B0F
* 
* #3E2723
* 
* #D2691E
* 
* 
* #78281F
* #C0392B
* #27AE60
* #F1C40F
* 
*/


export default function Home () {

  //const language = navigator.language
  const language = "en-US"
  const [loading, setLoading] = useState<boolean>(false)

  return (

    <div className="h-screen w-full">

      <div>
        <Background/>
      </div>

      <main className="relative z-10 h-full flex flex-col items-center justify-between">

        <Header/>
        
        <div className="h-[14.62rem] w-[20.33rem] sm:h-[21.94rem] sm:w-[30.5rem] mask-contain mask-[url(/blob.svg)] bg-[url(/jake.gif)] bg-contain bg-no-repeat object-center"></div>

        {/* <img src="" alt="gif" className="opacity-90 mask-x-from-90% mask-x-to-95% mask-y-from-90% mask-y-to-95%"/> */}

        <div>

          <Link href={"/recipe"} className="flex">
            <Button onClick={() => setLoading(true)} className={twMerge("px-2 rounded-lg bg-[#C0392B] hover:bg-[#A93226] active:bg-[#922B21]",  loading ? "cursor-progress" : "cursor-pointer")}><h1 className="flex items-center gap-2 text-[2rem] font-patrick text-[#FDF6ED] font-black uppercase leading-none">Recipe of the day {loading ? <AiOutlineLoading className="animate-spin"/> : ""}</h1></Button>
            {/* <Button onClick={() => setLoading(true)} className={twMerge("px-2 rounded-lg bg-[#C0392B] hover:bg-[#A93226] active:bg-[#922B21]",  loading ? "cursor-progress" : "cursor-pointer")}><h1 className="flex items-center gap-2 text-[2rem] font-patrick text-[#FDF6ED] font-black uppercase leading-none">{language === "pt-BR" ? "Receita do dia" : "Recipe of the day"} {loading ? <AiOutlineLoading className="animate-spin"/> : ""}</h1></Button> */}
          </Link>

        </div>

        <div className="flex flex-col items-center">

          <div>
            <Text className="text-[1rem] font-patrick font-black text-[#C0392B]">created by Manoel Nogueira</Text>
          </div>

          {/* <div>
            <img src="http://github.com/Manoel-Nogueira.png" alt="avatar" className="h-[3rem] w-[3rem] rounded-2xl"/>
          </div> */}

          <div>

            <Text className="text-[1rem] font-patrick text-[#C0392B] font-black">

              <div className="flex items-center">

                project repository 

                <Link href={"https://github.com/Manoel-Nogueira/Recipe_A_Day"} target="_blank">
                  <h1 className="text-[1.1rem] ml-1 font-patrick text-[#2A6BBF] font-black cursor-pointer hover:underline transition duration-150 ease-in-out">here</h1>
                </Link>

              </div>

            </Text>

          </div>
                    
        </div>

      </main>

    </div>

)

}
