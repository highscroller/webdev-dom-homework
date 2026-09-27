export async function fetchComments() {
    const response = await fetch('assets/json/comments.json')

    if (!response.ok) {
        throw new Error('Не удалось загрузить комментарии')
    }

    return await response.json() // вернёт массив
}
