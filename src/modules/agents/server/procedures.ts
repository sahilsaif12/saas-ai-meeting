import { db } from "@/db";
import { agent } from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";


export const agentRouter=createTRPCRouter({
    getMany:baseProcedure.query(async()=>{
        const data=await db.select().from(agent)

        throw new TRPCError({
            code:"NOT_FOUND",   })
        return data
    })
})