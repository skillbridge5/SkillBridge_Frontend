

"use client"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Button from "../../components/ui/Button"
import Image from "next/image"
import { Eye, EyeOff } from "lucide-react";
import useSignIn from "@/app/hooks/useSignIn"
   import { useState } from "react"

const SignIn:React.FC=()=>{
 const[show,setShow]=useState(false);

    {/*Function to handle Toggle Password*/}
const handlePasswordToggle=()=>{
    setShow(!show)
}

    const router=useRouter()
const{handleChange,errors,values,handleSubmit}=useSignIn()
    return(

    /*Main Container*/
    <section className="min-h-screen   flex flex-col md:flex-row">

<div className="bg-[#0669D31A] w-full md:w-1/2 flex flex-col justify-center items-center relative overflow-hidden">
<div className="bg-[#0C89EB] absolute -top-20 -left-20 w-[330px] h-[330px] shadow-[#004BAB] rounded-full opacity-30 blur-2xl z-0"/>
<div className="bg-[#FDA84E] absolute -bottom-20 -left-10 w-[220px] h-[220px]  rounded-full opacity-30 blur-2xl z-0"/>
<Image src="/SkillBridgeLogo.png" alt="Skill Bridge Logo" width={200} height={260} className="mx-auto z-10"/>
<Image src="/Formimage.png" alt="Form Image" width={400} height={400} className="rounded-md" />
</div>

<div className="md:w-1/2 w-full flex flex-col justify-center p-4">
<h1 className="py-5 text-center mb-3 uppercase font-[700] md:text-5xl text-2xl text-[#2196F3]">✋Welcome back!</h1>

<form onSubmit={handleSubmit} className="space-y-3 w-full max-w-md mx-auto">


<div>
    <Label htmlFor="email" className="font-[500]  text-[#181818]  p-2 w-full mt-2">Email</Label>
<Input type="email" name="email" id="email"  onChange={handleChange}
value={values.email}   className={` ${errors.password ? 'border-red-500' : 'border border-blue-500'}`}
 placeholder="Enter your email"
/>
{errors.email &&(
   <p className="text-red-500 text-sm">{errors.email}</p>
)}
</div>

<div>
<div className="relative">
    <Input
      type={show ? 'text' : 'password'}
      name="password"
      id="password"
      value={values.password}
      onChange={handleChange}
      placeholder="***********"
      className={` ${errors.password ? 'border-red-500' : 'border border-blue-500'}`}
    />
    <span
      onClick={handlePasswordToggle}
      className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-black"
    >
      {show ? <EyeOff size={20} /> : <Eye size={20} />}
    </span>
    
  </div>

{errors.password &&(
   <p className="text-red-500 text-sm">{errors.password}</p>
)}
</div>
<div className="flex justify-between mt-2 ">

<div className="flex items-center gap-2">
<input type="checkbox" />
<p className="text-[#8C8C8C] font-[500]">Remember me</p>
</div>

</div>


<div className="flex flex-col justify-center items-center gap-3">
<Button buttonBackgroundColor="SkyBlue" buttonDimension="large" buttonLabel="Sign In" buttonTextColor="white" />
<Button buttonBackgroundColor="white" buttonDimension="large" buttonLabel="Sign in with Google" buttonTextColor="black"/>
</div>
<p className="text-center text-[#595959] font-[400] mt-4 cursor-pointer">Dont Have an account?  
    <span className="text-blue-600" onClick={()=>router.push("/sign-up")}> Sign up for Free !</span>
    </p>
</form>
</div>
</section>
    )
}
export default SignIn