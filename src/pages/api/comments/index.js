import { comments } from "../../../../data/comments";

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(comments);
  } else if (req.method === "POST") {
    const comment = req.body.comment;
    const newComment = {
      id: Date.now(),
      text: comment,
    };
    comments.push(newComment);
    res.status(201).json(newComment);
  } else if (req.method === "PUT") {
    const { id, text } = req.body;
    const editedComment = comments.find(
      (comment) => comment.id === parseInt(id)
    );
    editedComment.text = text;
    res.status(200).json(editedComment);
  }
}
