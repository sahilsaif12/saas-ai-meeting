"use client"
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";

export const Home = () => {
  const trpc=useTRPC()
  const {data}=useQuery(trpc.hello.queryOptions({ text:"sahil"}))
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch //refetch the session
  } = authClient.useSession()


  if (isPending) {
    return "loading . . . .. . "
  }
  if (session) {
    return (
      <div>
        Hello {data?.greeting}
        wellcome {session.user.name}, you are logged in
        <Button onClick={() =>authClient.signOut({
                fetchOptions: {
                    onSuccess:()=> redirect('/sign-in')
                }
            })
            
            } >log out</Button>
      </div>
    )
  }

}
