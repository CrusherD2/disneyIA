import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, request }) => {
	const body = await request.json();

	if (!locals.user) {
		return new Response('Unauthorized', { status: 401 });
	}

	const name = body.name;

	const { data, error } = await locals.supabase.from('tags').insert({ name }).select().single();

	if (error) {
		console.error(error);
		return new Response(error.message, { status: 500 });
	}

	return new Response(JSON.stringify(data), { status: 201 });
};
