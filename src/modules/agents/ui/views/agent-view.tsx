"use client"

import { ErrorState } from "@/components/error-state"
import { LoadingState } from "@/components/loading-state"
import ResponsiveDialog from "@/components/responsive-dialog"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"

export const AgentView = () => {
    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions())

    return (
        <>
            {JSON.stringify(data, null, 2)}
            {/* <ResponsiveDialog
            open
            onOpenChange={() => { }}
            title="Create New Agent"
            description="Create a new AI agent to assist you with tasks"
            childern={<div className=" w-full ">{JSON.stringify(data, null, 2)}</div>}
            /> */}
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