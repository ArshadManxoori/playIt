import * as React from "react";
import {useState, useContext}from 'react'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { makeStyles, useThemeVariants } from "@mui/styles";   //this is not working so i use 'npm install @mui/styles'
import './Signup.css' 
import Playit from '../assets/playit.jpeg';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Link , useHistory} from "react-router-dom";
import { textAlign } from "@mui/system";
import { SettingsInputAntennaTwoTone } from "@material-ui/icons";
import { AuthContext } from "../Context/AuthContext";
import { database, storage } from "../firebase";

export default function Signup() {
    const useStyles = makeStyles({
        text1:{
            color: 'grey',
            textAlign: 'center'
        },
        card2:{
            height: '5.5vh',
            marginTop: '2%',
            display: 'flex',
            alignItems:'center',
            justifyContent:'center'
        }

    })
    const classes = useStyles();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const {signup} = useContext(AuthContext);

    const handleClick = async() => {
      if(file==null){
        setError("Please upload profile picture first");
        setTimeout(() => {
          setError('');
        }, 2000);
        return;
      }

      try{
        setError('');
        setLoading(true);
        
        let userObj = await signup(email, password);
        let uid = userObj.user.uid;
        console.log("This is signup's uid ", uid);

        const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file);
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
                database.users.doc(uid).set({
                  email:email,
                  userId:uid,
                  fullname:name,
                  profileUrl:url,
                  createdAt:database.getTimeStamp()
                })
            })
            setLoading(false);
            history.push('/');  //abhi hum singup pr the ab ye '/' se change ho jaega aur feed waala aa jaega
        }
      }catch(err){
        setError(err);
        setTimeout(() => {
          setError('');
        }, 2000);
        return;
      }

    }


  return (
    <div className="signupWrapper">
      <div className="signupCard">
        <Card variant='outlined'>
            <div className="insta-logo">
                <img src={Playit} alt="" />
            </div>
            <CardContent>
              {/* <Typography gutterBottom variant="h5" component="div"> */}
              <Typography className = {classes.text1} variant="subtitle1">
                Sign up to see photos and videos from your friends
              </Typography>
              {/* {true && <Alert severity="error">This is an error alert — check it out!</Alert>} */}
              {error!='' && <Alert severity="error">{error}</Alert>}
              <TextField id="outlined-basic" label="Email" type={'email'} variant="outlined" fullWidth={true} margin="dense" size='small' value={email} onChange={(e)=>setEmail(e.target.value)}/>
              <TextField id="outlined-basic" label="Password" type={'password'} variant="outlined" fullWidth={true} margin="dense" size='small' value={password} onChange={(e)=>setPassword(e.target.value)}/>
              <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin="dense" size='small' value={name} onChange={(e)=>setName(e.target.value)}/>
              <Button size="small" color="secondary" variant ='outlined' fullWidth={true} margin='dense' startIcon={<CloudUploadIcon />} component="label">     {/* component='label' dene se upload button input tag ki trah kaam krne lga */}
                   Upload Profile Image
                   <input type="file" accept="image/*" hidden onChange={(e)=>setFile(e.target.files[0])}/>
              </Button>
            </CardContent>
          <CardActions>
            <Button color="primary" fullWidth={true} variant='contained' disabled={loading} onClick={handleClick}>
              Sign up
            </Button>
          </CardActions>
          <CardContent>
              <Typography className = {classes.text1} variant="subtitle1">
                By signing up, you agree to our Terms and Conditions and cookies policy.     
              </Typography>
          </CardContent>
        </Card>
        <Card variant="outlined" className={classes.card2}>
          <CardContent>
              <Typography className = {classes.text1} variant="subtitle1" >
                Having and account ? <Link to="/login" style={{textDecoration:'none'}}>Login</Link>     
              </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
