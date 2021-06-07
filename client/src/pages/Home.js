import React from 'react'
import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {Grid, Transition} from 'semantic-ui-react'
import Postcard from '../components/Postcard'

function Home() {
    const {loading, data:{ getPosts: posts} } = useQuery(FETCH_POSTS_QUERY)
    return (
        <Grid columns={3}>
            <Grid.Row className="posts-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
        <Grid.Row>
            {loading? (
                <h1>Loading... </h1>
            ) : (
                <Transition.Group>
                    {posts &&
                    posts.map((post) => (
                        <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                        <Postcard post={post} />
                        </Grid.Column>
                    ))}
                </Transition.Group>
            )}
            <Grid.Column>
            </Grid.Column>
        </Grid.Row>
        </Grid>
    
    )
}

const FETCH_POSTS_QUERY = gql `
query getPosts{
    getPosts{
        id
        body
        createdAt
        username
        likeCount
        commentCount
        likes{
            username
        }
        comments{   
            id
            username
            createdAt
            body
        }
    }
}`





export default Home