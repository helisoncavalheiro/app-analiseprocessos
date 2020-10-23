import React from 'react';

const NotFound = () => (
	<div class="text-center">
		<div class="error mx-auto" data-text="404">404</div>
		<p class="lead text-gray-800 mb-5">Page Not Found</p>
		<p class="text-gray-500 mb-0">Parece que você encontrou um glitch na matrix...</p>
		<a href="index.html">&larr; Voltar para o Dashboard</a>
	</div>
)

export default NotFound;