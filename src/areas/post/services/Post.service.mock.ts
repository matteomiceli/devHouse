import IPost from "../../../interfaces/post.interface";
import IPostService from "./IPostService";
import { posts, database } from "../../../model/fakeDB";

// ⭐️ Feel free to change this class in any way you like. It is simply an example...
export class MockPostService implements IPostService {
  addPost(post: IPost, username: string): void {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }

  getAllPosts(username: string): IPost[] {
    // 🚀 Implement this yourself.

    throw new Error("Method not implemented.");
  }

  findById(id: string): IPost | undefined {
    let returnedPost: IPost;
    console.log('the id is ' + id);
    database.users.forEach(user => {
      user.posts.forEach(post => {
        // console.log(post)
        if (post.postId == id) {
          console.log(post);
          returnedPost = post;
        }
      })
    });
    return returnedPost;
  }

  addCommentToPost(message: { id: string; createdAt: Date; userId: string; message: string }, postId: string): void {
    const post = this.findById(postId);
    console.log(post)
    // push comment to post comment list
    post.commentList.push(message);
  }

  sortPosts(posts: IPost[]): IPost[] {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }

  deletePost(postId: number): void {
    let id = `${postId}`;
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].postId === id) {
        posts.splice(i, 1);
      }
    }
  }

  likePost(postId: number, username: string): void {
    console.log("like post is being called ----------------------- post.service");
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].postId === postId.toString()) {
        if (posts[i].likes[username]) {
          delete posts[i].likes[username];
          console.log("we disliked the post");
          console.log("Post Likes------" + JSON.stringify(posts[i].likes));
          return;
        }
        posts[i].likes[username] = true;
        console.log("we Liked the post");
        console.log("Post Likes------" + JSON.stringify(posts[i].likes));
      }
    }
  }
}
