import {useState } from "react";

import { SignInProps } from "../interface"
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";


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
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
 
  const validationErrors = validateError(values);
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length === 0) {
    try {
        console.log("Submitting Sign In Form", values);
      const res = await signIn.email({ 
        email: values.email, 
        password: values.password 
      });
     
      console.log(res);
      
      
      resetForm();
    } catch (err) {
      alert("Login failed");
      console.error(err);
    }
  } else {
    alert("Invalid Submission, Try Again");
  }
};



return{
    handleChange,errors,values,resetForm,handleSubmit
}

    }
   

export default useSignIn