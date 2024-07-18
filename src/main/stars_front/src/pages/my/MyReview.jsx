import styled from "styled-components";
import { FaHeart } from "react-icons/fa6";
import { useEffect, useState } from "react";
import TravelAxiosApi from "../../api/TravelAxiosApi";
import Logo from "../../image/Logo.jpg";
import HeartPixel from "../../image/New Piskel (2).gif";
import HeartUnClickPixel from "../../image/New Piskel (3).gif";
import MyAxiosApi from "../../api/MyAxiosApi";
import Common from "../../utils/Common";
import ReviewStyle from "../goodtrip/ReviewStyle";
import Modal from "../../component/Modal";
import ReviewFireBase from "../goodtrip/ReviewFireBase";
import Modal2 from "../goodtrip/Modal";
import Star from "../goodtrip/Rating";
import ImageModal from "../goodtrip/ImageModal";
import ModalReviewImg from "../goodtrip/ModalReviewImg";
import ReviewAxiosApi from "../../api/ReviewAxiosApi";
import { storage } from "../../api/Firebase";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  height: 90%;
  overflow-y: auto;
  flex-direction: column;
  align-items: center;
`;

const MyReview = ({ refresh, setRefresh }) => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [runMethod, setRunMethod] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deletemodalOpen, setDeletemodalOpen] = useState(false);
  const [reviewList, setReviewList] = useState([]);
  const [newReview, setNewReview] = useState({
    image: images,
    title: "",
    rcontent: "",
    rate: 0,
  });
  const [deleteY, setDeleteY] = useState();
  const [reviewUpdate, setReviewUpdate] = useState(false);
  const [files, setFiles] = useState([]);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);

  const closeModal = () => {
    setModalOpen(false);
    setReviewUpdate(false);
    setNewReview({
      image: [],
      title: "",
      rcontent: "",
      rate: 0,
    });
  };

  const openModal = () => setModalOpen(true);

  const clodeDeleteModal = () => setDeletemodalOpen(false);
  const openDeleteModal = (e) => {
    setDeletemodalOpen(true);
    setDeleteY(e);
  };

  const openUpdateModal = (review) => {
    setReviewUpdate(true);
    setNewReview({
      image: review.image,
      rno: review.rno,
      title: review.title,
      rcontent: review.rcontent,
      rate: review.rate,
    });
    setModalOpen(true);
  };

  const getReviewList = async () => {
    try {
      const rsp = await MyAxiosApi.myReviewList();
      console.log(rsp.data);
      setReviewList(rsp.data);
    } catch (e) {
      console.log(e);
    }
  };

  const InputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({ ...prevReview, [name]: value }));
  };

  const handleRateChange = (value) => {
    setNewReview((prevReview) => ({ ...prevReview, rate: value }));
  };

  const handleUploadComplete = (urls) => {
    setNewReview((prevReview) => ({
      ...prevReview,
      image: [...prevReview.image, ...urls.map((url) => ({ image: url }))],
    }));
  };

  const handleUploadComplete2 = (urls) => {
    setNewReview((prevReview) => ({
      ...prevReview,
      image: [...urls.map((url) => ({ image: url }))],
    }));
  };

  const submitReview = async () => {
    try {
      const urls = await handleUpload();
      if (reviewUpdate) {
        handleUploadComplete2(urls);
        console.log(urls);
      } else {
        handleUploadComplete(urls);
      }
      setRunMethod(true);
      console.log("submitReview 실행 : ", urls);
      setImages(urls);
    } catch (e) {
      console.log(e);
    }
  };

  const submitReview2 = async () => {
    try {
      await ReviewAxiosApi.submitReview(newReview);
      closeModal();
      getReviewList();
      setRunMethod(false);
    } catch (e) {
      console.log(e);
    }
  };

  const updateReview = async () => {
    try {
      await ReviewAxiosApi.updateReview(newReview);
      closeModal();
      getReviewList();
      setRunMethod(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (runMethod) {
      if (reviewUpdate) {
        console.log("1번 실행");
        updateReview();
      } else {
        console.log("1번 실행");
        submitReview2();
      }
    }
  }, [runMethod]);

  const openImageModal = (images) => {
    console.log(images); // 콘솔 로그 추가
    setIsImageModalOpen(true);
    setCurrentImages(images);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  const deleteReview = async (e) => {
    try {
      await ReviewAxiosApi.deleteReview(e);
      clodeDeleteModal();
      getReviewList();
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpload = async () => {
    const storageRef = storage.ref();
    const uploadPromises = files.map((file) => {
      const fileRef = storageRef.child(`${file.name}}`);
      return fileRef.put(file).then(async () => {
        const url = await fileRef.getDownloadURL();
        return url;
      });
    });

    try {
      const urls = await Promise.all(uploadPromises);
      return urls;
    } catch (error) {
      console.error("파이어베이스 오류", error);
      throw error;
    }
  };

  const onClickNavigate = (tno) => {
    navigate(`/goodtrip/review/${tno}`);
  };

  useEffect(() => {
    getReviewList();
  }, [refresh]);

  return (
    <>
      <Container>
        {reviewList.map((review, index) => (
          <ReviewStyle.ReviewCard key={index}>
            <ReviewStyle.ReviewHeader>
              <ReviewStyle.ReviewerAndRating
                style={{ cursor: `pointer` }}
                onClick={() => onClickNavigate(review.tno)}
              >
                <ReviewStyle.Reviewer>{review.tname} 후기</ReviewStyle.Reviewer>
                <ReviewStyle.Rating>
                  {"★".repeat(review.rate)}
                  {"☆".repeat(5 - review.rate)}
                </ReviewStyle.Rating>
              </ReviewStyle.ReviewerAndRating>
            </ReviewStyle.ReviewHeader>

            <ReviewStyle.ReviewBody>
              <ReviewStyle.ReviewTextBox>
                <ReviewStyle.ReviewText>
                  {review.rcontent}
                </ReviewStyle.ReviewText>
              </ReviewStyle.ReviewTextBox>
              {review.image.length > 1 && (
                <ReviewStyle.ImageContainer
                  onClick={() => openImageModal(review.image)}
                >
                  {review.image.slice(0, 1).map((e) => (
                    <ReviewStyle.ReviewImage
                      src={e.image || Logo}
                      alt="Review"
                      key={e.ino}
                    />
                  ))}
                  {review?.image.length > 1 && (
                    <ReviewStyle.ExtraImagesOverlay>
                      +{review?.image.length - 1} 장
                    </ReviewStyle.ExtraImagesOverlay>
                  )}
                </ReviewStyle.ImageContainer>
              )}
            </ReviewStyle.ReviewBody>

            {review.identify && (
              <ReviewStyle.ButtonDiv>
                <ReviewStyle.DeleteButton
                  onClick={() => openDeleteModal(review.rno)}
                >
                  삭제
                </ReviewStyle.DeleteButton>
                <ReviewStyle.UpdateButton
                  onClick={() => openUpdateModal(review)}
                >
                  수정
                </ReviewStyle.UpdateButton>
              </ReviewStyle.ButtonDiv>
            )}
          </ReviewStyle.ReviewCard>
        ))}
      </Container>
      <Modal
        open={modalOpen}
        close={closeModal}
        header={reviewUpdate ? "리뷰 수정" : "리뷰 작성"}
      >
        <ReviewFireBase getFiles={setFiles} />
        <ReviewStyle.InputContainer>
          <ReviewStyle.ImageBox>
            {newReview?.image.map(
              (
                e // 새로운 리뷰 이미지 렌더링
              ) => (
                <ModalReviewImg
                  img={e}
                  setRefresh={setRefresh}
                  refresh={refresh}
                />
              )
            )}
          </ReviewStyle.ImageBox>
          <ReviewStyle.TitleInput
            name="title"
            placeholder="리뷰 제목"
            value={newReview.title}
            onChange={InputChange}
          />
          <ReviewStyle.ContentInput
            name="rcontent"
            placeholder="리뷰 내용"
            value={newReview.rcontent}
            onChange={InputChange}
          />
          <Star value={newReview.rate} onChange={handleRateChange} />
          <ReviewStyle.SubmitButton onClick={submitReview}>
            {reviewUpdate ? "수정" : "제출"}
          </ReviewStyle.SubmitButton>
        </ReviewStyle.InputContainer>
      </Modal>
      <Modal2
        open={deletemodalOpen}
        close={clodeDeleteModal}
        header="리뷰 삭제"
      >
        <ReviewStyle.DeleteContainer>
          정말로 삭제하시겠습니까?
        </ReviewStyle.DeleteContainer>
        <ReviewStyle.Line></ReviewStyle.Line>
        <ReviewStyle.Modal2Footer>
          <></>
          <ReviewStyle.DeleteYNButtonBox>
            <ReviewStyle.DeleteYNButton onClick={() => deleteReview(deleteY)}>
              예
            </ReviewStyle.DeleteYNButton>
          </ReviewStyle.DeleteYNButtonBox>
          <ReviewStyle.DeleteYNButtonBox>
            <ReviewStyle.DeleteYNButton onClick={clodeDeleteModal}>
              아니오
            </ReviewStyle.DeleteYNButton>
          </ReviewStyle.DeleteYNButtonBox>
        </ReviewStyle.Modal2Footer>
      </Modal2>
      <ImageModal
        open={isImageModalOpen}
        images={currentImages}
        setIsImageModalOpen={setIsImageModalOpen}
      />
    </>
  );
};
export default MyReview;
