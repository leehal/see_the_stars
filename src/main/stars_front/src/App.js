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

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing:border-box;
    font-family: "Silver";
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
