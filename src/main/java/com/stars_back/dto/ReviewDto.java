package com.stars_back.dto;

import com.stars_back.constant.Authority;
import com.stars_back.entity.Member;
import com.stars_back.entity.Review;
import com.stars_back.entity.Travel;
import com.stars_back.repository.TravelRepository;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class ReviewDto {
    private Long rno;
    private String title;
    private int tno;
    private String tname;
    private String tcategory;
    private String rcategory;
    private String rcontent;
    private LocalDateTime rdate;
    private String rate;
    private String rnick;
    private boolean identify;
    private List<ImageDto> image;

    public static ReviewDto of (Review review,List<ImageDto>image, Boolean identify) {
        return ReviewDto.builder()
                .rno(review.getRno())
                .title(review.getTitle())
                .tno(review.getTravel().getTno().intValue())
                .tname(review.getTravel().getTname())
                .tcategory(review.getTravel().getTcategory())
                .rcontent(review.getRcontent())
                .rdate(review.getRdate())
                .rate(review.getRate())
                .rnick(review.getRnick().getNick())
                .identify(identify)
                .image(image)
                .build();
    }
    public static ReviewDto of1 (Review review,List<ImageDto>image) {
        return ReviewDto.builder()
                .rno(review.getRno())
                .title(review.getTitle())
                .tno(review.getTravel().getTno().intValue())
                .tname(review.getTravel().getTname())
                .tcategory(review.getTravel().getTcategory())
                .rcontent(review.getRcontent())
                .rdate(review.getRdate())
                .rate(review.getRate())
                .rnick(review.getRnick().getNick())
                .image(image)
                .build();
    }
}
