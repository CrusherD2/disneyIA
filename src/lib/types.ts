import type { Database } from "./database.types";

export type Article = Database['public']['Tables']['articles']['Row'] | null;
export type ArticleInsert = Database['public']['Tables']['articles']['Insert'];
export type Comment = Database['public']['Tables']['comments']['Row'] | null;