package com.stars_back.controller;
import com.stars_back.dto.FriendDto;
import com.stars_back.dto.MemberReqDto;
import com.stars_back.entity.Friend;
import com.stars_back.service.FriendService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/friend")
@RequiredArgsConstructor
public class FriendController {
    public final FriendService friendService;
    @PostMapping("/application")
    public ResponseEntity<Boolean> friendApplication(@RequestBody MemberReqDto memberReqDto) {

        return ResponseEntity.ok(friendService.friendApplication(memberReqDto.getNick()));
    }
    @GetMapping("/friendlist")
    public ResponseEntity<List<FriendDto>> friendList(){
        return ResponseEntity.ok(friendService.selectAllFriends());

    }
    @GetMapping("/friending")
    public ResponseEntity<List<FriendDto>> friending(){
        return ResponseEntity.ok(friendService.allicationFriends());

    }
    @GetMapping("/friendaccept")
    public ResponseEntity<List<FriendDto>> friendaccept(){
        return ResponseEntity.ok(friendService.acceptFriends());
    }
    @PostMapping("/friendagree")
    public ResponseEntity<Boolean> friendsAgree(@RequestBody MemberReqDto memberReqDto) {
        return ResponseEntity.ok(friendService.friendsAgree(memberReqDto.getNick()));
    }
    @GetMapping("/frienddelete")
    public ResponseEntity<Boolean> friendDelete(@RequestParam Long fno) {
        boolean result = friendService.friendDelete(fno);
        return ResponseEntity.ok(result);
    }

}

