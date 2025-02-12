package com.stars_back.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PartyRequestDto {
    private List<String> nick;
    private String pname;
    private Long pno;
}
