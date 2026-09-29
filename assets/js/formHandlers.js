import { renderComments } from './renderComments.js'
import { replaceHtmlSymbols } from './replaceHtmlSymbols.js'
import { postComment } from './fetchComments.js'
import { fetchComments } from './fetchComments.js'

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
    setComments,
    afterRender,
    resetForm,
}) {
    addButton.addEventListener('click', async () => {
        const userName = getUserName().trim()
        const userComment = getUserComment().trim()

        if (userName.length < 3) {
            nameInput.classList.add('error')
            return
        }
        if (userComment.length < 3) {
            commentInput.classList.add('error')
            return
        }

        addButton.disabled = true

        try {
            await postComment({ name: userName, text: userComment })

            const updatedComments = await fetchComments()
            setComments(updatedComments)
            resetForm()
            renderComments(updatedComments, commentsList, afterRender)
        } catch (error) {
            alert(error.message)
        } finally {
            addButton.disabled = false
        }
    })
}
