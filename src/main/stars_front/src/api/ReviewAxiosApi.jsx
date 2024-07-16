import AxiosInstance from "./AxiosInstance";

const Reivew = "/review";

const ReviewAxiosApi = {
  reviewList: async (tno) => {
    return await AxiosInstance.get(Reivew + `/reviewlist?tno=${tno}`);
  },
  submitReview: async (review) => {
    return await AxiosInstance.post(Reivew + `/reviewlist`, review);
  },
  deleteReview: async (id) => {
    return await AxiosInstance.post(Reivew + `/delete/${id}`);
  },
  updateReview: async (review) => {
    return await AxiosInstance.post(Reivew + `/update`, review);
  },
  updateImage: async (image) => {
    return await AxiosInstance.post(Reivew + `/updateimage`, image);
  },
  deleteImage: async (id) => {
    return await AxiosInstance.post(Reivew + `/deleteimage/${id}`);
  },
  saveImage: async (rno, image) => {
    const images = {
      rno: rno,
      image: image,
    };
    return await AxiosInstance.post(Reivew + `/saveimage`, images);
  },
  updateImgOne: async (ino, image) => {
    const images = {
      ino: ino,
      image: image,
    };
    return await AxiosInstance.post(Reivew + `/upimgOne`, images);
  },
};
export default ReviewAxiosApi;
