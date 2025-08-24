import { useTRPC } from "@/trpc/client";
import { AgentGetOne } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import { agentInsertSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { toast } from "sonner";

interface AgentFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
    initialValues?: AgentGetOne
}

export const AgentForm = ({ onSuccess, onCancel, initialValues }: AgentFormProps) => {
    const trpc = useTRPC()
    const queryClient = useQueryClient()
    const createAgent = useMutation(trpc.agents.create.mutationOptions({
        onSuccess: () => {
            queryClient.invalidateQueries(trpc.agents.getMany.queryOptions())

            if (isEdit) {
                queryClient.invalidateQueries(trpc.agents.getOne.queryOptions({ id: initialValues.id }))
            }

            onSuccess?.()
        },
        onError: (err) => {
            toast.error(err.message)
        },
    }
    ))

    const form = useForm<z.infer<typeof agentInsertSchema>>({
        resolver: zodResolver(agentInsertSchema),
        defaultValues: {
            name: initialValues?.name ?? '',
            instructions: initialValues?.instructions ?? '',
        },

    })

    const isEdit = !!initialValues?.id
    const isPending = createAgent.isPending

    const onSubmit = (values: z.infer<typeof agentInsertSchema>) => {
        if (isEdit) {
            // todo: implement update logic
        }
        else {
            createAgent.mutate(values)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <GeneratedAvatar className="size-16 border" seed={form.watch('name')} varient="botttsNeutral" />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex- Amela" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="instructions"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Instructions</FormLabel>
                            <FormControl>
                                <Input placeholder="add instructions to your agent" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                    {onCancel &&
                        <Button
                            variant="ghost"
                            type="button"
                            className="mr-2"
                            onClick={() => onCancel()}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>}
                    <Button disabled={isPending} type="submit">
                        {isEdit ? 'Save Changes' : 'Create Agent'}
                    </Button>
                </div>
            </form>
        </Form>
    )



}
