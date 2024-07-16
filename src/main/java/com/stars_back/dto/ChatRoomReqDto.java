package com.stars_back.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ChatRoomReqDto {
    //    방개설 요청
    private String nick; // 사실 필요 X
    private String name;
}
