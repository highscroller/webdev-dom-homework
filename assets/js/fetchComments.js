export async function fetchComments() {
    const response = await fetch(
        'https://wedev-api.sky.pro/api/v1/grigorii-volosevich/comments',
        {
            method: 'GET',
        },
    )

    if (!response.ok) {
        throw new Error('Не удалось загрузить комментарии')
    }

    const data = await response.json()
    // console.log(data)

    return data.comments
}

export async function postComment({ name, text }) {
    const response = await fetch(
        'https://wedev-api.sky.pro/api/v1/grigorii-volosevich/comments',
        {
            method: 'POST',
            body: JSON.stringify({ name, text }),
        },
    )

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Не удалось добавить комментарий')
    }

    return data
}
