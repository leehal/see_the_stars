import { useEffect, useRef, useState } from "react";
import { FiMinusCircle } from "react-icons/fi";
import ReviewStyle from "./ReviewStyle";
import styled from "styled-components";
import ReviewAxiosApi from "../../api/ReviewAxiosApi";
import { storage } from "../../api/Firebase";
const Div = styled.div`
  position: relative;
`;

const ModalReviewImg = ({ img, setRefresh, refresh }) => {
  const inputFile = useRef(null);
  const [previewUrl, setPreviewUrl] = useState();

  const onClickInputFile = () => {
    inputFile.current.click();
  };

  const onChangFile = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
      const storageRef = storage.ref();
      const fileRef = storageRef.child(selectedFile.name);
      try {
        await fileRef.put(selectedFile);
        const url = await fileRef.getDownloadURL();
        console.log("저장경로 확인 : " + url);
        await ReviewAxiosApi.updateImgOne(img.ino, url);
      } catch (e) {
        console.log(e, "파이어베이스 오류");
      }
    }
  };

  const deleteImg = async () => {
    try {
      await ReviewAxiosApi.deleteImage(img.ino);
      setRefresh((pre) => !pre);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {}, [refresh]);

  return (
    <>
      <Div>
        <FiMinusCircle
          color="#584ec2"
          position="absolute"
          cursor="pointer"
          onClick={deleteImg}
        />
        <ReviewStyle.ReviewImage
          src={previewUrl || img.image}
          alt="Review"
          ino={img.ino}
          value={img.image}
          onClick={onClickInputFile}
        />
        <input type="file" onChange={onChangFile} ref={inputFile} hidden />
      </Div>
    </>
  );
};

export default ModalReviewImg;
