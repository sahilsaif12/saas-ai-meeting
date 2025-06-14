"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch //refetch the session
  } = authClient.useSession()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSignUp = () => {
    authClient.signUp.email({
      email,
      name,
      password
    }, {
      onSuccess: (ctx) => {
        window.alert("success")
        //redirect to the dashboard or sign in page
      },
      onError: (ctx) => {
        // display the error message
        window.alert(ctx.error.message);
      },
    })
  }

  const handleLogIn = () => {
    authClient.signIn.email({
      email,
      password
    }, {
      onSuccess: (ctx) => {
        window.alert("success")
        //redirect to the dashboard or sign in page
      },
      onError: (ctx) => {
        // display the error message
        window.alert(ctx.error.message);
      },
    })
  }

  if (isPending) {
    return "loading . . . .. . "
  }
  if (session) {
    return (
      <div>
        wellcome {session.user.name}, you are logged in
        <Button onClick={() => authClient.signOut()} >log out</Button>
      </div>
    )
  }
  return (
    <div>
      <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="Password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleSignUp} variant={"custom"}>Sign in</Button>

      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input
  placeholder="Password"
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>
      <Button onClick={handleLogIn} variant={"custom"}>Log in</Button>
    </div>
  );
}
