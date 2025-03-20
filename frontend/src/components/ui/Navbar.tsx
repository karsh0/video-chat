import { Link } from "react-router-dom";

export default function Navbar(){
    return <div className="flex justify-between px-24 py-5 w-full border-b-[1px] border-gray-300">
        <div className="text-xl font-semibold">
            TubeTalk
        </div>
        <div className="flex gap-4 items-center">
            <span className="text-sm text-gray-300">Contact Us</span>
            <div className="bg-blue-600 px-3 py-2 rounded-2xl text-sm"><Link to={'/signin'}>Signin</Link></div>
        </div>
    </div>
}