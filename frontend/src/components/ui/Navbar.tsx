import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "@/actions/auth.actions";

export default function Navbar(){

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedUser = await getUser();
                setUser(fetchedUser);
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return <nav className="fixed w-full z-50 backdrop-blur-lg border-b border-gray-200 text-black">
       <div className="flex h-[72px] w-full items-center justify-between lg:px-20 px-3 shadow-sm">
       <div className="text-xl font-semibold flex gap-1 items-center">
            <img className="max-w-10" src="/logo.webp" alt="" />
            TubeTalk
        </div>
        <div className="flex gap-4 items-center font-semibold">
            <span className="text-md">Contact Us</span>
            {user && user.username ? <div className="bg-green-600 w-9 h-9 px-2 py-2 text-center rounded-full text-sm text-white">{user.username[0].toUpperCase()}</div> : <div className="bg-blue-600 px-3 py-2 rounded-xl text-sm text-white"><Link to={'/signin'}>Signin</Link></div>
            }
            
        </div>
       </div>
    </nav>
}