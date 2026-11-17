"use server";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadImage } from "@/lib/cloudinary";

export async function createPost(prevState, formData) {
  const title = formData.get("title");
  const image = formData.get("image");
  const content = formData.get("content");
  let error = [];
  if (!title || title.trim() === "") {
    error.push("Title is required");
  }
  if (!image || image.size === 0) {
    error.push("Image is required");
  }
  if (!content || content.trim() === "") {
    error.push("Content is required");
  }

  if (error.length > 0) {
    return error;
  }
  let imageUrl = "";
  try {
    imageUrl = await uploadImage(image);
    console.log(imageUrl);
  } catch (error) {
    return ["Failed to upload image"];
    console.log(error);
  }

  try {
    const post = await storePost({
      imageUrl: imageUrl,
      title,
      content,
      userId: "1",
    });
    revalidatePath("/", "layout");
  } catch (error) {
    return ["Failed to create post"];
  }
  redirect("/feed");
}

export async function updatePostLike(postId) {
  await updatePostLikeStatus(postId, "2");
  revalidatePath("/", "layout");
  redirect("/feed");
}
