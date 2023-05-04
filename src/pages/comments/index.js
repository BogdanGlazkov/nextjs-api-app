import { useState } from "react";

function CommentsPage() {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const response = await fetch("/api/comments");
    const data = await response.json();
    setComments(data);
  };

  return (
    <>
      <button onClick={fetchComments}>Load comments</button>
      {comments.map((comment) => {
        return (
          <div key={comment.id}>
            <p>
              {comment.id} {comment.text}
            </p>
          </div>
        );
      })}
    </>
  );
}

export default CommentsPage;
