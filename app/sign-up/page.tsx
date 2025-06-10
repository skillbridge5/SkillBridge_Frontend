
"use client"

import useSignUp from "@/app/hooks/useSignUp"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Button from "../components/ui/Button"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image"
import { useState } from "react"

const SignUp:React.FC=()=>{
    const[show,setShow]=useState(false);

{/*Function to handle Toggle Password*/}

const handlePasswordToggle=()=>{
    setShow(!show)
}
    const router=useRouter()
const{handleChange,errors,values,handleSubmit}=useSignUp()
    return(

    /*Main Container*/
    <section className="min-h-screen  flex flex-col md:flex-row overflow-hidden">

<div className="bg-[#0669D31A] w-full md:w-1/2 flex flex-col justify-center items-center relative overflow-hidden">
<div className="bg-[#0C89EB] absolute -top-20 -left-20 w-[330px] h-[330px] shadow-[#004BAB] rounded-full opacity-30 blur-2xl z-0"/>
<div className="bg-[#FDA84E] absolute -bottom-20 -left-10 w-[220px] h-[220px]  rounded-full opacity-30 blur-2xl z-0"/>
<Image src="/SkillBridgeLogo.png" alt="Skill Bridge Logo" width={200} height={260} className="mx-auto z-10"/>
<Image src="/Formimage.png" alt="Form Image" width={0} height={0} sizes="100vw" className="w-full max-w-sm h-auto rounded-md" />
</div>

<div className="md:w-1/2 w-full flex flex-col justify-center p-4">
<h1 className="py-5 text-center mb-3 uppercase font-[700] md:text-4xl text-2xl text-[#2196F3]">Create Your Account !</h1>

<form onSubmit={handleSubmit} className="space-y-3 w-full max-w-md mx-auto">

<div>
    <Label htmlFor="fullName" className="  text-[#181818]  p-2 w-full mt-2">Full Name</Label>
<Input type="text" name="fullName" id="fullName"  className={` ${errors.fullName ? 'border-red-500' : 'border border-blue-500'}`}
value={values.fullName}  onChange={handleChange} 
 placeholder="Enter your full Name "

/>
{errors.fullName &&(
    <p className="text-red-500 text-sm">{errors.fullName}</p>
)}

</div>



<div>
    <Label htmlFor="email" className="font-[500]  text-[#181818]  p-2 w-full mt-2">Email</Label>
<Input type="email" name="email" id="email"  onChange={handleChange}  className={` ${errors.email ? 'border-red-500' : 'border border-blue-500'}`}
value={values.email}
 placeholder="Enter your email"
/>
{errors.email &&(
   <p className="text-red-500 text-sm">{errors.email}</p>
)}
</div>

<div className="relative w-full">
    <Label htmlFor=" password" className="font-[500]  text-[#181818]  p-2 w-full mt-2"> Password</Label>
<Input type={show ? "text" : "password"} name="password" id="password"
value={values.password} onChange={handleChange}  className={` ${errors.password ? 'border-red-500' : 'border border-blue-500'}`}
 placeholder="***********"

/>
  <span onClick={handlePasswordToggle} className="right-4 absolute top-2/3 mt-1  -translate-y-1/2  cursor-pointer text-black">
{show ? <EyeOff size={20}/> : <Eye size={20}/>}
</span>
</div>
{errors.password &&(
   <p className="text-red-500 text-sm">{errors.password}</p>
)}



<div>
    <Label htmlFor="confirmPassword"   className="font-[500]  text-[#181818]  p-2 w-full mt-2">Confirm Password</Label>
<Input type="text" id="confirmPassword" name="confirmPassword"  className={` ${errors.confirmPassword ? 'border-red-500' : 'border border-blue-500'}`}
value={values.confirmPassword} onChange={handleChange}
 placeholder="***********"
/>

{errors.confirmPassword &&(
   <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
)}
</div>

<div className="flex flex-col justify-center items-center gap-3">
<Button buttonBackgroundColor="SkyBlue" buttonDimension="large" buttonLabel="Sign In" buttonTextColor="white" />
<Button buttonBackgroundColor="white" buttonDimension="large" buttonLabel="Sign in with Google" buttonTextColor="black"/>
</div>
<p className="text-center text-[#595959] font-[400] mt-4">Have an account? 
    <span className="text-blue-600 cursor-pointer" onClick={()=>router.push("/auth/sign-in")}> Sign in!</span></p>
</form>
</div>
</section>
    )
}
export default SignUp