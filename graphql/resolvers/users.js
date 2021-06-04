const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {SECRET_KEY } = require('../../config')
const { UserInputError} = require('apollo-server')
const {validateRegisterInput, validateLoginInput} = require('../../util/validators')

function generateToken(res) {
    return jwt.sign({
        id: res.id,
        email: res.email,
        username: res.username
    }, SECRET_KEY, {expiresIn:'24h'})
}

module.exports = {
    Mutation:{
        async login(_,{username, password}){
            const {errors, valid} = validateLoginInput(username, password)

            if(!valid){
                throw new UserInputError('Errors', {errors})
            }

            const find_user = await User.findOne({ username })

            if( !find_user ){
                errors.general = 'User not found1'
                throw new UserInputError('User not found2',{ errors })
            }
             
            const match_password = await bcrypt.compare(password, find_user.password)
            if(!match_password){
                errors.general = "Wrong credential"
                throw new UserInputError('Wrnong credential', {errors})
            }

            const token = generateToken(find_user)

            return{
                ...find_user._doc,
                id: find_user._id,
                token
            }
        },
        async register(_, 
            {
                registerInput: { username, email, password, confirmPassword}
            },
            context, 
            info
        ){
            // Validate user data

            const {valid, errors} = validateRegisterInput(username, email, password, confirmPassword)
            if(!valid){
                throw new UserInputError('Errors', {errors})
            }

            
            // Make sure user doesn't already exist

            const existed_user = await User.findOne({ username })
            if(existed_user){
                throw new UserInputError('Username is taken',{
                    errors: {
                        username: 'This username is taken ah'
                    }
                })
            }


            // hash password and create and auth token

            password = await bcrypt.hash(password, 12)

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            })

            const res = await newUser.save()

            const token = generateToken(res)

            return{
                ...res._doc,
                id: res._id,
                token
            }
            
        }
    }
}