export default function Comment(comment) {
  const hasNestedComments = comment.comments.length > 0
  return `
  <div class="nested-comments-${comment.level}">
      <p class="comment-header">
        ${comment.user} | ${comment.time_ago}
      </p>
      ${comment.content}
      ${
        hasNestedComments
          ? //Here we use recursion to show the nested comments. Recusrcion calls again the Comment function from within itself. We use this because allows us to reuse the funcion competly as the format of the comments is the same, only the level of indentation changes according to the replys of the comment.
            comment.comments.map((comment) => Comment(comment)).join("")
          : ""
      }
  </div>
  
  
  
  `
}
