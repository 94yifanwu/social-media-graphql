import React from 'react'
import {useMutation} from '@apollo/react-hooks'
import {Button, Icon} from 'semantic-ui-react'
import {DELETE_POST_MUTATION} from '../util/graphql'

function DeleteButton({ postId }) {

    const [deletePost] = useMutation(DELETE_POST_MUTATION,{variables: postId})

    return (
        <Button onClick={deletePost}>
        <   Button color="red" >
                <Icon name="trash" />
            </Button>
        </Button>
    )
}

export default DeleteButton
