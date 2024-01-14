import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


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

export default async function Home() {
  let posts: Post[] = await getData();



  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2">
      {posts.map(post => (
        <Card key={post.id} className=' '>
          <CardHeader>
            <CardTitle>{post.title.substring(0, 300)}</CardTitle>
          </CardHeader>
          <CardContent>
            {// if theres more then 1 link show dialog
            }
            {post.links.length > 1 ? (
              <Dialog>
                <DialogTrigger>Open</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {post.links.map(link => (
                        <div key={link.id}>


                          <a href={link.url} target="_blank" rel="noreferrer" >
                            {link.url}
                          </a>
                        </div>
                      ))}
                    </DialogTitle>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            ) : (
              // else show link
              <a href={post.links[0].url} target="_blank" rel="noreferrer">
                {post.links[0].url}
              </a>
            )}


          </CardContent>
          <CardFooter>

            <div className="flex flex-wrap gap-1">
              <Badge>{post.author}</Badge>
              <Badge>{"score:" + post.upvotes}</Badge>
              {post.tags.map(tag => (
                <Badge key={tag.id}>{tag.name.substring(0, 80)}</Badge>
              ))}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

async function getData() {
  const res = await fetch('http://localhost:8081/r_post');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  let sss = await res.json();
  console.log("sss", sss)
  let data: Post[] = sss.posts;
  // filter out posts without links or null
  data = data.filter(post => post.links !== null);
  data = data.filter(post => post.links.length > 0);
  return data;
}
async function getData2() {
  //const res = await fetch('localhost:8081/r_post');


  const data: Post[] = [
    {
      id: 1,
      title: 'Title',
      author: 'Author',
      description: 'Description',
      upvotes: 1,
      tags: [
        {
          id: 1,
          name: 'tag',
          postId: 1,
        },
      ],
      links: [
        {
          id: 1,
          url: 'https://google.com',
          postId: 1,
        },
      ],
      time: '2020-01-01',
      post_link: 'https://google.com',
    },
  ]
  return data;
}
