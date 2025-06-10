export interface SignInProps {
    email:string
    password:string
    rememberMe:boolean
}
export interface SignUpProps {
    email:string
    password:string
    confirmPassword:string
    fullName:string

  
}
export default interface ButtonProps {
    buttonLabel:string
    buttonBackgroundColor: "LavenderBlue" | "SkyBlue" | "white"
    buttonTextColor?:"black" | "white" | ""
    buttonDimension:"small" | "medium" | "large"
    action?:()=>void
}