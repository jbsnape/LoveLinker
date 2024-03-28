import './main.css';
import React, {useRef, useEffect, useState} from 'react';


const MainPage =() => {
    const videoref = useRef(null);
    const photoref = useRef(null);
        const [hasPhoto, setHasPhoto] = useState(false);

        const getVideo = () =>{ 
            navigator.mediaDevices
            .getUserMedia({
                video: {width: 1920, heigth: 1080}})
            .then(stream => {
            let video =videoref.current
            video.srcObject = stream 
            video.play();
        })
        .catch(err =>
            console.error(err))
        }
    useEffect(() =>{
        getVideo();
    },[videoref])
    return (
      <div classname="main">
        <div classname="camera">
            <video ref= {videoref}></video>
            <button>Skip!</button>
        </div>
        <div classname={'result' + (hasPhoto ? 'hasPhoto' : '')}>
            <canvas ref={photoref}></canvas>
            <button>Close!</button>
        </div>
      </div>
    );
    }
export default MainPage;