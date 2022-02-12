<script>
	import client from './api/sanityClient.js';

	const query = '*[_type == "document"]';
    client.fetch(query).then((persons) => {
		console.log('Persons');
		persons.forEach((person) => {
			console.log(`${person.name}`);
		});
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
