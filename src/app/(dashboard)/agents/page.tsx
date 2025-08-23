import { AgentsHeader } from "@/modules/agents/ui/components/agents-header";
import { AgentsErrorView, AgentsLoadingView, AgentsView } from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
function page() {
    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions())
    return (

        <>
        <AgentsHeader/>
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<AgentsLoadingView />} >
                <ErrorBoundary fallback={<AgentsErrorView />}>
                    <AgentsView />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
        </>
    )
}

export default page