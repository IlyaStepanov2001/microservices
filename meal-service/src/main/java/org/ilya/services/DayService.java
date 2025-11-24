package org.ilya.services;

import lombok.RequiredArgsConstructor;
import org.ilya.dto.DayDto;
import org.ilya.entities.Day;
import org.ilya.repositories.DayRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DayService {
    private final DayRepository dayRepository;

    public ResponseEntity<?> save(DayDto dayDto) {
        Day day = new Day();
        BeanUtils.copyProperties(dayDto, day);
        day = dayRepository.save(day);
        return new ResponseEntity<>(day, HttpStatus.CREATED);
    }
}
