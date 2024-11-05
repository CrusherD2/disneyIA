import type { Database } from "./database.types";

export type Article = Database['public']['Tables']['articles']['Row'] | null;
export type Comment = Database['public']['Tables']['comments']['Row'] | null;