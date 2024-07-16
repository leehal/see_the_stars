package com.stars_back.dto;

import com.stars_back.constant.TF;
import com.stars_back.entity.Friend;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FriendDto {
    Long fno;
    String from;
    String to;
    String accept;
    TF tf;

    public static FriendDto of(Friend friend,TF tf){
        return FriendDto.builder()
                .fno(friend.getFno())
                .from(friend.getFrom().getNick())
                .to(friend.getTo().getNick())
                .accept(friend.getAccept().toString())
                .tf(tf)
                .build();
    }
}
