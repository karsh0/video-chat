import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Link, useNavigate } from "react-router-dom"
import { useRef } from "react"
import axios from "axios"
import { BACKEND_URL } from "@/lib/config"
function Signup() {

  const nameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  async function handler(){
    const username = nameRef.current?.value;
    const password = passwordRef.current?.value;
    
    await axios.post(`${BACKEND_URL}/signup`,{
      username,
      password
    })
    navigate('/signin')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-svh bg-black">
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Video Chat</CardTitle>
        <CardDescription>Watch youtube videos together and have fun.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Username</Label>
              <Input id="name" placeholder="Enter your username" ref={nameRef}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" placeholder="Enter password" ref={passwordRef}/>
            </div>
            
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button className="w-full" onClick={handler}>Signup</Button>
        <Label>Already an user? <span className="text-blue-600"><Link to={'/signin'}>signin</Link></span></Label>
         
      </CardFooter>
    </Card>
    </div>
  )
}


export default Signup

