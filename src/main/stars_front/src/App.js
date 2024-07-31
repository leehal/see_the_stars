import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeaderFooter from "./headerFooter/HeaderFooter";
import Main from "./pages/main/Main";
import LoginPage from "./pages/login/LoginPage";
import Login from "./pages/login/Login";
import SignupPage from "./pages/login/SignupPage";
import Party from "./pages/party/Party";
import My from "./pages/my/My";
import Friend from "./pages/friend/Friend";
import UserStore from "./context/UserStore";
import { createGlobalStyle } from "styled-components";
import Goodtrip from "./pages/goodtrip/Goodtrip";
import FindPage from "./pages/login/FindPage";
import Navi from "./pages/goodtrip/navi";
import ChatList from "./pages/chat/ChatList";
import ChatRoomCreate from "./pages/chat/ChatRoomCreate";
import Chatting from "./pages/chat/Chatting";
import Reviews from "./pages/goodtrip/Review";
import MyPage from "./pages/my/MyPage";
import DaumPostPopup from "./component/DaumApi";
import ImageTest from "./pages/goodtrip/ImageTestView";
import ReviewFireBase from "./pages/goodtrip/ReviewFireBase";
import "./App.css";
import PartyChat from "./pages/party/PartyChat";
import TravelList from "./pages/goodtrip/TravelList";
import MFriend from "./pages/friend/MFriend";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing:border-box;
    font-family: "Silver";
  }

/* 스크롤바 전체 영역 */
::-webkit-scrollbar {
  width: 20px; /* 스크롤바의 너비 설정 */
  background-color: #222; /* 스크롤바의 배경색 설정 */
}

/* 스크롤바의 thumb */
::-webkit-scrollbar-thumb {
  background-color: #FFE188; /* thumb의 배경색 설정 */
  border: 4px solid #222; /* thumb의 테두리 설정 */
  border-radius: 4px; /* thumb의 모서리를 둥글게 설정 */
  box-shadow: inset 0 0 0 1px #000; /* thumb에 내부 그림자 설정 */
}

/* 스크롤바의 thumb가 호버될 때 */
::-webkit-scrollbar-thumb:hover {
  background-color: #ffaa00; /* thumb의 배경색을 호버될 때 변경 */
}

/* 스크롤바의 트랙 */
::-webkit-scrollbar-track {
  background-color: white; /* 트랙의 배경색 설정 */
  border: 4px solid #222; /* 트랙의 테두리 설정 */
}

/* 스크롤바의 버튼 */
::-webkit-scrollbar-button {
  background-color: #444; /* 버튼의 배경색 설정 */
  height: 20px;
  width: 20px;
}

/* 스크롤바의 위쪽 화살표 버튼 */
::-webkit-scrollbar-button:vertical:decrement {
  background: #444 url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white"><polygon points="12,8 16,12 8,12"/></svg>') no-repeat center;
}

/* 스크롤바의 아래쪽 화살표 버튼 */
::-webkit-scrollbar-button:vertical:increment {
  background: #444 url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white"><polygon points="12,16 8,12 16,12"/></svg>') no-repeat center;
}

/* 스크롤바의 왼쪽 화살표 버튼 */
::-webkit-scrollbar-button:horizontal:decrement {
  background: #444 url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white"><polygon points="8,12 12,8 12,16"/></svg>') no-repeat center;
}

/* 스크롤바의 오른쪽 화살표 버튼 */
::-webkit-scrollbar-button:horizontal:increment {
  background: #444 url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white"><polygon points="16,12 12,16 12,8"/></svg>') no-repeat center;
}

/* 스크롤바의 모서리 부분 */
::-webkit-scrollbar-corner {
  background-color: #555; /* 모서리 부분의 배경색 설정 */
}

`;

function App() {
  return (
    <>
      <GlobalStyle />
      <UserStore>
        <Router>
          <Routes>
            <Route path="/" element={<HeaderFooter />}>
              <Route index element={<Main />} />
              <Route path="login" element={<LoginPage />}>
                <Route index element={<Login />} />
                <Route path="find/:category" element={<FindPage />} />
                <Route path="signup" element={<SignupPage />} />
              </Route>
              <Route path="party" element={<Party />}>
                <Route path="chat/:roomId" element={<PartyChat />} />
              </Route>
              <Route path="my" element={<MyPage />} />
              <Route path="friend" element={<Friend />} />
              <Route path="mfriend" element={<MFriend />} />
              <Route path="goodtrip" element={<Goodtrip />}>
                <Route index element={<TravelList />} />
                <Route path="review/:tno" element={<Reviews />} />
              </Route>
              <Route path="navi" element={<Navi />} />
              <Route path="/Chat" element={<ChatList />} />
              <Route path="/Chat-create" element={<ChatRoomCreate />} />
              <Route path="/Chatting/:roomId" element={<Chatting />} />
              <Route path="review" element={<Reviews />} />
              <Route path="daum" element={<DaumPostPopup />} />
              <Route path="image" element={<ImageTest />} />
              <Route path="fire" element={<ReviewFireBase />} />
            </Route>
          </Routes>
        </Router>
      </UserStore>
    </>
  );
}

export default App;
