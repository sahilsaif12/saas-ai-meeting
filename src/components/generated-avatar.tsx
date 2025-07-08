import { createAvatar } from "@dicebear/core";
import {initials, botttsNeutral} from "@dicebear/collection";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";
interface GeneratedAvatarProps {
    seed: string;
    className?: string;
    varient?: "botttsNeutral" | "initials" ;
}

export const GeneratedAvatar = ({seed,className,varient}:GeneratedAvatarProps)=> {
    let avatar
    if (varient === "botttsNeutral") {
        avatar= createAvatar(botttsNeutral, {
            seed
        })
        
    }else{
        avatar = createAvatar(initials, {
            seed,
            fontWeight:500,
            fontSize:42
        })
    }
    return (
        <Avatar className={cn(className)}>
            <AvatarImage src={avatar.toDataUri()} alt="avatar" />
            <AvatarFallback >
                {seed.charAt(0).toUpperCase() }
            </AvatarFallback>
        </Avatar>
    )
}