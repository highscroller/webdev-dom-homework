import { fetchComments } from './fetchComments.js'
import { renderComments } from './renderComments.js'
import { bindCommentHandlers } from './initHandlers.js'
import { bindSanitizedInput, bindAddCommentButton } from './formHandlers.js'

export async function init() {
    const nameInput = document.getElementById('name')
    const commentInput = document.getElementById('comment')
    const addButton = document.getElementById('submit')
    const commentsList = document.querySelector('.comments')
    const replyHint = document.getElementById('reply-to')

    let userName = ''
    let userComment = ''
    let replyToCommentIndex = null
    let comments = []

    function afterRender() {
        bindCommentHandlers({
            comments,
            commentsList,
            replyHint,
            commentInput,
            addButton,
            setReplyIndex: (index) => {
                replyToCommentIndex = index
            },
            afterRender,
        })
    }

    bindSanitizedInput(nameInput, (value) => {
        userName = value
    })

    bindSanitizedInput(commentInput, (value) => {
        userComment = value
    })

    bindAddCommentButton({
        addButton,
        nameInput,
        commentInput,
        replyHint,
        commentsList,
        getUserName: () => userName,
        getUserComment: () => userComment,
        getReplyIndex: () => replyToCommentIndex,
        getComments: () => comments,
        afterRender,
        resetForm: () => {
            nameInput.value = ''
            commentInput.placeholder = 'Введите ваш комментарий'
            commentInput.value = ''
            userName = ''
            userComment = ''
            replyToCommentIndex = null
            replyHint.textContent = ''
            replyHint.hidden = true
            addButton.textContent = 'Написать'
        },
    })

    try {
        comments = await fetchComments()
        renderComments(comments, commentsList, afterRender)
    } catch (error) {
        console.error(error)
    }
}
