package com.stars_back.repository;

import com.stars_back.constant.TF;
import com.stars_back.entity.Friend;
import com.stars_back.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FriendRepository extends JpaRepository<Friend,Long> {
    List<Friend> findByFrom(Member member);
    List<Friend> findByTo(Member member);
    Optional<Friend> findByFromAndTo(Member nick,Member member);
    List<Friend> findByToAndAccept(Member member, TF accept);
    List<Friend> findByFromAndAccept(Member member,TF accept);
}
