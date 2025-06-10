"use client"

import { useState } from "react";
import { SignUpProps } from "../interface";

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
    setValues(preValues=>({...preValues,[name]:value}));
    
    }
    
       //Function to Reset Form Values
       const resetForm=()=>{
        setValues(initalValue)
        setErrors({})
    }

    //Function to handle After Form is Submitted
    const handleSubmit=(e?:React.FormEvent<HTMLFormElement>)=>{
        e?.preventDefault()
        const validationErrors=validateError(values)
    setErrors(validationErrors)
    if(Object.keys(validationErrors).length===0) {
        alert("User Registered Sucessfuuly")
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
       
export default useSignUp