import React, {useState} from 'react'
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import MovieIcon from '@material-ui/icons/Movie'
import LinearProgress from '@mui/material/LinearProgress';
import {v4 as uuidv4} from 'uuid'   //npm install uuid
import { database , storage } from '../firebase';

function UploadFile(props) {
    console.log(props.user);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = async(file)=>{
        //Error handle
        if(file==null){
            setError('Please select a file first');
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }
        if(file.size/(1024*1024) > 100){    //if file size > 100mb, file size is in bytes
            setError('This video is very Large');
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }
        let uid = uuidv4()
        setLoading(true);
        const uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);
        uploadTask.on('state_cahnged', fn1, fn2, fn3);
        
        function fn1(snapshot){
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log(`upload is ${progress}% done`);
        }
        function fn2(err){
          setError(err);
          setTimeout(() => {
            setError('');
          }, 2000);
          setLoading(false);
          return;
        }
        function fn3(){
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                console.log(url);
                let obj = {
                    likes:[],
                    comments:[],
                    pid:uid,    
                    pUrl:url,
                    uName : props.user.fullname,
                    uProfile : props.user.profileUrl,
                    userId : props.user.userId,
                    createdAt : database.getTimeStamp()
                }
                //humne uid nahi di aur set waale method se add nahi kia hai to firecase ise khud uid provide krne waala hai & iss uid ko hum store bhi kraenge kuki aage post wgera me kaam aata hai
                database.posts.add(obj).then(async(ref)=>{    //jo obj abhi sotore kraya hai uska ref mila hai ghabrao mat
                    let res = await database.users.doc(props.user.userId).update({
                        postIds : props.user.postIds!=null ? [...props.user.postIds, ref.id] : [ref.id]
                    })
                }).then(()=>{
                    setLoading(false);
                }).catch((err)=>{
                    setError(err);
                    setTimeout(() => {
                        setError('');
                    }, 2000);
                    setLoading(false)
                })      
            })
            // setLoading(false);
        }

    }

    return (
        <div style={{marginTop:'5rem', marginBottom:"1rem"}}>
            {
                error!==''?<Alert severity="error">{error}!</Alert>:
                <>
                    <input type="file" accept='video/*' id='upload-input' style={{display:'none'}} onChange={(e)=>handleChange(e.target.files[0])}/>   
                    <label htmlFor="upload-input">
                        {/* here we use capital 'B' and we import it from material ui    */}
                        <Button
                            variant='outlined'
                            color='secondary'
                            component='span' //button input ki trah kaam krega
                            disabled={loading}
                        >
                            {/* @nbsp; provide some gap between icon and video */}
                            <MovieIcon/>&nbsp;Upload video
                        </Button>
                    </label>
                    {loading && <LinearProgress color="secondary" style={{marginTop:'3%'}} />
}
                </>
            }


        </div>
    )
}

export default UploadFile
