"use client";
import { useOptimistic } from "react";
import { updatePostLike } from "@/lib/actions/post-actions";

import { formatDate } from "@/lib/format";
import LikeButton from "./like-icon";

function Post({ post }) {
  const [optimisticPost, setOptimisticPost] = useOptimistic(
    post,
    (current, next) => {
      return {
        ...current,
        ...next,
      };
    },
  );
  async function likeAction() {
    const isLiked = !optimisticPost.isLiked;
    setOptimisticPost({
      isLiked,
      likes: optimisticPost.likes + (isLiked ? 1 : -1),
    });
    await updatePostLike(optimisticPost.id);
  }
  return (
    <article className="post">
      <div className="post-image">
        <img src={optimisticPost.imageUrl} alt={optimisticPost.title} />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{optimisticPost.title}</h2>
            <p>
              Shared by {optimisticPost.userFirstName} on{" "}
              <time dateTime={optimisticPost.createdAt}>
                {formatDate(optimisticPost.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form action={likeAction}>
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{optimisticPost.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }) {
  if (!posts || posts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  return (
    <ul className="posts">
      {posts.map((post) => (
        <li key={post.id}>
          <Post post={post} />
        </li>
      ))}
    </ul>
  );
}
