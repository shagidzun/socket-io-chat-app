import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
	const error = useRouteError();
	console.error(error);

	return (
		<div id="error-page">
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
				{/* @ts-expect-error*/}
				<i>{error.statusText || error.message}</i>
			</p>
		</div>
	);
}
