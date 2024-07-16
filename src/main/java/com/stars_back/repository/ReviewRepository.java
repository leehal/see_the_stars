package com.stars_back.repository;

import com.stars_back.entity.Member;
import com.stars_back.entity.Review;
import com.stars_back.entity.Travel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review,Long> {
    List<Review> findByTravel_Tno (Long tno);
    List<Review> findByRnick(Member member);
}