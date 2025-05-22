import Header from "../components/layout/Header";
import Image from "next/image";
import Button from "../components/ui/Button";
import { Clock8 } from 'lucide-react';
import { Globe } from 'lucide-react';
import { Code } from 'lucide-react';
import { Input } from "@/components/ui/input";

import { Newspaper } from 'lucide-react';
import { ShieldCheck } from 'lucide-react';
import { Star } from 'lucide-react';
import { Download } from 'lucide-react';
import { SquarePlay } from 'lucide-react';
import { Smartphone } from 'lucide-react';
import { ClipboardList } from 'lucide-react';
const Course=()=>{

    const LearningOutcome=[
        "You will master the CSS programming language by building 30 unique projects over 100 days.",
        "Create a portfolio of 30 CSS projects to  apply for developer jobs.",
        "You will master the CSS programming language by building 30 unique projects over 100 days.",
        "Be able to build fully fledged websites and web apps with CSS.",
        "You will master the CSS programming language by building 30 unique projects over 100 days.",
        "You will be able to program in CSS professionally",
    ]
    
    const CourseIncludes=[
        {
 image:<Code/> , position:"left",
            paragraph:"23 coding exercises"
        } ,

        {
image:  <Newspaper />, position:"left",
            paragraph:"120 articles"
         } ,

    {
image:<ShieldCheck/>, position:"left",
paragraph:"Certificate of completion"
} ,

            {
  image:<Download/>, position:"left",
paragraph:"50downloadable resources",
} ,
         {
    image:<SquarePlay/>, position:"right",
     paragraph:"2 hours on-demand video",
     } ,

      {
         image:<ClipboardList/>, position:"right",
            paragraph:"Assignments",
     } ,
     {
        image:<Smartphone/>, position:"right",
           paragraph:"Access on mobile and TV",
    } ,
        
    ]

    const courseContent=[
        {
            topic:"Day 1 Beginner - Introduction to CSS" ,
            totalLength:"1 Lecture - 30min",
        } ,
        {
            topic:"Day 2 Beginner - Working with variables in CSS" ,
            totalLength:"3 Lecture - 1:30min",
        } ,
        {
            topic:"Day 3 Beginner - Control Flow and Logical Operators" ,
            totalLength:"2 Lecture - 1 hour",
        } ,
        {
            topic:"Day 4 Beginner - DIV" ,
            totalLength:"1 Lecture - 30 min",
        } ,
        {
            topic:"Day 4 Beginner - Alignment" ,
            totalLength:"1 Lecture - 30 min",
        } ,
        {
            topic:"Day 6 Beginner - Image and video" ,
            totalLength:"3 Lecture - 1:30 min",
        } ,
        {
            topic:"Day 7 Beginner - Function" ,
            totalLength:"3 Lecture - 1:30 min",
        } ,
        {
            topic:"Day 4 Beginner - Function" ,
            totalLength:"3 Lecture - 1:30 min",
        }
    ]
        
    
    return(
        <>
       <Header/>
        <section className="w-full relative min-h-screen overflow-hidden">
            <div className="absolute inset-0 z-0">
<Image src="/CourseHero.png"  alt="Course Image" fill style={{objectFit:"cover"}}/>
            </div>
            
            <div className="absolute z-10 inset-0  flex flex-col bg-[#2D2D2D]/80 text-white  p-8  ">
<p className="font-bold md:mb-10 mb-5 ">Web Development Programming Language CSS</p>
<h1 className="md:text-5xl text-2xl font-bold mb-2 leading-snug">30 Days of Code: The Complete<br/>
CSS Course</h1>
<p className="text-lg max-w-lg leading-snug mb-4">Master CSS by building30 projects in 30 days. Learn  JavaScript, Data Structure Algorithm, 
build websites and games.</p>
<div className="flex items-center flex-row gap-4"> 
<Button buttonBackgroundColor="white" buttonDimension="medium" buttonLabel="Best Seller" buttonTextColor="black"/>

<p className="font-semibold">3.1 </p>
<div className="flex flex-row gap-2">
<Star />
<Star />
<Star />
<Star />
</div>
   




</div>
<p className="text-xl mt-3">Created by: <span className="text-[#2196F3]  ">Feven Abebe</span></p>

            </div>

        </section>

        <div className="md:flex md:flex-row flex-col-reverse md:justify-center md:gap-6 gap-10 mx-auto  py-10 "> 

<div className="md:w-1/2 h-[400px] bg-white border border-[#D9D9D9] p-4 rounded-md mx-auto  ">

<h2 className="text-2xl font-semibold mb-2">What you'll learn</h2>
    {/*What you will learn Section  */}
   

<ul className=" space-y-2 list-none p-2"> 
{LearningOutcome.map((outcome,index)=>(
<li className="flex items-start gap-2 text-md" key={index}>
   ✔ {outcome}
</li>
))}
</ul>

{/*Course Contents*/}
<section className="md:py-24 py-44  ">

<h1 className="mb-4 text-3xl font-bold">This Course includes:</h1>
    <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-6">
            {
                CourseIncludes.filter(item=>item.position==="left").map((item,index)=>(
                    <div className="flex items-center gap-3" key={index}>
{item.image}
<p>{item.paragraph}</p>
                    </div> 

                ))
            }
        </div>
        <div className="space-y-6">
        {
                CourseIncludes.filter(item=>item.position==="right").map((item,index)=>(
                    <div className="flex items-center gap-3" key={index}>
{item.image}
<p>{item.paragraph}</p>
                    </div> 

                ))
            }
        </div>
    </div>

  

    </section>
 </div>
  




   
{/*Course Description Section*/}

<div className="md:w-1/2">


    <section className="border border-[#D9D9D9]  bg-white p-4 rounded-md">
<Image src="/courseInfo.png" width={400} height={210} alt="CourseInfo" className="w-full h-auto object-cover rounded-md"/>


<div className=" flex items-start justify-between text-black">
<p className="py-3">Course Info</p>
<h1 className="text-4xl font-bold py-3">$10.99</h1>
</div>
<div className="flex flex-col gap-4">
    <div className="flex flex-row gap-2">
    <Clock8 />
    <p>Last updated 3/2025</p>
    </div>
    <div className="flex flex-row gap-2">
    <Globe />
    <p>English</p>
    </div>

</div>

{/*Aditional Option */}

<div className="py-5 mx-auto flex flex-col gap-5">
<Button buttonBackgroundColor="white" buttonDimension="large" buttonLabel="Add to cart" buttonTextColor="black"/>
<Button buttonBackgroundColor="SkyBlue" buttonDimension="large" buttonLabel="Pay Now" buttonTextColor="white"/>
<p className="mt-3 text-md text-black">30-Day Money-Back Guarantee</p>
<div className="py-3 flex flex-row items-center justify-between">
<p className="text-black text-lg">Share</p>
<p className="text-black text-lg">Gift this Course</p>
<p className="text-black text-lg">Apply Coupon</p>
</div>
</div>

{/*Coupon Input*/}

<div className="p-4 rounded-md border-dotted border-4 border-[#2196F3]">
<h3 className="font-bold text-2xl mb-2">SKILLBRIDGE</h3>
<p className="text-[#4D4C4C]">COUPON</p>
</div>
<div className="py-4 flex items-center gap-3">
<Input type="text" placeholder="Enter Coupon"/>
<Button buttonBackgroundColor="SkyBlue" buttonDimension="small" buttonLabel="Apply" buttonTextColor="white"/>
</div>

{/*Divider Input*/}
<div className="flex items-center gap-2 my-3">
<div className="flex-grow border-t border border-[#4D4C4C]"></div>

<p>OR</p>
<div className="flex-grow border-t border border-[#4D4C4C]"></div>
</div>

{/*Try It Now Input*/}

<div className="mt-2">
<Button buttonBackgroundColor="SkyBlue" buttonDimension="large" buttonLabel="Try for free" buttonTextColor="white"/>
</div>

    </section>

 {/*Related Topics*/}
 <section className="py-6  ">
    <h1 className="text-black font-semibold text-xl md:text-3xl text-center  mb-3">Explore Related Topics</h1>
   
    

    <div className="mt-4 flex flex-col items-center gap-3">
        <div className="flex flex-row gap-4">
        <Button buttonBackgroundColor="white" buttonDimension="medium" buttonLabel="Javascript" buttonTextColor="black"/>
        <Button buttonBackgroundColor="white" buttonDimension="medium" buttonLabel="React" buttonTextColor="black"/>
        </div>
        <div className="mt-2">
<Button buttonBackgroundColor="white" buttonDimension="medium" buttonLabel="Development" buttonTextColor="black"/>
</div>
  </div>
     

       



    </section>
    </div>


    
</div>


   
    

       {/*Course Content */}
       <section className=" max-w-6xl mx-auto">
       <h1 className="text-black font-semibold md:text-3xl text-2xl mb-3">Course Content</h1>
       <p className="md:text-2xl text-md text-black mb-2">3O sections . 30 lectures . 12h 21m total length</p>
       <div className="flex flex-col ">
{
    courseContent.map((course,index)=>(
        <div className="border bg-white p-6 border-black" key={index}>
            <div className="flex flex-row  gap-3 justify-between">
<p className="md:text-xl text-md font-bold">🔽 {course.topic}</p>
<p>{course.totalLength}</p>
            </div>

        </div>
    ))
}
       </div>

       </section>
       

        </>

        
    )
}
export default Course