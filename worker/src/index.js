/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */


addEventListener("fetch", async event => {
	event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {

	const responseHeaders = new Headers()
	responseHeaders.set('Access-Control-Allow-Origin', request.headers.get("Origin"))
	responseHeaders.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE')
	responseHeaders.set('Access-Control-Max-Age', '86400')

	responseHeaders.set('content-type', 'text/json')

	if (request.method === "OPTIONS") {
		return handleOptions(request)
	}

	if (request.method !== 'POST') {
		return new Response('{"text":"Only POST is supported"}', { headers: responseHeaders });
	}

	const payload = await request.json();

	const msg = {
		to: 'mee.six@gmail.com',
		from: 'ProOrganica Site <info@proorganica.com>',
		subject: 'New website form submission',
		html: `
    <h2>ProOrganica new form submission</h2>
    <br>
    <p>From: ${payload.proo_name} — ${payload.proo_email} </p>
    <p>Company: ${payload.proo_company} </p>
    <p>Phone: ${payload.proo_phone} </p>
    <br>
    <p>Message:<br> <pre>${payload.proo_message}</pre> </p>
    <p></p>
    
    <br>
    <hr>
    <br>
    
    <p style="color:98b802"><a href="https://proorganica.com">ProOrganica Bot</a></p>
    `,
	}

	try {
		message = await sendEmail(msg);
		text = await message.text();
		return new Response(`${JSON.stringify({'text': 'Message sent', 'status':message.status})}`, { headers: responseHeaders });
	} catch (e) {
		return new Response(JSON.stringify({ 'status': e.message, 'code': e.code }), { headers: responseHeaders });

	}
}

async function sendEmail({ to, name, from, subject, html }) {

	const email = await fetch('https://api.sendgrid.com/v3/mail/send', {
		body: JSON.stringify({
			'from': {
				'email': from, // add your email here
			},
			'personalizations': [
				{
					'to': [
						{
							'email': to,
							'name': name
						},
					],
				},
			],
				'subject': subject,
				'content': [
					{ "type": "text/html", value: html }
				]
		}),
		headers: {
			'Authorization': `Bearer ${SENDGRID_API_KEY}`,
			'Content-Type': 'application/json',
		},
		method: 'POST',
	});

	return email
}

const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type",
}
  
function handleOptions(request) {
if (request.headers.get("Origin") !== null &&
	request.headers.get("Access-Control-Request-Method") !== null &&
	request.headers.get("Access-Control-Request-Headers") !== null) {
	// Handle CORS pre-flight request.
	return new Response(null, {
	headers: corsHeaders
	})
} else {
	// Handle standard OPTIONS request.
	return new Response(null, {
	headers: {
		"Allow": "GET, HEAD, POST, OPTIONS",
	}
	})
}
}