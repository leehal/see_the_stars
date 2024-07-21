import React from "react";
import styled from "styled-components";

const ModalStyle = styled.div`
  .modal {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .openModal {
    display: flex;
    align-items: center;
    justify-content: center;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-bg-show 0.8s;
  }

  section {
    width: 90%;
    max-width: 375px;
    margin: 0 auto;
    background-color: #f4eedd;
    /* 모서리 테두리를 다르게 주어 튀어나온 느낌 */
    border: 4px solid #000;
    border-left-width: 6px; /* 왼쪽 테두리 두껍게 */
    border-top-width: 6px; /* 위쪽 테두리 두껍게 */
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-show 0.3s;
    overflow: hidden;
    font-size: 20px;
    font-weight: bold;
    font-family: "VT323", monospace; /* 레트로 스타일 폰트 */
    box-shadow: 4px 8px 0 #000, 8px 8px 0 #000; /* 그림자 효과 추가 */

    header {
      position: relative;
      padding: 16px 64px 16px 16px;
      background-color: #bf00ff; /* 레트로 보라색 */
      font-weight: 900;

      color: #fff;
      border-bottom: solid #000 4px;
      /* border-bottom: 3px solid #ffcc00; 레트로 스타일 테두리 */
      button {
        position: absolute;
        cursor: pointer;
        top: 15px;
        right: 15px;
        width: 30px;
        font-size: 21px;
        font-weight: 700;
        text-align: center;
        color: #fff;
        background-color: transparent;
        border: none;
        &:hover {
        }
      }
    }
    main {
      padding: 16px;
      color: #333;
    }
    footer {
      padding: 12px 16px;
      text-align: right;
      button {
        padding: 6px 12px;
        color: #fff;
        background-color: #ff52ae; /* 레트로 핑크 */
        font-size: 13px;
        border: none;
        cursor: pointer;
      }
    }
  }

  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Modal2 = (props) => {
  const { open, confirm, close, type, header, children } = props;

  return (
    <ModalStyle>
      <div className={open ? "openModal modal" : "modal"}>
        {open && (
          <section>
            <header>
              {header}
              <button onClick={close}>&times;</button>
            </header>
            <main>{children}</main>
            {/* <footer>
              <Button onClick={confirm}>확인</Button>
              <Button onClick={close}>닫기</Button>
            </footer> */}
          </section>
        )}
      </div>
    </ModalStyle>
  );
};

export default Modal2;
