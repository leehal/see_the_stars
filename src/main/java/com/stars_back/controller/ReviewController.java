package com.stars_back.controller;


import com.stars_back.dto.ImageDto;
import com.stars_back.dto.MemberResDto;
import com.stars_back.dto.PartyNameListDto;
import com.stars_back.dto.ReviewDto;
import com.stars_back.entity.Image;
import com.stars_back.entity.Member;
import com.stars_back.entity.Review;
import com.stars_back.entity.Travel;
import com.stars_back.service.MemberService;
import com.stars_back.service.ReviewService;
import io.swagger.models.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/review")
public class ReviewController {
    private final ReviewService reviewService;
    private final MemberService memberService;

    @GetMapping("/reviewlist")
    public ResponseEntity<List<ReviewDto>> reviewList(@RequestParam Long tno) {
        List<ReviewDto> list = reviewService.findByTno(tno);
        return ResponseEntity.ok(list);
    }

    @PostMapping("/reviewlist")
    public ResponseEntity<Boolean> createReview(@RequestBody ReviewDto review) {
        return ResponseEntity.ok(reviewService.saveReview(review));

    }
    @PostMapping("/saveimage")
    public ResponseEntity<Boolean> createImage(@RequestBody ReviewDto image){
        return ResponseEntity.ok(reviewService.saveImage(image));
    }


    @PostMapping("/delete/{id}")
    public ResponseEntity<Boolean> reviewDelete(@PathVariable Long id) {
        boolean result = reviewService.reviewDelete(id);
        return ResponseEntity.ok(result);
    }
    @PostMapping("/update")
    public ResponseEntity<Boolean> reviewUpdate(@RequestBody ReviewDto review) {
        //reviewService.saveImage(review);
        return ResponseEntity.ok(reviewService.updateReview(review));
    }

    @PostMapping("/deleteimage/{id}")
    public ResponseEntity<Boolean> imageDelete(@PathVariable Long id) {
        boolean result = reviewService.imageDelete(id);
        return ResponseEntity.ok(result);
    }
    @PostMapping("/upimgOne")
    public ResponseEntity<Boolean> imgOneUpdate(@RequestBody ImageDto imageDto){
        return ResponseEntity.ok(reviewService.updateOneImg(imageDto.getIno(), imageDto.getImage()));
    }
}
