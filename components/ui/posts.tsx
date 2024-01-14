"use client"

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
import React from "react";


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

export function Posts(prop: { posts: Post[],setPost: React.Dispatch<React.SetStateAction<Post[]>> }) {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {prop.posts.map(post => (
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