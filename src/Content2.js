import { memo } from "react";

function Content2({onIncrease}){
    console.log("re render");

    return(
        <>
            <h2>Hello ae F8</h2>
            <button onClick={onIncrease}>Click me</button>
        </>
    )
}

export default memo(Content2)