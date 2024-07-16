package com.stars_back.repository;

import com.stars_back.entity.ChattingRoom;
import com.stars_back.entity.Party;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

public interface ChattingRoomRepository extends JpaRepository<ChattingRoom, String > {
    Optional<ChattingRoom> findByChatPno (Party pno);
}
