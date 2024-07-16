import React from "react";
import ImagesGrid from "./ImageTest";

const images = [
  { src: "https://news.kbs.co.kr/data/news/2021/01/13/20210113_sYskRy.jpg" },
  { src: "https://dimg.donga.com/wps/NEWS/IMAGE/2019/01/02/93531867.2.jpg" },
  { src: "https://news.kbs.co.kr/data/news/2021/01/13/20210113_sYskRy.jpg" },
  {
    src: "https://res.klook.com/image/upload/q_85/c_fill,w_1360/v1617101647/blog/edlhmuf96dpqcnodl9qf.webp",
  },
  {
    src: "https://news.kbs.co.kr/data/fckeditor/new/image/2021/05/07/314691620354493423.jpg",
  },
  { src: "https://dimg.donga.com/wps/NEWS/IMAGE/2019/01/02/93531867.2.jpg" },
  // 더 많은 이미지 추가
];

const ImageTest = () => {
  return (
    <div>
      <ImagesGrid images={images} />
    </div>
  );
};

export default ImageTest;
