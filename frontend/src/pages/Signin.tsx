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
import { BACKEND_URL } from "@/lib/config"
import axios from "axios"

interface SignInResponse{
  message: string,
  token: string
}
function Signin() {

    const nameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();
  
    async function handler(){
      const username = nameRef.current?.value;
      const password = passwordRef.current?.value;
      
      const res = await axios.post<SignInResponse>(`${BACKEND_URL}/signin`,{
        username,
        password
      })
      const token = res.data.token;
      if(!token){
        alert('validation failed')
        return;
      }
      localStorage.setItem('token', res.data.token)
      console.log(res.data)
      
      navigate('/stream')
    }
    
    return (
    <div className="flex flex-col items-center justify-center min-h-svh bg-black">
    <Card className="w-96 flex flex-col items-center bg-black border border-gray-600 rounded-2xl text-white">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Welcome back</CardTitle>
        <CardDescription className="text-gray-500 text-sm">Please enter your details to signin</CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5 gap-2">
              <Label htmlFor="name">Username</Label>
              <Input id="name" placeholder="Enter your username" ref={nameRef}/>
            </div>
            <div className="flex flex-col space-y-1.5 gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" placeholder="Enter password" ref={passwordRef}/>
            </div>            
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 w-full">
        <Button className="w-full" onClick={handler}>Signin</Button>
        <Label>Not registered? <span className="text-blue-600"><Link to={'/signup'}>signup</Link></span></Label>
         
      </CardFooter>
    </Card>
    </div>
  )
}


export default Signin

