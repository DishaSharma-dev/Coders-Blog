import CommentModel from "./comment.model";

export default class BlogModel{
    _id! : String;
    UserId! : String;
    Title! : String;
    Category! : String;
    Description! : String;
    Body! : String;
    Comments! : CommentModel[];
    Image! : String;
    IsVisible! : Boolean;
    Date! : Date;
    Likes : Number = 0;
}