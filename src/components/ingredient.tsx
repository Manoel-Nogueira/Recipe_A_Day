import { div } from "framer-motion/client";
import { ComponentProps, useEffect, useState } from "react";
import { Text } from "./text";
import { twMerge } from "tailwind-merge";

// I REMOVED THE TRANSLATION FEATURE BECAUSE THE TRANSLATION WAS NOT PERFECT WITH THE API I USED.
// IF I FIND AN API WITH A GOOD TRANSLATION RESULT I TRY TO IMPLEMENT.

interface IngredientProps extends ComponentProps<"div"> {

    measure: string,
    ingredient: string,

}

export function Ingredient (props: IngredientProps) {

    //const language = navigator.language
    const language = "en-US"
    const [ingredientImage, setIngredientImage]  =  useState<string>()
    const [measure, setMeasure] = useState<string>("")
    const [ingredient, setIngredient] = useState<string>("")
    const [checked, setChecked] = useState<boolean>(false)

    useEffect(() => {

        const getImage = async () => {

            try {

                const response = await fetch(`https://www.themealdb.com/images/ingredients/${props.ingredient}-medium.png`)

                setIngredientImage(response.url)

            } catch (error) {

                console.error("Erro fetching image -->>", error)

            }

        }

        getImage()

    }, [])

    // useEffect(() => {

    //     if (language === "pt-BR") {

    //         const getTranslation = async () => {

    //             try {

    //                 const responseMeasure = await fetch(`https://api.mymemory.translated.net/get?q=${props.measure}&langpair=en|pt-BR`)
    //                 const dataMeasure = await responseMeasure.json()

    //                 setMeasure(dataMeasure.responseData.translatedText)

    //                 const responseIngredient = await fetch(`https://api.mymemory.translated.net/get?q=${props.ingredient}&langpair=en|pt-BR`)
    //                 const dataIngredient = await responseIngredient.json()

    //                 setIngredient(dataIngredient.responseData.translatedText)
                    
    //             } catch (error) {

    //                 console.error("Error trying to translate -->>", error)
                    
    //             }

    //         }

    //         getTranslation()

    //     }

    // }, [language])

    return (

        <button onClick={() => setChecked(!checked)} className={twMerge("p-4 w-full bg-[#FBF7F1] rounded-xl flex items-center gap-x-2 text-[0.65rem] sm:text-[1.3rem] text-[#53240C] text-left font-dekko leading-none font-semibold lowercase cursor-pointer", checked ? "opacity-75 decoration-4 brightness-[0.97] grayscale-25" : "opacity-100")}>

            {checked ? 

                <div className="h-[2.5rem] w-[2.5rem] scale-75 sm:scale-100">
                    <img src="/checkbox/checked.svg" alt="checkbox"></img>
                </div> 
                : 
                <div className="h-[2.5rem] w-[2.5rem] scale-75 sm:scale-100">
                    <img src="/checkbox/unchecked.svg" alt="checkbox"></img>
                </div> 

            }

            <div className="relative flex items-center gap-3">

                <div className="h-[3rem] w-[3rem]">
                    <img src={ingredientImage} alt="ingredient" className="object-cover"/>
                </div>

                <div className="">
                    <Text>{`${props.measure} ${props.ingredient}`}</Text>
                    {/* {language === "pt-BR" ? <Text>{`${measure} ${ingredient}`}</Text> : <Text>{`${props.measure} ${props.ingredient}`}</Text>} */}
                </div>

                {checked &&

                    <div className="w-full absolute border-t-[0.33rem] border-[#53240C] bottom-[1.4rem] left-0 rounded-xl"></div>

                }

            </div>

        </button>

    )

}