import { useEffect, useState } from "react";

function TimeFuntion() {
    //Cleanup luôn đuợc gọi trước khi component unmounted
    //Cleanup funtion luôn được gọi trước khi callback được gọi trần lần mounted
    const [countdown, setCountdown] = useState(180);
    //ưsng dụng chạy ngược dùng setInterval
    //Nêus không dùng interval mà dùng setTimeout thì chỉ chạy 1 lần 179 là dừng

    useEffect(() => {
        const timerID = setInterval(() => {
            setCountdown(preState => preState - 1);
            console.log(countdown);
        }, 1000)

        //Cách để unmounted Interval tránh dò rỉ bộ nhớ
        return  () => clearInterval(timerID)
    }, [])

    return(
        <div>
            <h1>{countdown}</h1>
        </div>
    )
}

function TimeFuntion2() {
    const [count, setCount] = useState(1);

    useEffect(() => {
        console.log(`Mounted or re-render lần ${count}`)
        //Cách để unmounted Interval tránh dò rỉ bộ nhớ
        return  () => {
            //Trước khi chạy lần callback mới thì đi dọn dẹp lại lần trước đó
            console.log(`Cleaned up lần ${count}`)
        }
    }, [count])

    return(
        <div>
            <h1>{count}</h1>
            <button onClick={() => setCount(count+1)}>Click me</button>
        </div>
    )
}

function TimeFuntion3() {
    const[avatar, setAvatar] = useState() 

    useEffect(() => {
        //Cleanup
        return  () => {
            //Cách để unmounted Interval tránh dò rỉ bộ nhớ
            //xoa anh trong bo nho, cho avatar vo de k bi loi
            //vi lan dau useState dang rong
            avatar && URL.revokeObjectURL(avatar.preview)
        }
    }, [avatar])

    const handlePreviewAvatar =(e) =>{
        const file = e.target.files[0]

        //file la object nen co he lay preview de dat tem
        file.preview = URL.createObjectURL(file)


        setAvatar(file)
    }

    return(
        <div>
            <input 
                type = "file"
                onChange = {handlePreviewAvatar}
            />
            {avatar && (
                <img 
                    //Van de khi thay anh thi anh van nam trong bo nho nen dung cleanup
                    src = {avatar.preview}
                    alt = "avatar"
                    width="80%"
                />
            )}
        </div>
    )
}

export default TimeFuntion3