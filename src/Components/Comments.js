import React, { useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import { database } from '../firebase';

function Comments({postData}) {
    const [comments, setComments] = useState(null)
    
    useEffect(async()=>{
        let arr = []
        for(let i = 0; i < postData.comments.length; i++){
            let data = await database.comments.doc(postData.comments[i]).get()
            arr.push(data.data())
        }
        setComments(arr);
    }, [postData])  //jaba jab postData update hoga tab tab chlega ye 
    return (
        <div>
            {

            comments==null? <CircularProgress /> : 
            <>
                {
                    comments.map((comment, index) => (
                        <div style={{display:'flex'}}>
                            <Avatar src={comment.uProfileImage} />
                            <p>&nbsp;&nbsp;<span style={{fontWeight:'bold'}}>{comment.uName}</span>&nbsp;&nbsp; {comment.text}</p>      {/* &nbsp;&nbsp; use for space */}
                        </div>
                    ))
                }
            </>
            }
        </div>
    )
}

export default Comments
