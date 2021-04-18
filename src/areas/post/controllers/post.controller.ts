import { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import IPostService from "../services/IPostService";
import { post, posts, database, userDatabase } from "../../../model/fakeDB";
import {v4 as uuid} from 'uuid';
import IPost from "../../../interfaces/post.interface";

class PostController implements IController {
  postService: IPostService;

  public path = "/posts";
  public router = Router();

  constructor(postService: IPostService) {
    this.postService = postService;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    // this.router.get(`${this.path}/:id/like`, this.likePost);

    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.get(`${this.path}/:id/delete`, this.deletePost);
    this.router.post(`${this.path}/:id/comment`, this.createComment);
    this.router.post(`${this.path}`, this.createPost);
  }

  // 🚀 This method should use your postService and pull from your actual fakeDB, not the temporary posts object
  private getAllPosts = (_: Request, res: Response) => {
    let allPosts: IPost[] = [];
    database.users.forEach(user => {
      user.posts.forEach(post => {
        allPosts.push(post);
      })
    })

    res.render("post/views/posts", { posts: allPosts });
  };

  // 🚀 This method should use your postService and pull from your actual fakeDB, not the temporary post object
  private getPostById = async (req: Request, res: Response, next: NextFunction) => {
   
    const fetchedPost = this.postService.findById(req.params.id);
    console.log(fetchedPost)

    res.render("post/views/post", { post: fetchedPost });
  };

  // 🚀 These post methods needs to be implemented by you
  private createComment = async (req: Request, res: Response, next: NextFunction) => {
    const commentText = req.body.commentText;
    const postID = req.params.id;
    const sessionUser = userDatabase[0]; // hardcoded session example
    
    let comment = {
      id: `${uuid()}`,
      createdAt: new Date(), 
      userId: `${sessionUser.id}`, 
      message: commentText
    }
    
    let postObj = this.postService.findById(postID); // returns a post object
    
    this.postService.addCommentToPost(comment, postID);

    res.render(`post/views/post`, { post: postObj } ); // sends back to previous page
  };

  private createPost = async (req: Request, res: Response, next: NextFunction) => {};
  private deletePost = async (req: Request, res: Response, next: NextFunction) => {
    const postID = req.params.id;
    console.log("this has been called ---------------------- deletePost");
    this.postService.deletePost(parseInt(postID));
    // this.deletePost(postID);
    res.redirect(`${this.path}`);
  };
}

export default PostController;
