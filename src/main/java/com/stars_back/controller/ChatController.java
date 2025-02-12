package com.stars_back.controller;

import com.stars_back.dto.ChatMessageDto;
import com.stars_back.dto.ChatRoomReqDto;
import com.stars_back.dto.ChatRoomResDto;
import com.stars_back.entity.Chatting;
import com.stars_back.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/chat")
// 사용자가 WebSocket 연결을 설정하기 전에 필요한 데이터를 가져오거나, 특정 작업을 수행하기 위해 사용될 수 있습니다.
public class ChatController {
    private final ChatService chatService;
    //    @PostMapping("/new")
//    public ResponseEntity<String> createRoom(@RequestBody ChatRoomReqDto chatRoomReqDTO) {
//        log.warn("chatRoomDto : {}", chatRoomReqDTO);
//        ChatRoomResDto room = chatService.createRoom(chatRoomReqDTO.getName());
//        return new ResponseEntity<>(room.getRoomId(), HttpStatus.OK);
//    }
    @GetMapping("/list")
    public ResponseEntity<List<ChatRoomResDto>> getRooms() {
        return ResponseEntity.ok(chatService.findAllRoom());
    }
    // 방 정보 가져오기
    @GetMapping("/room/{roomId}")
    public ResponseEntity<ChatRoomResDto> findRoomById(@PathVariable String roomId) {
        return ResponseEntity.ok(chatService.findRoomById(roomId));
    }
    // 메세지 저장하기
    @PostMapping("/message")
    public ResponseEntity<Void> saveMessage(@RequestBody ChatMessageDto chatMessageDTO) {
        chatService.saveMessage(chatMessageDTO.getRoomId(), chatMessageDTO.getSender(), chatMessageDTO.getMessage());
        return new ResponseEntity<>(HttpStatus.OK);
    }
    //     세션 수 가져오기
    @GetMapping("/room/{roomId}/sessioncount")
    public ResponseEntity<Integer> getSessionCount(@PathVariable String roomId) {
        return ResponseEntity.ok(chatService.getSessionCount(roomId));
    }
    //     이전 메세지 가져오기
    @GetMapping("/message/{roomId}")
    public ResponseEntity<List<ChatMessageDto>> getRecentMessages(@PathVariable String roomId) {
        List<ChatMessageDto> list = new LinkedList<>();
        List<Chatting> chattingList= chatService.getRecentMessages(roomId);
        for (Chatting chat : chattingList) {
            ChatMessageDto dto = ChatMessageDto.builder()
                    .message(chat.getMessage())
                    .roomId(chat.getChatRoom().getRoomId())
                    .sender(chat.getSender().getNick())
                    .image(chat.getSender().getImage())
                    .sentAt(chat.getSentAt())
                    .build();
            list.add(dto);
        }
        return ResponseEntity.ok(list);
    }
}