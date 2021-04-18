import IComment from "./comment.interface";

interface IPost {
  id: string;
  message: string;
  userId: string;
  createdAt: Date;
  commentList?: Array<IComment>;
  likes: string; // likes, reposts, comments converted to type string to work with Octavio's code
  reposts: string;
  comments: string;
}

export default IPost;
