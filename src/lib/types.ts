import type { Database } from "./database.types";

export type Article = Database['public']['Tables']['articles']['Row'] | null;