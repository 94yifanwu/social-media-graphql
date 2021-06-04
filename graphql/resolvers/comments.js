const Post = require('../../models/Post')
const {UserInputError, AuthenticationError} = require('apollo-server')
const checkAuth = require('../../util/check-auth')

module.exports = {
    Mutation: {
        createComment: async (_, {postId, body}, context) => {
            const user = checkAuth(context)
            
            if(body.trim() === ''){
                throw new UserInputError('body is emptyl', {
                    errors:{
                        body: 'Comment body must not empty'
                    }
                })
            }

            // create comments on a post
            const post = await Post.findById(postId)
            if(post){
                post.comments.unshift({
                    body,
                    username: user.username,
                    createdAt: new Date().toISOString()
                })
                await post.save()
                return post
            }else {
                throw new UserInputError("Post not found")
            }
        },
        deleteComment: async (_, {postId, commentId}, context) => {
            const user = checkAuth(context)
            
            // delete a ciomment on a post
            const post = await Post.findById(postId)
            if(post){
                const commentIndex = post.comments.findIndex( comment => comment.id===commentId )

                if(post.comments[commentIndex].username===user.username){
                    post.comments.splice(commentIndex, 1)
                    await post.save()
                    return post
                }else{
                    throw new AuthenticationError("Action is not allowed")
                }
            }else {
                throw new UserInputError("Post not found")
            }
        }

    }
}