package com.stars_back.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PmemberDibsReqDto {
    private List<MemberResDto> memberResDtos;
}
