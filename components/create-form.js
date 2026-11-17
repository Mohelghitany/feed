"use client";
import { useActionState } from "react";
import { createPost } from "@/lib/actions/post-actions";

export default function CreateForm() {
  const [state, formAction, isPending] = useActionState(createPost, {});
  return (
    <form action={formAction}>
      <p className="form-control">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" />
      </p>
      <p className="form-control">
        <label htmlFor="image">Image URL</label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          id="image"
          name="image"
        />
      </p>
      <p className="form-control">
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows="5" />
      </p>
      <p className="form-actions">
        <button type="reset" disabled={isPending}>
          Reset
        </button>
        <button disabled={isPending}>
          {isPending ? "Creating..." : "Create Post"}
        </button>
      </p>
      {state.length > 0 && <p className="form-errors">{state.join(", ")}</p>}
    </form>
  );
}
