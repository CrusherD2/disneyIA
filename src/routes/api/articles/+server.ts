import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, request }) => {
  const body = await request.json();

  if (!locals.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  body.author_id = locals.user.id;

  const { data, error } = await locals.supabase.from('articles').insert(body).select().single();

  if (error) {
    console.log(error);
    return new Response(error.message, { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 201 });
};

