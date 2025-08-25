import { db } from "@/db";
import { agent } from "@/db/schema";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agentInsertSchema } from "../schemas";
import z from "zod";
import { eq, getTableColumns, sql } from "drizzle-orm";


export const agentsRouter = createTRPCRouter({
    getOne: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
        const [existingAgent] = await db
            .select({
                ...getTableColumns(agent),
              //TODO: change this dummy thing
                meetingsCount: sql<number>`5`
            })
            .from(agent)
            .where(eq(agent.id, input.id));

        return existingAgent;
    }),
    getMany: protectedProcedure.query(async () => {
        const data = await db
            .select({
                ...getTableColumns(agent),
                //TODO: change this dummy thing
                meetingsCount: sql<number>`length(${agent.name})`
            }
            )
            .from(agent)
        return data
    }),

    create: protectedProcedure.input(agentInsertSchema).mutation(async ({ input, ctx }) => {
        const [createdAgent] = await db
            .insert(agent)
            .values({ ...input, userId: ctx.auth.user.id })
            .returning()

        return createdAgent

    })
})