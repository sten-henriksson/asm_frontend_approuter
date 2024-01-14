"use client"

import { Check, ChevronsUpDown } from "lucide-react"

import { Posts } from "@/components/ui/posts"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { GET_TAGS, GET_POST } from "../get_tags/not_route"
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

export default function ComboboxDemo() {

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<string[]>([])
  const [tags, setTags] = React.useState<string[]>([])
  const [post, setPost] = React.useState<Post[]>([])
  const [render, setRender] = React.useState(false)

  const appendArray = (tag: string) => {
    // add  tag to tags array
    let a: string[] = [tag];
    if (!value.includes(tag)) {
      setValue([...value, ...a]); // Append new array
    }
  };
  // remove from array 
  const removeTag = (tag: string) => {
    // Remove tag from tags array
    setValue(value.filter(item => item !== tag)); // Remove the tag
  };

  React.useEffect(() => {
    GET_TAGS().then((res) => {
      setTags(res.map(function (v) {
        return v.toLowerCase();
      }))
    });
  }, [])
  React.useEffect(() => {

    GET_POST(value).then((res) => {
      if (res.posts[0]) {
        setPost(res.posts)
      }
      else {
      }
    })


  }, [render])

  return (
    <>
      <div className="flex justify-center">
        <Popover open={open} onOpenChange={setOpen}>

          <Button
            variant="default"
            className="mx-1"
            onClick={() => {
              setRender(!render)
            }}
          >
            {"search"}
          </Button>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {"Select tag..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search framework..." />
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {tags.map((tag, index) => (
                  <CommandItem
                    key={index}
                    value={tag}
                    onSelect={(currentValue) => {
                      appendArray(currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value.includes(tag) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {tag}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-wrap gap-1 my-1">
          {value.map((tag, key) => (
            <Button
              variant="outline"
              key={key}
              onClick={() => {
                removeTag(tag)
              }}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {post.map(post => {
          if (post.links == null) {
            return (<></>)
          }
          return (
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
          )
        })}
      </div>
    </>
  )
}
