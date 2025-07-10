import { GeneratedAvatar } from "@/components/generated-avatar"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { authClient } from "@/lib/auth-client"
import { ChevronDownIcon, CreditCard, LogOut } from "lucide-react"
import { redirect } from "next/navigation"


export const DashboardUserButton = () => {
    const { data, isPending } = authClient.useSession()

    const onLogout = () => {
        authClient.signOut({
            fetchOptions: {
                onSuccess: () => redirect('/sign-in')
            }
        })
    }

    if (isPending || !data?.user) return null
    
    return (

        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center justify-between rounded-lg border border-border/10 p-3 gap-3 w-full bg-white/5 hover:bg-white/10 ">
                {data.user.image ? (
                    <Avatar className="size-12" >
                        <AvatarImage src={data.user.image}  alt={data.user.name || "User Avatar"} />
                    </Avatar>
                ) : <GeneratedAvatar seed={data.user.name} varient="initials" className="size-9 mr-3" />}

                <div className="flex flex-col flex-1 text-left gap-0.5 min-w-0 overflow-hidden">
                    <p className="text-sm truncate w-full">
                        {data.user.name}
                    </p>
                    <p className="text-sm truncate text-gray-300  w-full">
                        {data.user.email}
                    </p>
                </div>
                <ChevronDownIcon className="size-4 shrink-0" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" side="right" className="w-64">
                <DropdownMenuLabel>
                    <div className="flex flex-col gap-1">
                        <span className="font-medium truncate">{data.user.name} </span>
                        <span className="font-normal text-sm text-muted-foreground truncate">{data.user.email} </span>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center justify-between cursor-pointer">
                    Billing
                    <CreditCard className="size-4" />
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onLogout} className="flex items-center justify-between cursor-pointer">
                    Logout
                    <LogOut className="size-4" />
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}