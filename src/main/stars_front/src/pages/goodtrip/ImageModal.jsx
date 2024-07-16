import React, { useState } from "react";
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
    max-width: 800px;
    border-radius: 0.3rem;
    background-color: #fff;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-show 0.3s;
    overflow: hidden;
    position: relative;
    header {
      position: relative;
      button {
        position: absolute;
        cursor: pointer;
        right: 10px;
        font-size: 3rem;
        font-weight: 900;
        text-align: center;
        color: #999;
        background-color: transparent;
        border: none;
        z-index: 999;
        &:hover {
          color: #000;
        }
      }
    }
    main {
      border-bottom: 1px solid #dee2e6;
      border-top: 1px solid #dee2e6;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      img {
        width: 100%;
        height: auto;
        max-height: 80vh;
      }
    }
    footer {
      text-align: right;
      padding: 10px;
      button {
        color: #fff;
        background-color: #584ec2;
        border-radius: 5px;
        font-size: 13px;
        padding: 6px 12px;
        border: none;
        cursor: pointer;
        &:hover {
          background-color: #2f21c7;
        }
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
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: #fff;
  font-size: 2em;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;

  &:focus {
    outline: none;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const PrevButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`;

const ImageModal = (props) => {
  const { open, setIsImageModalOpen, header, images } = props;
  const [currentIndex, setCurrentIndex] = useState(0);

  const close = () => {
    setIsImageModalOpen(false);
    setCurrentIndex(0);
  };
  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <ModalStyle onClick={close}>
      <div className={open ? "openModal modal" : "modal"}>
        {open && (
          <section>
            <header>
              {header}
              <button onClick={close}>&times;</button>
            </header>
            <main>
              <PrevButton onClick={(e) => handlePrev(e)}>&lsaquo;</PrevButton>
              <img src={images[currentIndex].image} alt="Review" />
              <NextButton onClick={(e) => handleNext(e)}>&rsaquo;</NextButton>
            </main>
          </section>
        )}
      </div>
    </ModalStyle>
  );
};

export default ImageModal;
