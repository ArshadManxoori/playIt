import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import { database } from '../firebase';
import { CircularProgress } from '@mui/material'; //thodi derr loading show krega fir hatt jaega
import Navbar from './Navbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Like from './Like';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Dialog from '@mui/material/Dialog';    
import Card from '@mui/material/Card';
import Like2 from './Like2';
import AddComment from './AddComment';
import Comments from './Comments';
import './Profile.css';
import { RestaurantRounded } from '@material-ui/icons';

function Profile() {
  const {id} = useParams(); //it is userId
  const [posts, setPosts] = useState(null);
  const [userData, setUserData] = useState(null);

  //post.js se laye hai
  const [open, setOpen] = useState(null);    
  const handleClickOpen = (id) => {   
    setOpen(id);
  };
  const handleClose = () => {
    setOpen(null);
  };

  useEffect(()=>{
    database.users.doc(id).onSnapshot((snap)=>{   //hum normal user data ko as props bhi le skte the prr humne snapShot use kiya, kyuki  ek user agr ek se jayda jagah login h aur agr wo koi change perform krta hai to wo change dono jagah hona chahiye
      setUserData(snap.data());
    })
  },[id]);

  //ek file me ek se jyada uiseEffect lga skte hai, (class Component me nhi lga skte ye)
  useEffect(async() => {
    if(userData != null){
      let parr = [];
      for(let i = 0; i < userData?.postIds?.length; i++){
        let postData = await database.posts.doc(userData.postIds[i]).get();
        parr.push({...postData.data(),postId:postData.id});
      }
      setPosts(parr);
    }
  })

  return (
    <>
      {
        posts==null || userData==null ? <CircularProgress/> :
        <> 
          <Navbar userData={userData}/>
          <div className="spacer"></div>
          <div className="container">
            <div className="upper-part">
              <div className="profile-img">
                <img src={userData.profileUrl} />  
              </div>      
              <div className="info">
                  <Typography variant='h5'>
                    Email : {userData.email}    
                  </Typography>
                  <Typography variant='h6'>
                    Posts : {userData?.postIds?.length}   
                  </Typography>
              </div>      
            </div>
            <hr style={{marginTop:'3rem', marginBottom:'3rem'}}/>  {/* for horizontail line */}
            
            {/* from post.js */}
            <div className='profile-videos'>
                    {
                        posts.map((post,index)=>(   //NOTE: arrwo function me goll waale bracket use hue hai
                            <React.Fragment key={index}>
                                <div className='videos'>
                                    {/* {console.log(post.pUrl)} */}
                                    <video muted='muted' onClick={()=>handleClickOpen(post.pid)}>
                                        <source src={post.pUrl}/>
                                    </video>
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
                                                <video autoPlay={true} muted='muted' controls>
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
          </div>


        </>
      }
    
    </>
  )
}

export default Profile