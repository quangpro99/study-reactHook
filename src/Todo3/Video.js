import {useRef, forwardRef , useImperativeHandle} from 'react'
// import {useRef} from 'react'
import video1 from '../videos/video-1.mp4'

function Video(props, ref){
    //Có properties và tham chiếu tới video trong DOM return    
    const videoRef = useRef()

    useImperativeHandle(ref, ()=>({
        play() {
            videoRef.current.play()
        },
        pause() {
            videoRef.current.pause()
        }
    }))

    return(
        <video 
            //Không dùng ref ở đây nữa vì xử lý ImperativeHandle rồi
            // ref={ref}
            ref={videoRef}
            src={video1} 
            width={280}
        />
    )
}

export default forwardRef(Video)