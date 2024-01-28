const _ = require('lodash');


const dummy = (blogs) => {
    return 1
}

const totalLikes = (list) => {
    return list.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length == 0) return null

    let favorite = blogs[0]
    blogs.forEach(b => {
        if (b.likes > favorite.likes){
            favorite = b
        }

    })

    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
}

const mostBlogs = (blogs) => {
    if (_.isEmpty(blogs)) return null

    const authorBlogs = _.countBy(blogs, 'author')

    const authorData = _.maxBy(_.toPairs(authorBlogs), _.last)
    return {
        author: authorData[0],
        blogs: authorData[1]
    }
}

const mostLikes = (blogs) =>{
    if (_.isEmpty(blogs)) return null

    const authorLikes = _(blogs).groupBy('author').map((authorBlogs, author) => {
        return {
            author, likes: _.sumBy(authorBlogs, 'likes')
        }
    }).value()

    const authorData = _.maxBy(authorLikes, 'likes');

    return authorData ? { author: authorData.author, likes: authorData.likes } : null;
}

module.exports = {
    totalLikes,
    dummy, 
    favoriteBlog,
    mostBlogs,
    mostLikes
}