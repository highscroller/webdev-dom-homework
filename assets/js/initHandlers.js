import { renderComments } from './renderComments.js'

export function initLikeButtons({ comments, commentsList, afterRender }) {
    const likeButtons = document.querySelectorAll(
        '.comments > .comment > .comment-footer .like-button',
    )

    likeButtons.forEach((likeButton, index) => {
        likeButton.addEventListener('click', (event) => {
            event.stopPropagation()

            comments[index].isLiked = !comments[index].isLiked
            comments[index].likes += comments[index].isLiked ? 1 : -1

            renderComments(comments, commentsList, afterRender)
        })
    })
}

export function initReplyClicks({
    comments,
    replyHint,
    commentInput,
    addButton,
    setReplyIndex,
}) {
    const commentElements = document.querySelectorAll('.comments > .comment')

    commentElements.forEach((commentEl, index) => {
        commentEl.addEventListener('click', () => {
            const comment = comments[index]

            setReplyIndex(index)
            replyHint.textContent = `Ответ ${comment.author.name}`
            replyHint.hidden = false
            commentInput.placeholder = `Ваш ответ на комментарий ${comment.author.name}`
            commentInput.focus()
            addButton.textContent = 'Ответить'
        })
    })
}

export function bindCommentHandlers(deps) {
    initLikeButtons(deps)
    initReplyClicks(deps)
}
