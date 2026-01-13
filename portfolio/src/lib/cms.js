// Generic CMS helper for fetching projects via a GraphQL API.
// This helper expects two environment variables to be set:
//  - PUBLIC_CMS_API_URL: The GraphQL endpoint of your headless CMS
//  - PUBLIC_CMS_API_TOKEN: An access token if your CMS requires authentication

/**
 * Fetch a list of projects from a headless CMS. The GraphQL query
 * should be adjusted to match your schema. This function returns
 * an array of objects with `title`, `description`, `imageUrl` and `link` fields.
 *
 * If the environment variables are not provided or the request fails,
 * a fallback list of example projects is returned instead.
 */
export async function getProjects() {
  const endpoint = import.meta.env.PUBLIC_CMS_API_URL;
  const token = import.meta.env.PUBLIC_CMS_API_TOKEN;

  // If CMS environment variables aren't provided, return fallback data
  if (!endpoint || !token) {
    return [
      {
        title: 'Example Project 1',
        description: 'A sample project demonstrating Astro integration with a headless CMS. Replace this with your own project data.',
        imageUrl: '/src/assets/project-placeholder.png',
        link: '#',
      },
      {
        title: 'Example Project 2',
        description: 'Another example project. Configure your CMS and update this data accordingly.',
        imageUrl: '/src/assets/project-placeholder.png',
        link: '#',
      },
      {
        title: 'Example Project 3',
        description: 'Customize these cards by connecting to your CMS and populating real project data.',
        imageUrl: '/src/assets/project-placeholder.png',
        link: '#',
      },
    ];
  }

  const query = `query Projects {
    projects {
      id
      title
      description
      imageUrl
      link
    }
  }`;
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    });
    const json = await res.json();
    return json?.data?.projects ?? [];
  } catch (err) {
    console.error('Error fetching projects from CMS:', err);
    return [];
  }
}