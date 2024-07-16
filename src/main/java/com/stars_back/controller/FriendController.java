package com.stars_back.controller;
import com.stars_back.dto.FriendDto;
import com.stars_back.entity.Friend;
import com.stars_back.service.FriendService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/friend")
@RequiredArgsConstructor
public class FriendController {
    public final FriendService friendService;
    @GetMapping("/application")
    public ResponseEntity<Boolean> friendApplication(@RequestParam String nick) {
        return ResponseEntity.ok(friendService.friendApplication(nick));
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
    @GetMapping("/friendagree")
    public ResponseEntity<Boolean> friendsAgree(@RequestParam String nick) {
        return ResponseEntity.ok(friendService.friendsAgree(nick));
    }
    @GetMapping("/frienddelete")
    public ResponseEntity<Boolean> friendDelete(@RequestParam Long fno) {
        boolean result = friendService.friendDelete(fno);
        return ResponseEntity.ok(result);
    }

}

