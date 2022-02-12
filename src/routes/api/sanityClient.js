import sanityClient from '@sanity/client'

const client = sanityClient({
  projectId: `${import.meta.env.VITE_SANITY_PROJECT_ID}`,
  dataset: 'production',
  apiVersion: '2022-02-12',
  token: `${import.meta.env.VITE_SANITY_AUTH_TOKEN}`,
  useCdn: false
})

export default client