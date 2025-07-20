import {useState } from "react";

// Define the interface directly in the file
interface SignInProps {
  email: string;
  password: string;
  rememberMe: boolean;
}

// Typescript enforced SignIn Values
const useSignIn=(
    initalValues:SignInProps={
        email:"",
        password:"",
        rememberMe:false
    })=>{
const[values,setValues]=useState<SignInProps>(initalValues);
const[errors,setErrors]=useState<Partial<SignInProps>>({})

//Error Validations
const validateError=(values:SignInProps)=>{
const errors:Partial<SignInProps>={}

if(!values.email) errors.email="Email is Required"
if(!values.password) errors.password="Password is Required"

return errors
}


//Function to handle Input Value Changes
const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
const{name,value}=e.target;
setValues((preValues: SignInProps) => ({ ...preValues, [name]: value }));

}


//Function to Reset Form Values
const resetForm=()=>{
    setValues(initalValues)
    setErrors({})
}

//Function to handle After Form is Submitted
const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const validationErrors=validateError(values);
    setErrors(validationErrors)
if(Object.keys(validationErrors).length===0) {
    alert("User Logged In Sucessfuuly")
    resetForm()
}
else{
    alert("Invalid Submisson, Try Again")
}

}


return{
    handleChange,errors,values,resetForm,handleSubmit
}

    }
   

export default useSignIn