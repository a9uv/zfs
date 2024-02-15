"use client"

import { useState } from "react";  
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddPost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const router = useRouter()

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleContentChange = (event) => {
        setContent(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await fetch("/api/add-post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            body: JSON.stringify({
                title,
                content,
            }),
            });
            

        if (res.status === 200) {
            alert("Post created successfully!");
            router.replace('/')
        } else {
            alert("Post creation failed!");
        }
            
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <main>
            <Link href={'/'}> View Feed </Link>
            <h1>Add Post</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" onChange={handleTitleChange} placeholder="Title" />
                <textarea name="content" onChange={handleContentChange} eplaceholder="Content"></textarea>
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}