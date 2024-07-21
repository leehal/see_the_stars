import styled from "styled-components";

const ReviewStyle = {
  ReviewContainer: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: space-around;
    background-color: #f4eedd;
    padding: 20px 0;
    font-family: "VT323", monospace; /* 레트로 스타일 폰트 */
    @media screen and (max-width: 375px) {
      min-width: 375px;
    }
  `,

  ReviewBox: styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    border-radius: 10px;
    align-items: center;
    background-color: #aec6cf; /* 밝은 레트로 색상 */
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    border: 3px solid #000; /* 두꺼운 테두리 */

    @media screen and (max-width: 1024px) {
      width: 100%;
    }
  `,
  SubmitBox: styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
  `,

  ReviewCard: styled.div`
    width: 80%;
    background: #f4eedd;
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border: 9px solid #000; /* 레트로 핑크 테두리 */
    box-shadow: 6px 14px 0 #000, 14px 14px 0 #000; /* 그림자 효과 추가 */
  `,

  ReviewHeader: styled.div`
    display: flex;
    align-items: center;
    background-color: #663399; /* 레트로 보라색 */
    border-bottom: 6px solid black;
    width: 100%;
    padding: 2%;
    margin-bottom: 10px;
    color: #fff; /* 텍스트 색상 */
  `,

  ReviewTitleBox: styled.div`
    width: 80%;
    font-size: 1.8rem;
    display: flex;
    justify-content: center;
    margin-top: 10px;
    font-weight: bold;
    /* color: #ff3366; */
  `,

  ReviewBody: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  ReviewerAndRating: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
  `,

  ReviewTextBox: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 3% 0;
  `,

  ReviewText: styled.div`
    position: relative;
    width: 90%;
    font-size: 1.4rem;
    line-height: 1.4em;
    color: #333;
    border: 2px solid black;
    padding: 10px;
    font-weight: bold;
    padding-bottom: 20px;
  `,

  Reviewer: styled.div`
    font-weight: bold;
    font-size: 1.5em;
    color: #fff;
  `,

  Rating: styled.div`
    margin-left: 10px;
    font-size: 1.5em;
    color: #ffbb00;
  `,

  ReviewImage: styled.img`
    border-radius: 10px;
    width: 100%;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  `,

  ImageContainer: styled.div`
    width: 80%;
    height: 400px;
    display: flex;
    flex-wrap: wrap;
    bottom: 15px;
    margin-top: 20px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    &:hover {
      transform: 0.2s;
      scale: 1.1;
    }
    @media screen and (max-width: 1200px) {
      height: 300px;
    }
    @media screen and (max-width: 900px) {
      height: 230px;
    }
    @media screen and (max-width: 768px) {
      height: 150px;
    }
  `,

  ImageBox: styled.div`
    display: flex;
    width: 20%;
    height: 30%;
    justify-content: space-around;
  `,

  ExtraImagesOverlay: styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    font-size: 1.5em;
    border-radius: 10px;
  `,

  InputContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,

  TitleInput: styled.input`
    padding: 10px;
    border: 2px solid black;
    font-size: 1em;
  `,

  ContentInput: styled.textarea`
    padding: 10px;
    border: 2px solid black;
    font-size: 1em;
    height: 100px;
  `,

  SubmitButton: styled.button`
    padding: 10px;
    color: #fff;
    background-color: #ff3366; /* 레트로 보라색 */
    border: 4px solid black;
    font-size: 1em;
    cursor: pointer;
  `,
  DeleteYNButtonBox: styled.div`
    border: 3px black solid;
  `,

  DeleteYNButton: styled.button`
    cursor: pointer;
    width: 80px;
    background-color: #ff3366; /* 레트로 핑크 */
    color: #fff;
    padding: 5px;
    border: 3px black solid;
  `,

  InsertButton: styled.button`
    padding-top: 5px;
    width: 33%;
    color: #000;
    background-color: #f4eedd; /* 레트로 핑크 */
    font-weight: bold;
    font-size: 1.4em;
    border: 4px solid black;
    cursor: pointer;
    margin-top: 20px;
  `,

  DeleteContainer: styled.div`
    padding: 20px;
  `,

  Line: styled.div`
    width: 100%;
    height: 2px;
    background-color: black;
  `,

  ButtonDiv: styled.div`
    display: flex;
    justify-content: space-around;
    position: relative;
    margin: 2% 0;
  `,

  DeleteButton: styled.button`
    width: 33%;
    color: #fff;
    padding-top: 2px;
    background-color: #c33740;
    font-size: 1.5em;
    border: none;
    cursor: pointer;
    border: 4px solid black;
  `,

  UpdateButton: styled.button`
    width: 33%;
    color: #fff;
    padding-top: 2px;
    background-color: #2c475a;
    font-size: 1.5em;
    border: none;
    cursor: pointer;
    border: 4px solid black;
  `,

  Modal2Footer: styled.footer`
    display: flex;
    gap: 80px;
    justify-content: center;
  `,
};

export default ReviewStyle;
