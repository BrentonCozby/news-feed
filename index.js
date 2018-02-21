const $postsTarget = document.querySelector('#posts-target')
const $deletedCommentsTarget = document.querySelector('#deleted-comments-target')

// localStorage items set in database.js
let postCounter = JSON.parse(localStorage.getItem('postCounter')) // used as the id for a new post
let commentCounter = JSON.parse(localStorage.getItem('commentCounter')) // used as the id for a new comment
let posts = JSON.parse(localStorage.getItem('posts'))
let comments = JSON.parse(localStorage.getItem('comments'))
let deletedComments = JSON.parse(localStorage.getItem('deletedComments'))

function createPost() {
    const title = window.prompt('Post Title:', `Post ${postCounter + 1}`)
    let paragraph = window.prompt('New paragraph:')

    if (!title || !paragraph) {
        return window.alert('Post cancelled.')
    }

    postCounter += 1

    const newPost = {
        title: title,
        body: [],
        commentIds: []
    }

    newPost.body.push(paragraph)

    while (confirm('Add another paragraph?')) {
        paragraph = window.prompt('New paragraph:')

        if (paragraph) {
            newPost.body.push(paragraph)
        }
    }
    
    posts[postCounter] = newPost

    renderPosts()

    // updateDatabase defined in database.js
    updateDatabase('postCounter', postCounter)
    updateDatabase('posts', posts)
}

function addComment(postId) {
    let paragraph = window.prompt('What is your comment?')

    if (!paragraph) {
        return window.alert('Comment cancelled.')
    }

    commentCounter += 1
    posts[postId].commentIds.push(commentCounter)

    const newComment = {
        postId: postId,
        body: []
    }

    newComment.body.push(paragraph)

    while (confirm('Add another paragraph?')) {
        paragraph = window.prompt('New paragraph')

        if (paragraph) {
            newComment.body.push(paragraph)
        }
    }
    
    comments[commentCounter] = newComment

    renderPosts()

    // updateDatabase defined in database.js
    updateDatabase('commentCounter', commentCounter)
    updateDatabase('comments', comments)
    updateDatabase('posts', posts)
}

function deleteComment(commentId, postId) {
    deletedComments[commentId] = comments[commentId]
    deletedComments[commentId].timeDeleted = Date.now()

    delete comments[commentId]

    const commentIdIndex = posts[postId].commentIds.indexOf(commentId)
    posts[postId].commentIds.splice(commentIdIndex, 1)

    renderPosts()
    renderDeletedComments()

    // updateDatabase defined in database.js
    updateDatabase('deletedComments', deletedComments)
    updateDatabase('comments', comments)
    updateDatabase('posts', posts)
}

function Comment(commentId, postId, body) {
    return `
        <article class="comment" data-id="${commentId}">
            <button class="delete-comment" onclick="deleteComment(${commentId}, ${postId})">×</button>
            ${body.map(paragraph => `<p>${paragraph}</p>`).join('\n')}
        </article>
    `
}

function DeletedComment(commentId, body) {
    return `
        <article class="deleted-comment margin-2rem" data-id="${commentId}">
            ${body.map(paragraph => `<p>${paragraph}</p>`).join('\n')}
        </article>
    `
}

function Post(postId, title, body, commentIds) {
    return `
        <article class="post margin-2rem padding-2rem" data-id="${postId}">
            <header>
                <h2 class="post-title">${title}</h2>
            </header>
            <section>
                ${body.map(paragraph => `<p>${paragraph}</p>`).join('\n')}
            </section>
            <section class="post-comments">
                <h4>Comments</h4>
                <button class="add-comment" onclick="addComment(${postId})">+ Add Comment</button>
                ${commentIds.map(commentId => {
                    return Comment(commentId, comments[commentId].postId, comments[commentId].body)
                }).join('\n')}
            </section>
        </article>
    `
}

function renderPosts() {
    $postsTarget.innerHTML = Object.keys(posts).map(postId => {
        return Post(postId, posts[postId].title, posts[postId].body, posts[postId].commentIds)
    }).join('\n')
}

function renderDeletedComments() {
    const orderedCommentIds = Object.keys(deletedComments).sort((a, b) => {
        return deletedComments[a].timeDeleted - deletedComments[b].timeDeleted
    })

    $deletedCommentsTarget.innerHTML = orderedCommentIds.map(commentId => {
        return DeletedComment(commentId, deletedComments[commentId].body)
    }).join('\n')
}

function resetNewsFeed() {
    // resetDatabaseToDefaults defined in database.js
    resetDatabaseToDefaults()

    postCounter = JSON.parse(localStorage.getItem('postCounter'))
    commentCounter = JSON.parse(localStorage.getItem('commentCounter'))
    posts = JSON.parse(localStorage.getItem('posts'))
    comments = JSON.parse(localStorage.getItem('comments'))
    deletedComments = JSON.parse(localStorage.getItem('deletedComments'))

    renderPosts()
    renderDeletedComments()
}

document.addEventListener('DOMContentLoaded', () => {
    renderPosts()
    renderDeletedComments()
})
