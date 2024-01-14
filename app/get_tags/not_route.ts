interface Post {
  id: number;
  title: string;
  author: string;
  description: string;
  upvotes: number;
  tags: Tag[];
  links: Link[];
  time: string;
  post_link: string;
}

interface Tag {
  id: number;
  name: string;
  postId: number;
}

interface Link {
  id: number;
  url: string;
  postId: number;
}
export const dynamic = "force-dynamic"; // defaults to auto
export async function GET_POST(tags: string[]): Promise<{ posts: Post[] }> {
  if (tags.length == 0) return { posts: [] };
  let url = "api/r_post"

  if (tags.length > 0) {
    // Join the tags array into a comma-separated string
    const tagsQuery = tags.join(",");
    // Append the tags as a query parameter
    url += `?tags=${tagsQuery}`;
  }

  // Fetch data from the server
  const res = await fetch(url);
  // Return the response data
  return res.json();
}
export async function GET_TAGS(): Promise<string[]> {
  let url = "api/r_tags";
  // Fetch data from the server
  let res = await fetch(url);
  let tags: { tags: Tag[] } = await res.json();

  // Return the response data
  return tags.tags.map((tag) => tag.name);
}
