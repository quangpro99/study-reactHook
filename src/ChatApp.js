import {useRef, useLayoutEffect ,useEffect, useState, useCallback, memo, useMemo, useReducer } from "react";
import Content2 from "./Content2";
import TodoApp from "./Todo/index";
// useRef
// Lưu giá trị qua một tham chiếu bên ngoài
// funtion component

// useEffect
// 1.Cập nhật lại state
// 2.Cập nhật DOM
// 3.Render lại UI
// 4.Gọi cleanup nếu deps thay đổi
// 5.Gọi useEffect callback

// useLayoutEffect
// 1.Cập nhật lại state
// 2.Cập nhật DOM(mutated)
// 3.Gọi cleanup nếu deps thay đổi(sync)
// 4.Gọi useLayoutEffect callback(sync)
// 5.Render lại UI

//Ứng dụng thời gian thực

//memo react không phải là 1 hook
// 1.memo() -> higherOrder component
// 2.use useCallback() :  tránh tạo ra hàm mới một cách không cần thiết
    //- reference types
    //- react memo 

//useMemo tránh thực hiện logc không cần thiết

// 3 khái miệm hay sử dụng trong react
// Hook(gắn vào móc vào nên hay dùng trong function)
// HOC(tùy cách thiết kế có thể sử dụng với cả class và function component ôm bên ngoài funtion nên mới gọi là higher order
//dùng tránh việc 1 vài TH render không cần thiết, ví dụ trường hợp component cha với con, tronglusc sử dụng để render GD người
//dùng thì không cần chức năng của component con nhưng vì là con nên mỗi lần render cha đều render lại con thì import memo vho thằng con là xong)
//memo cũng sẽ check các props của con sau mỗi lần có bị thay đổi hay không, nếu không thay đổi thì không re-render
// Render props

//Khi nào sử dungj memo khi component nào đó sử dujng nhiều props và có quan hệ cha con là 1 ví dụ

const lessons = [
    {
        id: 1,
        name: "ReactJS là gì? Tại sao nên học ReactJS",
    },
    {
        id: 2,
        name: "SPA/MPA là gì",
    },
    {
        id: 3,
        name: "Arrow function",
    }
]

function ChatApp(){
    const[lessonId, setLessonId] = useState(1)

    useEffect(() =>{
        const handleComment = ({detail}) =>{
            console.log(detail)
        }

        window.addEventListener(`lesson-${lessonId}`, handleComment)
        //vấn đề dò rỉ dữ liệu lesson 1 và 2 vẫn còn tồn tại mặc dù chuyển sang 3
        //vi sao phai vay do VD lúc cmt nếu out ra(tức unmounted) thì consolog tại thời điểm đó cũng phải dừng tránh dùng tác vụ khác bị dò rỉ bộ nhớ do tác vụ trước
        return() =>{
            window.removeEventListener(`lesson-${lessonId}`, handleComment)
        }
    }, [lessonId])

    return(
        <div>
            <ul>
                {lessons.map(lesson => (
                    <li
                        key={lesson.id}
                        style={{
                            color: lessonId === lesson.id ?
                            'red':
                            '#333'
                        }}
                        onClick={() => {
                            setLessonId(lesson.id)}}
                    >
                        {lesson.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

//Bài tập dùng đuợc useLayoutEffect là đếm 1 số nếu lớn hơn 3 quay lại về 0

function Count(){
    const [count, setCount] = useState(0)

    //Giao dien bi chớp khi về 0 do lúc lên 3 xong lên 4 nó re render lại 1 lần nhận ra ms set về 0, chớp do này 2 giá trị 4 rồi về 0
    //có 4 thì nó cho ra DOM trc hiện 4 sau đó ms quay về useEffect ms trờ về 0
    useLayoutEffect(() => {
        if(count>3)
        setCount(0)
    }, [count])

    const handleRun = () => {
        setCount(count + 1)
    }

    return(
        <div>
            <p>
                {count}
            </p>
            <button onClick={handleRun}>
                Run
            </button>
        </div>
    )
}

//useRef
function App(){
    const[count, setCount] = useState(60)

    const ref = useRef()
    // console.log(ref.current)

    const timerId = useRef()

    const preCount = useRef()

    useEffect(()=>{
        preCount.current = count
    }, [count])

    const handleStart = () => {
        timerId.current = setInterval(() =>{
            // ref.current = Math.random()
            setCount(prevCount => prevCount -1)
        }, 1000)
        console.log('Start->', timerId.current)
    }

    const handleStop = () => {
        clearInterval(timerId.current)

        console.log('Stop->', timerId.current)
    }

    console.log(count, preCount.current)

    return(
        <div>
            <h1>{count}</h1>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
        </div>
    )

}

function App2(){
    const[count, setCount] = useState(0)

    // const handleIncrease = () =>{
    //     setCount(prevCount => prevCount + 1)
    // }

    //useCallback có 2 đối số đối số 1 là hàm, đối số 2 là mảng chứa các dependence hoạt động tương tụ usêfect
    //tham chiếu được truỳen vào không thay đổi nên không re render
    //callback được dùng thằng cha phải đi cùng memo thằng con tránh để re render
    const handleIncrease = useCallback(() =>{
        setCount(prevCount => prevCount + 1)
    }, [])

    return (
        <div style={{padding: '10px 30px'}}>
        {/* sau khi trả về giá trị đưa vào props memo ở props sẽ nhận giá trị liên tiếp tuy không có thay đổi
        xong hàm đưa vào tuy giống dạng những vẫn có sự khác biệt nên memo vẫn re render lại hàm khắc phục bằng useCallback */}
        <Content2 onIncrease={handleIncrease} />
        <h1>{count}</h1>
        </div>
    )
}

function useMemoApp(){
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [products, setProducts] = useState([])

    const nameRef = useRef()

    const handleSubmit =()=>{
        setProducts([...products, {
            name,
            price: Number(price)
        }])
        setName('')
        setPrice('')
        nameRef.current.focus()
    }

    console.log(typeof price)

    const total2 = products.reduce((result, product)=>{
        //Nhập input bị re render component không cần thiết , sửa dùng useMemo
        console.log('Tính toán lại')
        return result+product.price
    }, 0)

    const total = useMemo(()=>{
        const resluts = products.reduce((result, product)=>{
            //Nhập input bị re render component không cần thiết , sửa dùng useMemo
            console.log('Tính toán lại')
            return result+product.price
        }, 0)

        return resluts
    }, [products])

    return(
        <div style={{padding: '10px 30px'}}>
            <input 
                ref={nameRef}
                value={name} 
                placeholder='Enter name' 
                onChange={e=> setName(e.target.value)}
            />
            <br />
            <input 
                value={price} 
                placeholder='Enter price'
                onChange={e=> setPrice(e.target.value)}
            />
            <br />
            <button onClick={handleSubmit}>Add</button>
            <br />
            Total : {total}
            <ul>
                {products.map((product, index)=>(
                        <li key={index}>{product.name} - {product.price}</li>
                ))}
            </ul>
        </div>
    )
}

function useReducerApp(){
    //useReduce có thể làm được mọi việc mà useState làm, useState chỉ dùng với TH cơ bản
    //useState
    //1. Init state :0
    //2. ACtions: Up(state + 1)/ Down(State - 1)

    //useReducer
    //1. Init state :0
    //2. ACtions: Up(state + 1)/ Down(State - 1)
    // 3.Reducer
    // 4.dispatch(kích hoạt 1 action)

    //Init state
    const initState = 0

    //Actions
    const UP_ACTION = 'up'
    const DOWN_ACTION = 'down'

    //Reducer
    //Ví dụ state là up action thì trả ra state cho reduce là state + 1 khởi tạo từ initial state
    //action cuối nhận dc 1 là up 2 là downs
    //initial  owr đây bằng 0 là số thì luôn return ra số, mảng thì luôn return ra mảng
    const reducer = (state, action) => {
    console.log('reducer running')
        switch (action) {
            case UP_ACTION:
                return state + 1
            case DOWN_ACTION:
                return state - 1
            default:
                throw new Error('Invalid action')
                // return state
        }
    }

    // const [count, setCount] = useState(0)
    //Cách chạy khi chạy thì chạy useReducer trước nhận hàm reducer nhưng chưa gọi hàm ngay, nhận giá trị khởi tạo, return về array
    const[count, dispatch] = useReducer(reducer, initState)
    
    return(
        <div style={{padding: '0 20px'}}>
            <h1>{count}</h1>
            <button
                onClick={()=> dispatch(DOWN_ACTION)}
            >
                Down
            </button>
            <button
                onClick={()=> dispatch(UP_ACTION)}
            >
                Up
            </button>
        </div>
    )
}

function TodoIndex(){
    return <TodoApp />
}


export default TodoIndex