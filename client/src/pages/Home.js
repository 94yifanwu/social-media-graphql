import React, {useContext} from 'react'
import {useQuery} from '@apollo/react-hooks'
import {Grid, Transition} from 'semantic-ui-react'
import PostForm from '../components/PostForm'
import {AuthContext} from '../context/auth'
import {FETCH_POSTS_QUERY} from '../util/graphql'
import PostCard from '../components/PostCard'

function Home() {
    const {user} = useContext(AuthContext)
    const {loading, data:{ getPosts: posts} } = useQuery(FETCH_POSTS_QUERY)
    return (
        <Grid columns={3}>
            <Grid.Row className="posts-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {user && (
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                )}
                {loading? (
                    <h1>Loading... </h1>
                ) : (
                    <Transition.Group>
                        {posts &&
                        posts.map((post) => (
                            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                            <PostCard post={post} />
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






export default Home
