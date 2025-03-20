import { Link } from "react-router-dom";

export default function Navbar(){
    return <nav className="fixed w-full z-50 backdrop-blur-lg border-b border-gray-800 text-white">
       <div className="flex h-[72px] w-full items-center justify-between lg:px-20 px-3 shadow-sm">
       <div className="text-xl font-semibold">
            TubeTalk
        </div>
        <div className="flex gap-4 items-center">
            <span className="text-sm text-gray-300">Contact Us</span>
            <div className="bg-blue-600 px-3 py-2 rounded-2xl text-sm"><Link to={'/signin'}>Signin</Link></div>
        </div>
       </div>
    </nav>
}