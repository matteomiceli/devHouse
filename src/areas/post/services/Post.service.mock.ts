import IPost from "../../../interfaces/post.interface";
import IPostService from "./IPostService";
import { posts, database } from "../../../model/fakeDB";
import { CommentViewModel } from "../comment.viewmodel";
import IUser from "../../../interfaces/user.interface";

// ⭐️ Feel free to change this class in any way you like. It is simply an example...
export class MockPostService implements IPostService {
  addPost(post: IPost, username: string): void {
    let existingUser: IUser;

    database.users.forEach((user) => {
      if (user.username == username) {
        existingUser = user;
      }
    });
    if (existingUser == null) {
      throw new Error("You must be logged in to make a post");
    }

    existingUser.posts.push(post);
  }

  getAllPosts(username: string): IPost[] {
    // 🚀 Implement this yourself.

    throw new Error("Method not implemented.");
  }

  findById(id: string): IPost | undefined {
    let returnedPost: IPost;
    console.log("the id is " + id);
    database.users.forEach((user) => {
      user.posts.forEach((post) => {
        // console.log(post)
        if (post.postId == id) {
          console.log(post);
          returnedPost = post;
        }
      });
    });
    return returnedPost;
  }

  addCommentToPost(message: { id: string; createdAt: Date; userId: string; message: string }, postId: string): void {
    const post = this.findById(postId);
    console.log(post);
    // push comment to post comment list
    post.commentList.push(message);
  }

  sortPosts(posts: IPost[]): IPost[] {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }

  deletePost(postId: string): void {
    let post = this.findById(postId);

    console.log("deletttttteeee " + JSON.stringify(post));
    for (let i = 0; i < database.users.length; i++) {
      if (database.users[i].username === post.userId) {
        for (let j = 0; j < database.users[i].posts.length; j++) {
          console.log("deletttttteeee post " + JSON.stringify(database.users[i].posts));
          if (database.users[i].posts[j].postId) {
            if (database.users[i].posts[j].postId === post.postId) {
              console.log("deletttttteeee post " + JSON.stringify(database.users[i].posts[j]));
              delete database.users[i].posts[j];
              return;
            }
          }
        }
      }
    }
    // for (let i = 0; i < posts.length; i++) {  ///-------old version using example posts data
    //   if (posts[i].postId === id) {
    //     posts.splice(i, 1);
    //   }
    // }
  }

  likePost(postId: string, username: string): void {
    console.log("like post is being called ----------------------- post.service");
    database.users.forEach((user) => {
      for (let i = 0; i < user.posts.length; i++) {
        if (user.posts[i]) {
          if (user.posts[i].postId === postId.toString()) {
            if (user.posts[i].likes[username]) {
              delete user.posts[i].likes[username];
              console.log("we disliked the post");
              console.log("Post Likes------" + JSON.stringify(user.posts[i].likes));
              return;
            }
            user.posts[i].likes[username] = true;
            console.log("we Liked the post");
            console.log("Post Likes------" + JSON.stringify(user.posts[i].likes));
          }
        }
      }
    });
  }
}
