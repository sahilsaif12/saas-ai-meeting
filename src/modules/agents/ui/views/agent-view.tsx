"use client"

import { ErrorState } from "@/components/error-state"
import { LoadingState } from "@/components/loading-state"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"

export const AgentView = () => {
    const trpc = useTRPC()
    const { data, } = useSuspenseQuery(trpc.agents.getMany.queryOptions())

    // if(isLoading){
    //     return(
    //         <LoadingState title="Loading Agents" description="This may take a few seconds" />
    //     )
    // }
    // if(isError){
    //     return(
    //         <ErrorState title="Error Loading Agents" description="Please try again later" />
    //     )
    // }

    return (
        <>
            {JSON.stringify(data, null, 2)}
        </>
    )
}

export const AgentsLoadingView = () => {
    return (
        <LoadingState title="Loading Agents" description="This may take a few seconds" />

    )
}
export const AgentsErrorView = () => {
    return (
        <ErrorState title="Error Loading Agents" description="Please try again later" />

    )
}