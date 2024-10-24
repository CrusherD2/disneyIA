import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, request }) => {
  const body = await request.json();

  const { data, error } = await locals.supabase.from('articles').insert(body);

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 201 });

  return new Response();
};