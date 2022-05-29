import React, { useEffect } from 'react'
import vid1 from '../Videos/bewafa.mp4';
import vid2 from '../Videos/bum.mp4';
import vid3 from '../Videos/hawa.mp4';

function Ioa() {    

    const callback = (entries) => {
        entries.forEach((entry)=>{
            let ele = entry.target.childNodes[0];
            console.log(ele);
            ele.play().then(()=>{
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
    }, [])       

    return (
        <div className="video-containers">
            <div className="videos">
                <video src={vid1} muted="muted" style={{height:'85vh'}}/>
            </div>
            <div className="videos">
                <video src={vid2} muted="muted" style={{height:'85vh'}}/>
            </div>
            <div className="videos">
                <video src={vid3} muted="muted" style={{height:'85vh'}}/>
            </div>
        </div>
  )
}

export default Ioa
//intersection observer api -> The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.