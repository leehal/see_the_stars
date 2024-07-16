package com.stars_back.service;

import com.stars_back.dto.MemberReqDto;
import com.stars_back.entity.Member;
import com.stars_back.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

import static com.stars_back.security.SecurityUtil.getCurrentMemberId;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public Member memberIdFindMember(){
        String id = getCurrentMemberId();
        log.info("userId:{}",String.valueOf(id));
        Member mem = new Member();
        Optional<Member> member = memberRepository.findByMid(id);
        if(member.isPresent()){
            mem = member.get();
        }
        return mem;
    }
    public boolean checkPw(MemberReqDto memberReqDto){
        String pw1 = memberReqDto.getPwd();
        String pw2 = memberIdFindMember().getPwd();
        Boolean istrue = passwordEncoder.matches(pw1,pw2);
        return istrue;
    }
    public boolean editInfo(String info, int type){
        Member member = memberIdFindMember();
        switch (type){
            case 1:
                member.setImage(info);
                memberRepository.save(member);
                return true;
            case 2:
                member.setPwd(passwordEncoder.encode(info));
                memberRepository.save(member);
                return true;
            case 3:
                member.setNick(info);
                memberRepository.save(member);
                return true;
            case 4:
                member.setEmail(info);
                memberRepository.save(member);
                return true;
            default:
                return false;
        }
    }
}
