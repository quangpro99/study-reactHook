import { useEffect, useState } from "react";

const tabs = ["posts", "comments", "albums"];

function Content() {
  const [title, setTitle] = useState("");
  const [posts, setPosts] = useState([]);
  const [type, setType] = useState("posts");
  //false boolean quy ước ẩn hiện
  const [showGoToTop, setShowGoToTop] = useState(false);
  //innerWitdt lấy chiều ngang của của sổÏ
  const [width, setWidth] = useState(window.innerWidth)


  //useEffect(callback, [deps]), mảng đối số thứ 2 là sự phụ thuộc về mặt dữ liệu
  //đối số thứ 1 bắt buộc còn thứ 2 thì không bắt buộc, callback là hàm tự truyền vào, code trong đối số 1 để thực hiện các sideEffect
  //Vd 1: Thay đổi title nhưng tác động lên dc cả title của trình duyệt

  // 3 TH của useEffect :
  // useEffect(callback)
  //-Goi callback mỗi khi component re-render(it dung)
  //-Goi callback sau khi component thêm element vào DOM ,nghĩa là nó sẽ chạy div input trc thêm vào DOM rồi mới log ra mounted
  // useEffect(callback, [])
  //-Chi goi callback 1 lan sau khi component mount
  // useEffect(callback, [deps])
  //Callback sex dc gọi lại mỗi khi depen thay đổi( dùng toán tử === để nhận biết thay đổi), biến đằng sau sẽ để nhận biết sự thay đổi nếu thay đổi ms chạy lại callback

  //-----------------------------
  //Lưu ý:
  //1. Call back luôn được gọi sau khi component  mounted
  //TH1: Effect chỉ có mỗi callback
  //2.Clean up funtion luôn được gọi trước khi component unmounted

  useEffect(() => {
    //đây là side effect đưa vào trong use effect để đúng về mặt ý nghĩa, 2 nữa nếu để ngoài gặp logic phức tạp nó sẽ chặn việc render ra giao diện
    //viết trong useEffect thì nó sẽ chạy useEffect sau nó sẽ chạy giao diện user trước
    console.log("Title changed");
    console.log("mounted");
    document.title = title;
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then((response) => response.json())
      .then((posts) => {
        console.log(posts);
        //ly do in ra 2 lan dau tien
        setPosts(posts);
      });
    //re- render funtion Content goji callback useEffect tiếp tục call API lại setState xong lại rerender lại component tạo ra vòng lặp vô hạn
  }, [type]);
  //Việc có mảng rỗng sau biến useEffect TH1 thành TH2 và TH2 callback chỉ dc gọi 1 lần sau khi được mount tránh được vòng lặp vô hạn, nên nó sẽ không vào hàm useEffect nữa

  //DOMevent
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 200) {
        //Show
        setShowGoToTop(true)
      } else {
        //Hide
        setShowGoToTop(false)
      }
      //Nhưng sẽ setShơGoToTop liên tục gây rò rỉ bộ nhớ, cần cleanup funtion
      //setShowGoToTop(window.scrollY >= 200)
    };
    window.addEventListener("scroll", handleScroll);
    console.log("addEventListener")

    //cleanup funtion, dọn dẹp bộ nhớ khi unmounted component, lúc unmounted bộ nhớ sẽ dc dọn dẹp 
    return() =>{
        window.removeEventListener("scroll", handleScroll);
        console.log("removeEventListener")
    }
  }, []);

  useEffect(() =>{
    const handleResize = () =>{
        setWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize);
    //Cleanup funtion, gọi trc khi component unmounted
    return() =>{
        window.removeEventListener("resize", handleResize);
    }
  }, [])
  
  return (
    <div>
      <h1>
        {width}
      </h1>
      {tabs.map((tab) => (
        <button
          key={tab}
          //Neu type bằng tab thì thêm vô objeect rỗng còn nếu không bằng thì đặt thành object rỗng
          style={
            type === tab
              ? {
                  color: "#fff",
                  backgroundColor: "#333",
                }
              : {}
          }
          onClick={() => {
            setType(tab);
          }}
        >
          {tab}
        </button>
      ))}
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      {console.log("render")}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title || post.name}</li>
        ))}
      </ul>
      {showGoToTop && (
        <button
            style={{position: 'fixed',
            right: 20,
            bottom: 20,
            zIndex: 10,}}
        >
            Go to top
        </button>
      )}
    </div>
  );
}


export default Content;
