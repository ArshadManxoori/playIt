import * as React from "react";
import { useContext , useState} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext ,Image} from 'pure-react-carousel';  //we add 'Image' manually //from google search pure react corousel
import 'pure-react-carousel/dist/react-carousel.es.css';    //from google search corousel
import { Button, CardActionArea, CardActions } from "@mui/material";
import { makeStyles } from "@mui/styles";   //this is not working so i use 'npm install @mui/styles'
import './Login.css' 
import Playit from '../assets/playit.jpeg';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Link, useHistory } from "react-router-dom";
import { textAlign } from "@mui/system";
import bg from '../assets/insta.png';
import img1 from '../assets/img1.jpg'
import img2 from '../assets/img2.jpg'
import img3 from '../assets/img3.jpg'
import img4 from '../assets/img4.jpg'
import img5 from '../assets/img5.jpg'
import { AuthContext } from "../Context/AuthContext";


export default function Login() {
  const store = useContext(AuthContext);
  console.log(store);
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
        },
        text2:{
            textAlign:'center'
        }
    })
    const classes = useStyles();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const {login} = useContext(AuthContext);

    const handleClick = async() => {
        try{
          setError('');
          setLoading(true);
          let res = await login(email, password);
          setLoading(false);
          history.push('/');  //ek baar dubara keh du !! 'localhost:3000/login' -> '/'
        }catch(err){
          setError(''); //remind! yeh error bhi wahi email waale block ke upr show hora hai
          setTimeout(() => {
            setError('');
          }, 2000);
        }
        setLoading(false);
    }
  return (
    <div className="loginWrapper">
      <div className="imgcar" style={{backgroundImage:'url('+bg+')', backgroundSize:'cover'}}>
          <div className="car">
            <CarouselProvider //use for sliding photos
                //these are the function which we used to do slide , https://www.npmjs.com/package/pure-react-carousel
                visibleSlides={1}
                totalSlides={5}
                // step={3}
                naturalSlideWidth={238} //according t picture
                naturalSlideHeight={423}
                hasMasterSpinner
                isPlaying={true}
                infinite={true}
                dragEnabled={false}
                touchEnabled={false}
                >
                <Slider>
                {/* <Slide index={0}>I am the first Slide.</Slide> 
                niche jo login img li hai unn sb ko css de kr set kra hai bhauu
                */}
                <Slide index={0}><Image src={img1}/></Slide>
                <Slide index={1}><Image src={img2}/></Slide>
                <Slide index={2}><Image src={img3}/></Slide>
                <Slide index={3}><Image src={img4}/></Slide>
                <Slide index={4}><Image src={img5}/></Slide>
                </Slider>
            </CarouselProvider>
          </div>
      </div>
      <div className="loginCard">
        <Card variant='outlined'>
            <div className="insta-logo">
                <img src={Playit} alt="" />
            </div>
            <CardContent>
              {error!='' && <Alert severity="error">{error}</Alert>}
              <TextField id="outlined-basic" label="Email" type={'email'} variant="outlined" fullWidth={true} margin="dense" size='small' value={email} onChange={(e)=>setEmail(e.target.value)}/>
              <TextField id="outlined-basic" label="Password" type={'password'} variant="outlined" fullWidth={true} margin="dense" size='small' value={password} onChange={(e)=>setPassword(e.target.value)}/>
              <Typography className={classes.text2}color="primary"variant="subtitle1">
                Forget Password ?
              </Typography>  
            </CardContent>
          <CardActions>
            <Button color="primary" fullWidth={true} variant='contained' onClick={handleClick} disabled={loading}>
              Login
            </Button>
          </CardActions>
        </Card>
        <Card variant="outlined" className={classes.card2}>
          <CardContent>
              <Typography className = {classes.text1} variant="subtitle1" >
                Dont't have an account ? <Link to="/signup" style={{textDecoration:'none'}}>Signup</Link>     
              </Typography>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
