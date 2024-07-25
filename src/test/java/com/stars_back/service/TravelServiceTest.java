package com.stars_back.service;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@Slf4j
class TravelServiceTest {
    @Autowired
    private TravelService travelService;

    @Test
    @DisplayName("anjdla")
    public void selectTest (){
        Map<String,Object> maps =travelService.selectAllTravels(1,"","","독도");
        for (String s : maps.keySet()) {
            log.info(s);
        }
    }


}