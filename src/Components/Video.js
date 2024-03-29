import React from 'react'
import './Video.css'
import ReactDOM from 'react-dom';

function Video(props) {
    const handleClick = (e) => {
        e.preventDefault();
        e.target.muted = !e.target.muted;
        // if(e.target.muted){
        //     e.target.pause();
        // }else{
        //     e.target.play();
        // }
    }
    const handleScroll = (e) => {
        // ReactDOMNode ek tree hoga pura usme se node find kr rhe hai
        let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling;
        if(next){
            next.scrollIntoView();  
            e.target.muted = true;  //ab upr waali video ko mute krdo
        }
    }
    return (
        <>
        <video src={props.src} id={props.id} onEnded={handleScroll} className='videos-styling' onClick={handleClick} >
        </video>
        </>
    )
}

export default Video
