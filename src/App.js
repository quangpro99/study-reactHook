import { useState } from "react";
import { Routes, Route, Link } from 'react-router-dom'

import ChatApp from "./ChatApp";
import Content from "./Content";
import TimeFuntion from "./TimeFuntion";
import HomePage from "./Pages/Home";
import NewsPage from "./Pages/News";
import ContactPage from "./Pages/Contact";

import './App.css'

const orders = [100, 200, 300];

const gifts = ["CPU I9", "RAM 32GB RGB", "RGB KEYBOARD"];

const coures = [
  {
    id: 1,
    name: "HTML, CSS",
  },
  {
    id: 2,
    name: "Javascript",
  },
  {
    id: 3,
    name: "ReactJS",
  },
];

//bài 1: Ứng dụng đếm số, bắt đầu đếm từ số 1 mỗi lần ấn số tăng dần
//Sử dụng useState vì dữ liệu thay đổi dẫn tới giao diện thay đôi theo
function App() {
  // const total = orders.reduce((total, cur) => total + cur)

  // console.log(total)

  //Vấn đề là khi gọi lại thì nó vẫn tính lại giá trị total gây chậm không cần thiêts, cách giải quyết là truyền callback cho useState chứ không truyền giá trị total như ban đầu nữa

  const [counter, setCounter] = useState(() => {
    const total = orders.reduce((total, cur) => total + cur);

    console.log(total);
    //chỉ lấy giá trị return để làm initial state
    return total;
  });
  //Tạo ra hàm chưa gọi hàm, sau khi được gọi giả về gía trị mới cho counter vì render lại giao diện
  //Sau khi gọi setCounter thì react sẽ gọi lại function App thì nó đọc lại code từ trên xuống
  //Cứ mỗi lần ấn nút Increase thì nó sẽ gọi lại hàm App 1 lần nữa chỉ khác những lần sau nó không lấy giá trị khởi tạo mà lấy giá trị set ở lần trước
  const handleIncrease = () => {
    setCounter(counter + 1);
  };

  //Muốn renger setCounter 3 lần bằng cách dùng callBack
  //giá trị preState lần đầu là 1 lấy giá trị lần đầu + 1 gọi 3 lần thì sẽ render 3 lần
  //Tuy react lên lịch cho 3 lần gọi nhưng giả lại giá trị preState trc đó thì qua lần 1 thì preState bằng 2 r và tương tự lần kế
  const handleIncrease1 = () => {
    setCounter((preState) => preState + 1);
    setCounter((preState) => preState + 1);
    setCounter((preState) => preState + 1);
  };
  //Tuy vậy xong callback chỉ re render 1 lần
  console.log("re-render");

  return (
    <div className="App" style={{ padding: 20 }}>
      {/* Truyền counter vào children h1 */}
      <h1>{counter}</h1>
      {/* Gọi hàm handleIncrease để xử lý tăng giá trị phần tử counter */}
      <button onClick={handleIncrease1}>Increase</button>
    </div>
  );
}

function App1() {
  const [info, setInfo] = useState({
    name: "Nguyen Van A",
    age: 18,
    address: "Ha Noi",
  });
  //Thay doi gia tri
  const handleUpdate1 = () => {
    setInfo({
      bio: "Yeu mau hong ghet su gia doi",
    });
  };
  //them gia tri vao object
  const handleUpdate2 = () => {
    setInfo({
      //de them gia tri moi
      ...info,
      bio: "Yeu mau hong ghet su gia doi",
    });
  };
  //them gia tri vao object theo kieu callBack
  const handleUpdate3 = () => {
    setInfo((prev) => {
      //logic ..

      return {
        //de them gia tri moi
        ...prev,
        bio: "Yeu mau hong ghet su gia doi",
      };
    });
  };

  //Don gian hon callback
  const handleUpdate4 = () => {
    setInfo({
      //de them gia tri moi
      ...info,
      bio: "Yeu mau hong ghet su gia doi",
    });
  };
  return (
    <div className="App" style={{ padding: 20 }}>
      {/* Truyền counter vào children h1 , JSON.stringtyfy là một chuỗi*/}
      <h1>{JSON.stringify(info)}</h1>
      {/* Gọi hàm handleIncrease để xử lý tăng giá trị phần tử counter */}
      <button onClick={handleUpdate3}>Update</button>
    </div>
  );
}

//Math flor làm tròn xuống lấy được phần nguyên

function App2() {
  const [gift, setGift] = useState();

  const redomGift = () => {
    const index = Math.floor(Math.random() * gifts.length);

    setGift(gifts[index]);
  };

  return (
    <div style={{ padding: 32 }}>
      <h1>{gift || "Chưa có phần thưởng"}</h1>
      <button onClick={redomGift}>Lấy thuởng</button>
    </div>
  );
}

function App3() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    //CALL API
    console.log({
      name,
      email,
    });
  };

  console.log(name);

  //one way bilding là gõ vào giao diện chiều dữ liệu cũng thay đổi theo
  return (
    <div style={{ padding: 32 }}>
      {/* Mỗi lần gõ gọi onChange 1 lần, value name này nhận giá trị để thay đổi input nên sẽ là two way binding  */}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nhập tên"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Nhập email"
      />
      {/* Nếu chỉ có onCLick button thì giá trị name thay đổi nhưng giá trị giao diện trong input vẫn là giá trị cũ, cần two way binding */}
      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}

function App4() {
  const [checked, setChecked] = useState();

  console.log(checked);

  const handleSubmit = () => {
    //CALL API
    console.log({ id: checked });
  };

  //one way bilding là gõ vào giao diện chiều dữ liệu cũng thay đổi theo
  return (
    <div style={{ padding: 32 }}>
      {/* Mỗi lần gõ gọi onChange 1 lần, value name này nhận giá trị để thay đổi input nên sẽ là two way binding  */}
      {coures.map((coures) => (
        <div key={coures.id}>
          <input
            type="radio"
            //neu checked mà bằng id radio đang nhấn thì ms có check
            checked={checked === coures.id}
            onChange={() => setChecked(coures.id)}
          />
          {coures.name}
        </div>
      ))}
      {/* Nếu chỉ có onCLick button thì giá trị name thay đổi nhưng giá trị giao diện trong input vẫn là giá trị cũ, cần two way binding */}
      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}

function App5() {
  const [checked, setChecked] = useState([]);

  console.log(checked);

  const handleSubmit = () => {
    //CALL API
    console.log({ id: checked });
  };
  //Check nay la check mang, nhung neu chi lam den day thi chi nhan dc mang chua 1 id cuoi cung check
  const handldeCheckbox = (id) => {
    // setChecked([id])
    //check ntn sẽ bị lặp mảng và không bỏ dấu check dc
    // setChecked(pre => [...pre, id])
    setChecked((pre) => {
      const isChecked = checked.includes(id);
      if (isChecked) {
        //Uncheck
        //Dung filter loc bo cai dang duoc chon di, de lam cai bo check
        return checked.filter((item) => item !== id);
      } else {
        return [...pre, id];
      }
    });
  };

  //one way bilding là gõ vào giao diện chiều dữ liệu cũng thay đổi theo
  return (
    <div style={{ padding: 32 }}>
      {/* Mỗi lần gõ gọi onChange 1 lần, value name này nhận giá trị để thay đổi input nên sẽ là two way binding  */}
      {coures.map((coures) => (
        <div key={coures.id}>
          <input
            type="checkbox"
            //neu checked mà bằng id radio đang nhấn thì ms có check
            //icludes tra ve true neu check co chua id, nhung gap van de la moi lan check k bo dau tick dc, bi lap ket qua
            checked={checked.includes(coures.id)}
            //lay id cua thang dang check
            onChange={() => handldeCheckbox(coures.id)}
          />
          {coures.name}
        </div>
      ))}
      {/* Nếu chỉ có onCLick button thì giá trị name thay đổi nhưng giá trị giao diện trong input vẫn là giá trị cũ, cần two way binding */}
      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}

function App6() {
  //Bi loi vi dang la chuoi can chuyen ve lai thanh mang bang JSON.parse, neu de ngoai nay thi theo useState sẽ bị lãng phí không sử dụng vô lần chạy đầu tiên
  //const storageJobs = JSON.parse(localStorage.getItem('jobs'))

  // console.log(storageJobs)
  //To dolist

  const [job, setJob] = useState("");
  //nhưng ở trạng thái ban đầu la storage local chưa có j tức null đưa vô sẽ bị lỗi nên cần thêm điều kiện, dùng ?? vì nó chỉ lấy đằng sau khi đằng trc là null or undefine
  const [jobs, setJobs] = useState(() =>{
    const storageJobs = JSON.parse(localStorage.getItem('jobs'))

    return storageJobs ?? []
  });

  console.log(job)

  const handleSubmit =() =>{
    // setJobs(pre => [...pre, job])
    setJobs(pre => {
      const newJobs = [...pre, job]

      //Lưu vào localStorage
      const jsonJobs = JSON.stringify(newJobs)

      console.log(jsonJobs)

      localStorage.setItem('jobs', jsonJobs)

      return [...pre, job]
    })
    setJob('')

    console.log(jobs)
  }

  return (
    <div style={{ padding: 32 }}>
      <input value={job} onChange={(e) => setJob(e.target.value)} />
      <button onClick={handleSubmit}>Add</button>

      <ul>
        {console.log(jobs)}
        {jobs.map((job, index) => (
          <li key={index}>{job}</li>
        ))}
      </ul>
    </div>
  );
}


function App7(){
  //Mount và unMount hành động set true false ẩn hiện Content 
  const [show, setShow] = useState()


  return(
    <div style={{ padding: 32 }}>
    <button onClick={() => setShow(!show)}>Toogle</button>
    {show && <ChatApp />}
    </div>
  )
}

function RouterApp(){
  return(
    <div className="app">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/News">News</Link>
          </li>
          <li>
            <Link to="/Contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        {/* Nếu truyền không có ngoặc chỉ HomePage là react element bt
        còn có <HomePage /> thì là react component */}
        <Route path="/" element={<HomePage />}/>
        <Route path="/News" element={<NewsPage />}/>
        <Route path="/Contact" element={<ContactPage />}/>
      </Routes>
    </div>
  )
}

export default RouterApp;
