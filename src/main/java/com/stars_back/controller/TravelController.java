package com.stars_back.controller;

import com.stars_back.dto.ReviewDto;
import com.stars_back.dto.TravelDto;
import com.stars_back.service.ReviewService;
import com.stars_back.service.TravelService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/travel")
public class TravelController {
    public final TravelService travelService;
    public final ReviewService reviewService;

    @PostMapping("/travellist")
    public ResponseEntity<Map<String, Object>> travelList (@RequestBody Map<String, String> data){
        int page = Integer.parseInt(data.get("page"));
        log.info(String.valueOf(page));
        String category = data.get("category");
        String city = data.get("city");
        String name = data.get("name");
        Map<String, Object> result = travelService.selectAllTravels(page,category,city,name);
        return ResponseEntity.ok(result);
    }
    @GetMapping("/reviewlist")
    public ResponseEntity<List<ReviewDto>> reviewList(@RequestParam Long tno) {
        List<ReviewDto> list = reviewService.reviewList(tno);
        return ResponseEntity.ok(list);
    }
        @GetMapping("/travel")
    public ResponseEntity<TravelDto> travel(@RequestParam Long tno){
        return ResponseEntity.ok(travelService.travel(tno));
    }
}
