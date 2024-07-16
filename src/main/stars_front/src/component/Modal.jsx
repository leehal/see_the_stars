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
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-bg-show 0.8s;
  }

  section {
    width: 90%;
    max-width: 450px;
    margin: 0 auto;
    background-color: #f0ede6;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    border: 4px solid #000;
    border-left-width: 6px; /* 왼쪽 테두리 두껍게 */
    border-top-width: 6px; /* 위쪽 테두리 두껍게 */
    animation: modal-show 0.3s;
    overflow: hidden;
    font-size: 20px;
    font-weight: bold;
    box-shadow: 4px 8px 0 #000, 8px 8px 0 #000; /* 그림자 효과 추가 */

    header {
      position: relative;
      padding: 16px 64px 16px 16px;
      background-color: #bf00ff; /* 레트로 보라색 */
      font-size: 1.3rem;
      color: #fff;
      border-bottom: solid #000 4px;
      button {
        position: absolute;
        cursor: pointer;
        top: 12px;
        right: 15px;
        width: 30px;
        font-size: 40px;
        font-weight: 700;
        text-align: center;
        color: #fff;
        background-color: transparent;
        border: none;
        &:hover {
          color: #000;
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
        border: 3px solid black;
        font-size: 13px;
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

const Button = styled.button`
  outline: none;
  cursor: pointer;
  margin-right: 10px;
  border: 0;
  width: 60px;
`;

const Modal = (props) => {
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
            <footer>{type && <Button onClick={confirm}>확인</Button>}</footer>
          </section>
        )}
      </div>
    </ModalStyle>
  );
};
export default Modal;
