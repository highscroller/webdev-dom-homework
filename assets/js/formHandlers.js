import { renderComments } from './renderComments.js'
import { replaceHtmlSymbols } from './replaceHtmlSymbols.js'

export function bindSanitizedInput(input, onChange) {
    input.addEventListener('input', () => {
        onChange(replaceHtmlSymbols(input.value))
        input.classList.remove('error')
    })
}

export function bindAddCommentButton({
    addButton,
    nameInput,
    commentInput,
    commentsList,
    getUserName,
    getUserComment,
    getReplyIndex,
    getComments,
    resetForm,
    afterRender,
}) {
    addButton.addEventListener('click', () => {
        const userName = getUserName()
        const userComment = getUserComment()

        if (userName.trim() === '') {
            nameInput.classList.add('error')
            return
        }

        if (userComment.trim() === '') {
            commentInput.classList.add('error')
            return
        }

        const comments = getComments()
        const replyToCommentIndex = getReplyIndex()

        const newItem = {
            name: userName,
            comment: userComment,
            date: new Date().toLocaleString(),
            likes: 0,
            isLiked: false,
        }

        if (replyToCommentIndex === null) {
            newItem.replies = []
            comments.push(newItem)
        } else {
            comments[replyToCommentIndex].replies.push(newItem)
        }

        resetForm()
        renderComments(comments, commentsList, afterRender)
    })
}
