"use client";
import { useState, type ComponentProps } from "react";
import { Text } from "@/components/text";
import Link from "next/link";
import { Ingredient } from "@/components/ingredient";
import { useEffect } from "react";
import { Background } from "@/components/background";
import { Header } from "@/components/header";

// I REMOVED THE TRANSLATION FEATURE BECAUSE THE TRANSLATION WAS NOT PERFECT WITH THE API I USED.
// IF I FIND AN API WITH A GOOD TRANSLATION RESULT I TRY TO IMPLEMENT.

type mealType = {
    
    "idMeal": string,
    "strMeal": string,
    "strMealAlternate": string | null,
    "strCategory": string,
    "strArea": string,
    "strInstructions": string,
    "strMealThumb": string,
    "strTags": string,
    "strYoutube": string,
    "strIngredient1": string,
    "strIngredient2": string,
    "strIngredient3": string,
    "strIngredient4": string,
    "strIngredient5": string,
    "strIngredient6": string,
    "strIngredient7": string,
    "strIngredient8": string,
    "strIngredient9": string,
    "strIngredient10": string,
    "strIngredient11": string,
    "strIngredient12": string,
    "strIngredient13": string,
    "strIngredient14": string,
    "strIngredient15": string,
    "strIngredient16": string,
    "strIngredient17": string,
    "strIngredient18": string,
    "strIngredient19": string,
    "strIngredient20": string,
    "strMeasure1": string,
    "strMeasure2": string,
    "strMeasure3": string,
    "strMeasure4": string,
    "strMeasure5": string,
    "strMeasure6": string,
    "strMeasure7": string,
    "strMeasure8": string,
    "strMeasure9": string,
    "strMeasure10": string,
    "strMeasure11": string,
    "strMeasure12": string,
    "strMeasure13": string,
    "strMeasure14": string,
    "strMeasure15": string,
    "strMeasure16": string,
    "strMeasure17": string,
    "strMeasure18": string,
    "strMeasure19": string,
    "strMeasure20": string,
    "strSource": string,
    "strImageSource": string | null,
    "strCreativeCommonsConfirmed": string | null,
    "dateModified": string | null,


}

function GetRecipeItems (interval: number, field: string, meal: mealType): string[] {

    const result: string[] = []

    for (let aux = 1; aux <= interval; aux ++ ) {

        const key = `${field}${aux}` as keyof typeof meal

        if (meal[key] != null && meal[key] != "") {

            result.push(meal[key]!)

        }

    }

    return result
    
}

export default function Recipe () {

    //const language = navigator.language
    const language = "en-US"
    const [meal, setMeal] = useState<mealType>()
    const [measuresIngredients, setMeasuresIngredients] = useState<string[][]>([])
    const [instructions, setInstructions] = useState<string[]>([])
    
    const [instruTranslated, setInstruTranslated] = useState<string[]>([])
    const [recipeName, setRecipeName] = useState<string>("")

    useEffect(() => {
        
        const alphabet: string[] = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

        const getRecipes = async () => {

            try {

                const fetchRecipes = alphabet.map(async (letter) => {

                    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
                    const data = await response.json()

                    return data.meals

                })

                const promisesRecipes = await Promise.all(fetchRecipes)
                const meals = promisesRecipes.flat().filter(Boolean)
                const date = new Date()
                const day = date.getFullYear() + '' + (date.getMonth() + 1) + '' + date.getDate()
                const index = parseInt(day) % meals.length

                setMeal(meals[index])
                
            } catch (error) {

                console.error("Erro fetching recipes -->>", error)
                
            }

        }

        getRecipes()

    }, [])

    useEffect(() => {

        if (meal) {

            const instructions = meal.strInstructions.split("\r\n").map((instruction) => instruction.replace(/^STEP \d+\s*/i, "").trim()).map((instruction) => instruction.replace(/^\d+\.\s*/, "").trim()).filter((instruction) => instruction.trim() !== "")
            const ingredients = GetRecipeItems(20, "strIngredient", meal)
            const measures = GetRecipeItems(20, "strMeasure", meal)
            const measuresIngredients: string[][] = []

            if (ingredients && measures) {

                for (let aux = 0; aux < ingredients.length; aux ++) {
            
                    measuresIngredients.push([measures[aux], ingredients[aux]])
            
                }

            }

            setMeasuresIngredients(measuresIngredients)
            setInstructions(instructions)

        }

    }, [meal])

    // useEffect(() => {

    //     if (language == "pt-BR" && meal) {

    //         const getTranslation = async () => {

    //             try {
    
    //                 const recipeNameResponse = await fetch(`https://api.mymemory.translated.net/get?q=${meal?.strMeal}&langpair=en|pt-BR`)
    //                 const recipeNameData = await recipeNameResponse.json()

    //                 setRecipeName(recipeNameData.responseData.translatedText)

                    
    //             } catch (error) {
    
    //                 console.error("Error trying to translate -->>", error)
                    
    //             }

    //         }

    //         getTranslation()

    //     }

    //     if (language == "pt-BR" && instructions) {

    //         const getTranslation = async () => {

    //             try {

    //                 const fetchRecipes = instructions.map(async (instruction) => {

    //                     const instructionsResponse = await fetch(`https://api.mymemory.translated.net/get?q=${instruction}&langpair=en|pt-BR`)
    //                     const instructionsData = await instructionsResponse.json()

    //                     return instructionsData.responseData.translatedText

    //                 })

    //                 const promisesInstructions = await Promise.all(fetchRecipes)
    //                 const instru = promisesInstructions.flat()

    //                 setInstruTranslated(instru)

    //             } catch (error) {

    //                 console.error("Error trying to translate -->>", error)
                    
    //             }

    //         }

    //         getTranslation()

    //     }

    // }, [language, instructions])

    if(meal && measuresIngredients)
    return (

        <div className="h-screen w-full">

            <div>
                <Background/>
            </div>

            <main className="w-full mt-[1rem] mb-[2rem] relative z-10 flex flex-col items-center justify-center">

                <Link href={"/"}>
                    <Header/>
                </Link>

                <div className="mx-[2rem] mt-[2rem] relative opacity-90">

                    <div className="z-0">

                        <img src={meal.strMealThumb} alt="Meal Thumb" className="object-cover rounded-xl h-full w-full"/>
                        
                        <div className="sm:absolute z-10 sm:inset-0 bg-gradient-to-t from-[#000000]/90 via-transparent to-transparent rounded-xl"></div>
                        
                    </div>


                    <div className="p-1 sm:absolute sm:inset-0 flex items-end justify-center z-20">
                        <Text className="text-[1.8rem] sm:text-[3rem] text-[#A0522D] sm:text-[#EFE0D0] font-russo font-black text-center">{meal.strMeal}</Text>
                        {/* <Text className="text-[1.8rem] sm:text-[3rem] text-[#A0522D] sm:text-[#EFE0D0] font-russo font-black text-center">{language === "pt-BR" ? recipeName : meal.strMeal}</Text> */}
                    </div>

                </div>

                {/* <div className="mt-[2rem] max-w-[43.75rem] w-full"> */}

                <div className="mx-[2rem] mt-[2rem] max-w-[70rem] ">

                    <div>
                        <Text className="text-[1rem] sm:text-[2rem] font-righteous font-black text-[#C0392B] text-center sm:text-left">Ingredients:</Text>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 place-content-around">

                        {measuresIngredients.map(measureIngredient => (

                            <div key={measureIngredient[0] + measureIngredient[1]} className="mt-4">
                                <Ingredient measure={measureIngredient[0]} ingredient={measureIngredient[1]}></Ingredient>
                            </div>

                        ))} 

                    </div>

                </div>

                <div className="m-[2rem] max-w-[70rem]">

                    <div>
                        <Text className="text-[1rem] sm:text-[2rem] font-righteous font-black text-[#C0392B]">Instructions:</Text>
                    </div>

                    {/* {(language === "pt-BR" ? instruTranslated : instructions).map((instruction, index) => ( */}
                    {instructions.map((instruction, index) => (

                        <div key={index} className="p-4 mt-4 bg-[#FBF7F1] flex flex-col sm:flex-row gap-x-4 rounded-xl items-center leading-none">

                            <div className="bg-[#FF7F50] rounded-full mb-[0.5rem] sm:mb-0">
                                <Text className="px-[0.3rem]  sm:px-[0.6rem] py-[0.15rem] sm:py-[0.3rem] font-patrick font-bold text-[0.6rem] sm:text-[1.2rem] text-[#FFFFFF]">{index + 1}</Text>
                            </div>

                            <div>
                                <pre className="font-dekko text-[0.625rem] sm:text-[1.25rem] font-semibold text-[#53240C] text-wrap leading-[0.75rem] sm:leading-[1.50rem]">{instruction}</pre>
                            </div>

                        </div>

                    ))}

                </div>

            </main>

        </div>

    )

}