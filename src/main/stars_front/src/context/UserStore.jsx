import { createContext, useEffect, useState } from "react";
export const UserContext = createContext(null); // UserContext 생성

const UserStore = (props) => {
  const [nick, setNick] = useState(
    localStorage.getItem("nick") || "닉네임을 입력해주세요."
  );
  const [refresh, setRefrsh] = useState(false);
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tno, setTno] = useState();
  const [reviewClicked, setReviewClicked] = useState(false);

  useEffect(() => {
    localStorage.setItem("nick", nick);
  }, [nick]);

  return (
    <UserContext.Provider
      value={{
        nick,
        setNick,
        refresh,
        setRefrsh,
        category,
        setCategory,
        currentPage,
        setCurrentPage,
        tno,
        setTno,
        reviewClicked,
        setReviewClicked,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserStore;
