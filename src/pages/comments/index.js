import { useState } from "react";

function CommentsPage() {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [editedComment, setEditedComment] = useState("");
  const [isEditing, setIsEditing] = useState(null);

  const fetchComments = async () => {
    const response = await fetch("/api/comments");
    const data = await response.json();
    setComments(data);
  };

  const submitComment = async () => {
    if (!comment.trim()) return;
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ comment }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setComment("");
  };

  const editComment = async () => {
    if (!editedComment.trim()) return;
    await fetch(`/api/comments`, {
      method: "PUT",
      body: JSON.stringify({ id: isEditing, text: editedComment }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setEditedComment("");
    setIsEditing(null);
    fetchComments();
  };

  const deleteComment = async (commentId) => {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    fetchComments();
  };

  return (
    <>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
          />
          <button onClick={editComment}>Edit comment</button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={submitComment}>Submit comment</button>
          <button onClick={fetchComments}>Load comments</button>
        </>
      )}
      {comments.map((comment) => {
        return (
          <div key={comment.id}>
            <p>
              {comment.id} {comment.text}
            </p>
            <button onClick={() => setIsEditing(comment.id)}>Edit</button>
            <button onClick={() => deleteComment(comment.id)}>Delete</button>
          </div>
        );
      })}
    </>
  );
}

export default CommentsPage;
