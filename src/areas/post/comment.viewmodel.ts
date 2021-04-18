import IComment from "../../interfaces/comment.interface";

// The following is an (incomplete) example of what a view model may look like
// The purpose of a view model is to format the incoming data from the database
// into what the ejs page requires specifically.

// Please feel free to change this in any way you like.
export class CommentViewModel {
  id: string;
  userId: string;
  createdAt: String;
  message: string;

  constructor(comment: IComment) {
    this.id = comment.id;
    this.userId = comment.userId;
    this.createdAt = comment.createdAt.toString();
    this.message = comment.message;
  }
}
