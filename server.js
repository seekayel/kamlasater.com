import { handler } from './dist/handler.js';
import express from 'express';

const app = express();

// add a route that lives separately from the SvelteKit app
app.get('/healthcheck', (req, res) => {
  res.end('ok');
});

// handle static folder ourselves which allows us to set custom headers
app.use(express.static(
	'static',
	{
		setHeaders: (res, pathname, stats) => {
			if (pathname.match(/\.ico$/))
				res.setHeader('Content-Type', 'image/x-icon');
		}
	}
));

// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);

app.listen(3000, () => {
	console.log('listening on port 3000');
});
