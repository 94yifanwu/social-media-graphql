import React from 'react'
import {Button, Form} from 'semantic-ui-react'
import {useForm} from '../util/hooks'
import {useMutation} from '@apollo/react-hooks'
import {FETCH_POSTS_QUERY, CREATE_POST_MUTATION} from '../util/graphql'

function PostForm() {

    function createPostCallBack(){
        createPost()
    }

    const {values, onChange, onSubmit} = useForm(createPostCallBack, {
        body: ""
    })

    const [createPost, {error}] = useMutation(CREATE_POST_MUTATION, {
        variables: values, 
        update(proxy, result){
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            })
            data.getPosts = [result.data.createPost, ...data.getPosts]
            proxy.writeQuery({ query: FETCH_POSTS_QUERY, data})
            values.body = '' 
        },
    })

    return (
        <>
        <Form onSubmit={onSubmit}>
            <h2>
                Create a post:
            </h2>
            <Form.Field>
                <Form.Input 
                    placeholder="hi"
                    name="body"
                    value={values.body}
                    onChange={onChange}
                    error={error ? true : false}
                />
                <Button type="submit" color="teal">
                    Submit
                </Button>
            </Form.Field>
        </Form>
        {error&& (
            <div className="ui error message" style={{marginBottom:20}}>
                <ul className="list">
                    <li>{error.graphQLErrors[0].message}</li>
                </ul>
            </div>

        )}
        </>
    )
}


export default PostForm
