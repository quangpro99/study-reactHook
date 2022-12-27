import {useContext} from 'react'
import {ThemeContext} from './Todo/ThemeContext.js'

function Paragraph(){
    //theme nhận value từ ThemeContext từ cha là index.js
    const value = useContext(ThemeContext)

    return (
        <div>
            <h1 className={value.theme}>Hello anh em F8</h1>
        </div>
    )
}

export default Paragraph