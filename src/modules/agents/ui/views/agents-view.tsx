"use client"

import { ErrorState } from "@/components/error-state"
import { LoadingState } from "@/components/loading-state"
import ResponsiveDialog from "@/components/responsive-dialog"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { columns } from "../components/agentsTable/columns"
import { DataTable } from "../components/agentsTable/agents-table"
import { EmptyState } from "@/components/empty-state"


export const AgentsView = () => {
    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions())

    return (
        <>
        <div className="flex flex-1 flex-col pb-4 px-4 gap-y-4 ">

              <DataTable columns={columns} data={data} onRowClick={(row)=>console.log(row)} />
                {data.length === 0 && (
                    <EmptyState 
                    title="Create your first agent"
                    description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call."
                    />
                )}
        </div>

            {/* {JSON.stringify(data, null, 2)} */}
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