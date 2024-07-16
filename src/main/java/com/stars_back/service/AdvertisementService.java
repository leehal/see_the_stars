package com.stars_back.service;

import com.stars_back.constant.TF;
import com.stars_back.dto.AdvertisementDto;
import com.stars_back.dto.FriendDto;
import com.stars_back.dto.MemberReqDto;
import com.stars_back.dto.MemberResDto;
import com.stars_back.entity.Advertisement;
import com.stars_back.entity.Friend;
import com.stars_back.entity.Member;
import com.stars_back.repository.AdvertisementRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class AdvertisementService {
    private final AdvertisementRepository advertisementRepository;

    public Boolean adPublish(AdvertisementDto advertisementDto) {
        Advertisement advertisement = advertisementRepository.save(
                Advertisement.builder()
                        .aimage(advertisementDto.getAimage())
                        .alink(advertisementDto.getAlink())
                        .adate(advertisementDto.getAdate())
                        .build()
        );

        return advertisement != null;
    }

    public List<AdvertisementDto> adList(Long now) {
        List<AdvertisementDto> list = new ArrayList<>();
        List<Advertisement> advertisements = advertisementRepository.findByAdateGreaterThan(now);
        for (Advertisement advertisement : advertisements) {
            AdvertisementDto advertisementDto = AdvertisementDto.of(advertisement);
            list.add(advertisementDto);
        }
        return list;
    }
}
