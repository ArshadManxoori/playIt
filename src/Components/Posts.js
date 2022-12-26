import React, {useState, useEffect } from 'react'
import { database } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Video from './Video';
import './Posts.css';
import Avatar from '@mui/material/Avatar';
import Like from './Like';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Dialog from '@mui/material/Dialog';    
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Like2 from './Like2';
import AddComment from './AddComment';
import Comments from './Comments';


function Posts({userData}) {
    const [posts, setPosts] = useState(null);
    //for comments
    const [open, setOpen] = useState(null);    //if true hoga to saare modals khul jaenge, isiliye yahqa null store krwa rhe hai
    const handleClickOpen = (id) => {   //this id is pid
      // console.log("Chat", id);
      setOpen(id);
    };
    const handleClose = () => {
      setOpen(null);
    };

    useEffect(()=>{
        let parr = [];
        //snapshot is like get(), here we get posts acc to time in desending order
        const unsub = database.posts.orderBy('createdAt','desc').onSnapshot((querySnapshot)=>{     
            parr = []
            querySnapshot.forEach((doc)=>{
                let data = {...doc.data(),postId:doc.id}
                parr.push(data);
            })
            setPosts(parr);
        })
        return unsub
    }, [])

    //intersection observer api
    const callback = (entries) => {
        entries.forEach((entry)=>{
            let ele = entry.target.childNodes[0];
            console.log(ele);
            ele.play().then(()=>{   //video should muted for play() function
                if(!ele.paused && !entry.isIntersecting){
                    ele.pause();
                }
            })
        })
    }

    let observer = new IntersectionObserver(callback, {threshold:0.6});      
    useEffect(()=>{
        const element = document.querySelectorAll('.videos');
        element.forEach((video)=>{
            observer.observe(video);
        })
        return () => {
            observer.disconnect();  //jab post add hogi to pehle waale clear krke new attatch krenge
        }
    }, [posts]) 


    return (
        <div>
            {
                posts==null || userData==null ? <CircularProgress /> :
                <div className='video-container'>
                    {
                        posts.map((post,index)=>(   //NOTE: arrwo function me round bracket use hue hai
                            <React.Fragment key={index}>
                                <div className='videos'>
                                    {/* {console.log(post.pUrl)} */}
                                    <Video src={post.pUrl} id={post.pid}/>
                                    <div className='fa' style={{display:'flex'}}>   {/* display flex dene se profile icon and name ek ke niche ek nahi aenge */}
                                        <Avatar src={userData.profileUrl} />
                                        <h4>{userData.fullname}</h4>
                                    </div>
                                    <Like userData={userData} postData={post}/>
                                    
                                    <ChatBubbleIcon className='chat-styling' onClick={()=>handleClickOpen(post.pid)}/>
                                    <Dialog
                                        open={open==post.pid}
                                        onClose={handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                        fullWidth={true}
                                        maxWidth='md'
                                    >

                                        <div className='modal-container'>
                                            <div className="video-modal">
                                                {/* html waala video use kra hai kyuk controls bhi dene hai */}
                                                <video autoPlay={true}  controls>
                                                    <source src={post.pUrl}/>
                                                </video>
                                            </div>
                                            <div className="comment-modal">
                                            <Card className='card1' style={{padding:'1rem'}}>
                                                 <Comments postData={post}/>
                                            </Card>
                                            <Card variant='outlined' className="card2">
                                                <Typography style={{padding:'0.4rem'}}>{post.likes.length==0?'No Likes':`Liked by${post.likes.length} peoples`}</Typography>
                                                <div style={{display:'flex'}}>
                                                    {/* like2.js use krenge kuki purane waale like ki stylings alaga hai */}
                                                    <Like2 postData={post} userData={userData} style={{display:'flex', alignItems:'center', justifyContent:'center'}}/>
                                                    <AddComment style={{display:'flex',alignItems:'center',justifyContent:'center'}} userData={userData} postData={post}/>
                                                </div>
                                            </Card>
                                            </div>
                                        </div>

                                    </Dialog>
                                </div>
                            </React.Fragment>
                        ))
                    }
                </div>


            }
        </div>
    )
}

export default Posts
