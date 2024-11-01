import type { RequestHandler } from "@sveltejs/kit";

export const DELETE: RequestHandler = async ({ locals, params }) => {
  const { id } = params;

  if (!id) {
    return new Response('Bad Request', { status: 400 });
  }

  if (!locals.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { data, error } = await locals.supabase.from('articles').delete().eq('id', id).select().single();

  if (error) {
    console.log(error);
    return new Response(error.message, { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}

export const PATCH: RequestHandler = async ({ locals, request, params }) => {
  const { id } = params;

  const body = await request.json();

  if (!id) {
    return new Response('Bad Request', { status: 400 });
  }

  if (!locals.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { data, error } = await locals.supabase.from('articles').update(body).eq('id', id).select().single();

  if (error) {
    console.log(error);
    return new Response(error.message, { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}