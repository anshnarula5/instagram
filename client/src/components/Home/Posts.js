import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {getPosts} from '../../redux/actions/post'
import Post from './Post/Post'

const Posts = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])
    const {posts, loading} = useSelector(state => state.post)
    if (loading) return "..loading"
    if (posts && posts.length > 0) {
        return posts.map(post => <Post post={post}/>)
    }
    return (
        "No posts yet"
    )
}

export default Posts
