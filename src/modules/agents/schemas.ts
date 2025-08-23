import z from "zod";

export const agentInsertSchema=z.object({
    name:z.string().min(1,{message:"Name is required"}),
    instructions:z.string().min(1,{message:"You have to give some instructions to the agent"}),
})