import {useEffect, useImperativeHandlem, useRef} from 'react'
import Video from './Video'

function App(){
    //Nhận useImperativeHandle từ video
    const videoRef = useRef()

    useEffect(() => {
        console.log(videoRef.current)
    })

    useEffect(()=>{
        console.log(videoRef.current)
        //b1. tạo ra ref mặc định là videoRef trả về 1 object
        //b2. đưa object đó qua component Video 
        //b3. component Video thực ra đang là forwardRef bên Video.js, forwardRè lúc đó đang nhận đươjc giá trị Ref gọi video
        //b4. Gọi video và trả qua đối số 2 là ref sau dó truyền thằng vào video ref sẽ lấy tham chiếu của node video
    })


    const handlePlay = ()=>{
        videoRef.current.play()
    }

    const handlePause = ()=>{
        videoRef.current.pause()
    }

    return(
        <div>
            {/* Không thể truyền ref cho function component */}
            <Video ref = {videoRef}/>
            <button onClick={handlePlay}>Play</button>
            <button onClick={handlePause}>Pause</button>
        </div>
    )
}

export default App;