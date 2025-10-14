import { NextResponse } from 'next/server';

const MUAPI_BASE = 'https://api.muapi.ai';

async function forward(request, { params }) {
	const { path = [] } = params || {};
	const targetPath = '/' + path.join('/');
	const url = new URL(request.url);
	const targetUrl = MUAPI_BASE + targetPath + (url.search || '');

	const method = request.method;

	// Read body when present
	let body = null;
	if (method !== 'GET' && method !== 'HEAD') {
		try {
			body = await request.text();
		} catch {}
	}

	// Build headers: pass through JSON-related headers, set API key
	const outgoingHeaders = new Headers();
	for (const [key, value] of request.headers.entries()) {
		const lower = key.toLowerCase();
		if (['content-type', 'accept'].includes(lower)) {
			outgoingHeaders.set(key, value);
		}
	}

	const apiKey = process.env.MUAPI_API_KEY || process.env.NEXT_PRIVATE_MUAPI_API_KEY || process.env.NEXT_MUAPI_API_KEY;
	if (!apiKey) {
		return NextResponse.json({ error: 'Server missing MUAPI_API_KEY' }, { status: 500 });
	}
	outgoingHeaders.set('x-api-key', apiKey);

	try {
		const resp = await fetch(targetUrl, {
			method,
			headers: outgoingHeaders,
			body: body ?? undefined,
			// Do not send credentials/cookies to third-party
			redirect: 'follow',
		});

		// Stream back the response as-is, including status
		const responseHeaders = new Headers();
		resp.headers.forEach((value, key) => {
			responseHeaders.set(key, value);
		});

		return new NextResponse(resp.body, {
			status: resp.status,
			headers: responseHeaders,
		});
	} catch (error) {
		return NextResponse.json({ error: 'Upstream request failed', details: String(error) }, { status: 502 });
	}
}

export { forward as GET, forward as POST, forward as PUT, forward as DELETE, forward as PATCH, forward as HEAD };


