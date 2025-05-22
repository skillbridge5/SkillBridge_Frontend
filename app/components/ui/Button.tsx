import ButtonProps  from "@/app/interface";

const Button:React.FC<ButtonProps>=({buttonLabel,buttonBackgroundColor,buttonDimension,buttonTextColor})=>
{
    const backgroundColorClass=buttonBackgroundColor ? {
        LavenderBlue:"bg-[#B5C4E6]",
        SkyBlue:"bg-[#2196F3]",
        white:"bg-[#ffffff] shadow-md border border-[#2196F333]",

    } [buttonBackgroundColor] : "" 

    const buttonDimensionClass=buttonDimension ? {
        small:"py-2 px-4",
        medium:"py-2 px-8",
        large:"w-full py-2",
    }[buttonDimension] : ""
    
    const buttonTextClass=buttonTextColor ? {
        white:"text-white",
        black:"text-black"
    } [buttonTextColor]: ""
    return(
        <button className={`${buttonTextClass} ${backgroundColorClass}  ${buttonTextColor} ${buttonDimensionClass} rounded-lg cursor-pointer  transition duration-300}`}>
            {buttonLabel}
        </button>
        )
}




export default Button