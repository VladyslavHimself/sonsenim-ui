import {z} from "zod";


export const newCardConfigurationSchema = z.object({
    primaryWord: z.string(),
    definition: z.string(),
    description: z.string().optional()
});