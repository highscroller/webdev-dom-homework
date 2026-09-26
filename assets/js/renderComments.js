export function renderReplies(comment) {
    return (comment.replies || [])
        .map(
            (reply) => `
        <li class="reply">
        <div class="comment-header">
            <div>${reply.name}</div>
            <div>${reply.date}</div>
        </div>
        <div class="comment-text">${comment.name}, ${reply.comment}</div>
        </li>
    `,
        )
        .join('')
}

export function renderComments(comments, commentsList, onAfterRender) {
    commentsList.innerHTML = comments
        .map((comment) => {
            const likeClass = comment.isLiked ? '-active-like' : ''
            const repliesHtml = renderReplies(comment)

            return `
        <li class="comment">
            <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.date}</div>
            </div>
            <div class="comment-body">
            <div class="comment-text">
                ${comment.comment}
            </div>
            </div>
            <div class="comment-footer">
            <div class="likes">
                <span class="likes-counter">${comment.likes}</span>
                <button class="like-button ${likeClass}"></button>
            </div>
            </div>
            <ul class="replies">
            ${repliesHtml}
            </ul>
        </li>
        `
        })
        .join('')

    onAfterRender?.()
}
