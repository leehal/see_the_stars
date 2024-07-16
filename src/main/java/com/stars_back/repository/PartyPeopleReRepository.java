package com.stars_back.repository;

import com.stars_back.entity.Member;
import com.stars_back.entity.Party;
import com.stars_back.entity.PartyPeople;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PartyPeopleReRepository extends JpaRepository<PartyPeople,Long> {
    List<PartyPeople> findByPartyPeopleNick(Member nick);

    List<PartyPeople> findByPartyPeoplePno(Party pno);

    void deleteByPartyPeopleNickAndPartyPeoplePno(Member nick, Party pno);
}
