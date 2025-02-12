package com.stars_back.service;

import com.stars_back.constant.Authority;
import com.stars_back.dto.ImageDto;
import com.stars_back.dto.ReviewDto;
import com.stars_back.dto.TravelDto;
import com.stars_back.entity.Image;
import com.stars_back.entity.Member;
import com.stars_back.entity.Review;
import com.stars_back.entity.Travel;
import com.stars_back.entity.Image;
import com.stars_back.repository.ImageRepository;
import com.stars_back.repository.MemberRepository;
import com.stars_back.repository.ReviewRepository;
import com.stars_back.repository.TravelRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ReviewService {
    private final MemberService memberService;
    private final ReviewRepository reviewRepository;
    private final TravelRepository travelRepository;
    private final ImageRepository imageRepository;
    private final MemberRepository memberRepository;

    //내가쓴 review 리스트 보여주기
    public List<ReviewDto> myReviewList() {
        Member member = memberService.memberIdFindMember();
        List<ReviewDto> list = new ArrayList<>();
        List<Review> reviewList = reviewRepository.findByRnick(member);
        for (Review e : reviewList) {
            List<Image> imageList = imageRepository.findByRno(e.getRno());
            List<ImageDto> imgList = new ArrayList<>();
            for (Image image : imageList) {
                imgList.add(ImageDto.of(image));
            }
            list.add(ReviewDto.of(e, imgList, member.getNick().equals(e.getRnick().getNick())));
        }
        return list;
    }

    //tno가 같은 review 리스트 보여주기
    public List<ReviewDto> findByTno(Long tno) {
        Member member = memberService.memberIdFindMember();
        List<ReviewDto> list = new ArrayList<>();
        List<Review> reviewList = reviewRepository.findByTravel_Tno(tno);
        for (Review e : reviewList) {
        List<Image> imageList = imageRepository.findByRno(e.getRno());
            List<ImageDto> imgList = new ArrayList<>();
            for (Image image : imageList) {
                imgList.add(ImageDto.of(image));
            }
            list.add(ReviewDto.of(e, imgList, member.getNick().equals(e.getRnick().getNick())));
        }
        return list;
    }
    public List<ReviewDto> reviewList(Long tno) {
        List<ReviewDto> list = new ArrayList<>();
        List<Review> reviewList = reviewRepository.findByTravel_Tno(tno);
        for (Review e : reviewList) {
            List<Image> imageList = imageRepository.findByRno(e.getRno());
            List<ImageDto> imgList = new ArrayList<>();
            for (Image image : imageList) {
                imgList.add(ImageDto.of(image));
            }
            list.add(ReviewDto.of1(e, imgList));
        }
        return list;
    }

    public boolean updateReview(ReviewDto dto) {
        log.warn("updateReview 실행! ! !");
        Member member = memberService.memberIdFindMember();
        Long tno = (long) dto.getTno();
        Travel travel = travelRepository.findById(tno).orElseThrow(
                () -> new RuntimeException("해당 여행지가 존재하지 않습니다."));
        boolean isTrue = false;
        Review review = Review.builder()
                .rno(dto.getRno())
                .rdate(LocalDateTime.now()) // 수정하면 수정한 시간으로 시간 바뀌나요??
                .title(dto.getTitle())
                .rcontent(dto.getRcontent())
                .rate(dto.getRate())
                .rnick(member)
                .travel(travel)
                .build();
        reviewRepository.save(review);
        saveImage(dto);
        isTrue = true;
        return isTrue;
    }

    public boolean UpdateImage(ImageDto img) {
        boolean isTrue = false;
        Long rno = (long) img.getRno();
        Optional<Review> reImg = reviewRepository.findById(rno);
        if (reImg.isPresent()) {
            Image image = Image.builder()
                    .ino(img.getIno())
                    .iimage(img.getImage())
                    .rno(reImg.get().getRno())
                    .build();
            imageRepository.save(image);
            isTrue = true;
        }
        return isTrue;
    }

//    public boolean deleteImage(ImageDto imageDto){
//
//    }


    // 리뷰 생성
    public boolean saveReview(ReviewDto reviewDto) {
        boolean isTrue = false;
        List<ImageDto> image = reviewDto.getImage();
        log.warn("img : {}", image.toString());
        Member member = memberService.memberIdFindMember();
        Long tno = (long) reviewDto.getTno();
        Optional<Travel> travel = travelRepository.findById(tno);
        List<Image> images = new ArrayList<>();
        if (travel.isPresent()) {
            Review review = Review.builder()
                    .title(reviewDto.getTitle())
                    .travel(travel.get())
                    .rcontent(reviewDto.getRcontent())
                    .rate(reviewDto.getRate())
                    .rdate(LocalDateTime.now())
                    .rnick(member)
                    .build();
            reviewRepository.save(review);
            log.warn("review의 rno : {} ", review.getRno());
            for (ImageDto i : image) {
                i.setRno(review.getRno());
                Image imageEntity = i.toEntity();
                images.add(imageEntity);
            }
            imageRepository.saveAll(images);
            isTrue = true;
        } else {
            isTrue = false;
        }
        return isTrue;
    }

    public boolean saveImage(ReviewDto reviewDto) {
        boolean isTrue = false;
        List<ImageDto> images = reviewDto.getImage();
        for (ImageDto imageDto : images) {
            imageRepository.save(
                    Image.builder()
                            .rno(reviewDto.getRno())
                            .iimage(imageDto.getImage())
                            .build()
            );
        }
        isTrue = true;

        return isTrue;
    }

    // 리뷰 삭제
    public boolean reviewDelete(Long id) {
        try {
            Review review = reviewRepository.findById(id).orElseThrow(
                    () -> new RuntimeException("해당 댓글이 존재하지 않습니다.")
            );
            reviewRepository.delete(review);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }

    public boolean imageDelete(Long id) {
        try {
            Image image = imageRepository.findById(id).orElseThrow(
                    () -> new RuntimeException("해당 이미지가 존재하지 않습니다.")
            );
            imageRepository.delete(image);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean updateOneImg(Long ino, String img) {
        try {
            Image image = imageRepository.findById(ino).orElseThrow(
                    () -> new RuntimeException("해당 이미지가 존재하지 않습니다.")
            );
            image.setIimage(img);
            imageRepository.save(image);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
