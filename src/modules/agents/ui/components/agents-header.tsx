"use client"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import { NewAgentDialog } from "./new-agent-dialog"


export const AgentsHeader = () => {
    const [open, setopen] = useState(false)
    return (

        <>
            <NewAgentDialog open={open} onOpenChange={setopen} />
            <div className="p-4 md:px-8 flex items-center justify-between">
                <h3 className="text-xl font-medium ">My Agents</h3>
                <Button className="cursor-pointer" onClick={() => setopen(true)} >
                    <Plus />
                    New Agent
                </Button>

            </div>
        </>

    )
}