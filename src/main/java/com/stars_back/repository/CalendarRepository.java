package com.stars_back.repository;

import com.stars_back.entity.Calendar;
import com.stars_back.entity.Party;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface CalendarRepository extends JpaRepository<Calendar,Long> {
    List<Calendar> findByCaDateAndCalenderPno(LocalDateTime date, Party pno);

    List<Calendar> findByCalenderPno(Party pno);

}

