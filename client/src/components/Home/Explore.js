import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getPosts} from '../../redux/actions/post'
import PostElement from '../profile/PostElement'

const Explore = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])
    const {posts, loading} = useSelector(state => state.post)
    const {profile, pLoading} = useSelector(state => state.profile)
    if(loading) return <div className = "pt-5"><div className="loader py-5"></div></div>
    if(pLoading) return <div className = "pt-5"><div className="loader py-5"></div></div>
    return (
        <>
            <div className="w-75">
            <div className="row offset-3 pt-3">
                {posts.map((post) => (
            <PostElement post={post} key={post._id} profile={profile} explore = {true}/>
            ))}
            </div>
            </div>
        </>
    )
}

export default Explore
