import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Bell } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import Button from "../ui/Button";
const Header=()=>{
    return(
        <nav className="hidden md:flex bg-white   flex-wrap items-center justify-between gap-4 px-4 md:px-8 py-3">
<Image width={58} height={70} src="/SkillBridgeLogo.png" alt="SkillBridgeLogo"/>
<div className="flex-grow max-w-[500px] ">
<Input type="text" placeholder="Find Your Next Course"/>
</div>

<div className="w-auto flex flex-row gap-6 py-3">
    <ShoppingCart />
    <Bell/>
    <Button buttonBackgroundColor="SkyBlue" buttonDimension="small" buttonLabel="Login" buttonTextColor="white"/>
    <Button buttonBackgroundColor="LavenderBlue" buttonDimension="small" buttonLabel="Sign Up" buttonTextColor="white"/>
</div>
        </nav>
    )
}
export default Header