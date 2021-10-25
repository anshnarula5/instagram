import React from 'react'

import "./ProfilePost.css"

const ProfilePost = () => {
    return (
        <>
            <div className="row w-75">
                <div className="col-4 px-4"><img  className = "post"src="https://images.unsplash.com/photo-1635051802863-bfa3b4ff74ec?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=464&q=80" alt="" /></div>
                <div className="col-4 px-4"><img className = "post" src="https://images.unsplash.com/photo-1635081616425-e66a5a1b2fbe?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60" alt="" /></div>
                <div className="col-4 px-4"><img  className = "post"src="https://images.unsplash.com/photo-1635005012775-a4a2392f00e8?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60" alt="" /></div>
            </div>
        </>
    )
}

export default ProfilePost
