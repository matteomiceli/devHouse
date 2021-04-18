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

  findById(id: string): IPost|undefined {
    database.users.forEach(user => {
      user.posts.forEach(post => {
        if (post.postId == id) {
          console.log(post);
          return post;
        }
      }) 
    });
    return undefined;
  }

  addCommentToPost(message: { id: string; createdAt: Date; userId: string; message: string }, postId: string): void { 
    


    throw new Error("Method not implemented.");
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
}
