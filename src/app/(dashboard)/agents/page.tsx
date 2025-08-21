import { AgentsErrorView, AgentsLoadingView, AgentView } from "@/modules/agents/ui/views/agent-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
function page() {
    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions())
    return (

        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<AgentsLoadingView />} >
                <ErrorBoundary fallback={<AgentsErrorView />}>

                    <AgentView />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    )
}

export default page