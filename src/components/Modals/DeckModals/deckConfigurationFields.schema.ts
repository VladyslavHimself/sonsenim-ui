
import {z} from "zod";

// TODO: REMINDER
//      Add description and image drop-place after realization in server-side

export const deckConfigurationFieldsSchema = z.object({
    deckName: z.string().min(4),
    flashcardNormal: z.any().default(true),
    flashcardReversed: z.any().default(false),
    flashcardTyping: z.any().default(false),
});