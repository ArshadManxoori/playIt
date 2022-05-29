import React, {useState, useEffect } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';   //this is not worked
import { database } from '../firebase';
/* Icons are not part of material-ui/core so it must be install using two commands.
    npm install @material-ui/core
    npm install @material-ui/icons*/


    function Like({userData, postData}) {
    const [like, setLike] = useState(null)
    useEffect(()=>{
        let check = postData.likes.includes(userData.userId)?true:false
        setLike(check);
    }, [postData])  //database me change kra hai ki like kra hai ya nahi, jab database me change kraenge tab post data update hoga
    //agr user ne like change kr diya hai to post me change hoga fir uss se componentDidMount chlega fir pura function chaln ke baad like ki value true set hogi aur like ka color red ho jaega

    const handleLike = () => {
        if(like == true){
            let narr = postData.likes.filter((elm)=>elm!=userData.userId)  //user ki value hata rhe hai likes waale array me se
            database.posts.doc(postData.postId).update({ //psotId:doc.id, ye database waali id nahi hai ye humne bnai hai
                likes:narr
            })
        }else{
            let narr = [...postData.likes, userData.userId]
            database.posts.doc(postData.postId).update({ //psotId:doc.id, ye database waali id nahi hai ye humne bnai hai
                likes:narr
            })
        }
    }

    return (
        <div>
            {
                like!=null?
                <>
                {
                    like==true?<FavoriteIcon className={`icon-styling like`} onClick={handleLike}/> :<FavoriteIcon className={`icon-styling unlike`} onClick={handleLike}/>
                }
                </>:
                <></>
            }
        </div>
    )
}

export default Like
