"use client"

import { useState } from "react";
import { SignUpProps } from "../interface";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const useSignUp=(
    initalValue:SignUpProps={
        fullName:"",
        email:"",
        password:"",
    confirmPassword:"",
    }
)=>{
const[values,setValues]=useState<SignUpProps>(initalValue)
const[errors,setErrors]=useState<Partial<SignUpProps>>({})

//Error Validations
const validateError=(values:SignUpProps)=>{
const errors:Partial<SignUpProps>={}

if(!values.fullName) errors.firstName="full Name  is Required"
if(!values.email) errors.email="Email is Required"
if(!values.password) errors.password="Password is Required"
if(values.password!==values.confirmPassword) errors.confirmPassword="Password Doesnt Match"

return errors
}

//Function to handle Input Value Changes
const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const{name,value}=e.target;
    setValues((preValues: SignUpProps) => ({ ...preValues, [name]: value }));
    
    }
    
       //Function to Reset Form Values
       const resetForm=()=>{
        setValues(initalValue)
        setErrors({})
    }

    //Function to handle After Form is Submitted
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const validationErrors = validateError(values);

  setErrors(validationErrors);

  if (Object.keys(validationErrors).length === 0) {
    try {
        console.log("Submitting Sign Up Form", values);
      const res = await signUp.email({
        email: values.email,
        password: values.password,
        // optionally, include name or metadata if your backend expects it
        name: values.fullName,
      });
      console.log(res);
     
     
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Sign-up failed");
    }
  } else {
    alert("Invalid submission");
  }
};

    
 
    
    return{
        handleChange,errors,values,resetForm,handleSubmit
    }
    
        }
       
export default useSignUp