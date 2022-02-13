import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'

const client = sanityClient({
	projectId: `${import.meta.env.VITE_SANITY_PROJECT_ID}`,
	dataset: 'production',
	apiVersion: '2022-02-12',
	token: `${import.meta.env.VITE_SANITY_AUTH_TOKEN}`,
	useCdn: false
});
const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

export async function get() {
	const query = `*[_type == "event"] | order(year asc)`;
	const result = await client.fetch(query, { returnDocuments: true});
	return {
		statusCode: 200,
		body: JSON.stringify(result)
	};
}
