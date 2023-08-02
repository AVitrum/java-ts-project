package com.vitrum.api.repository;

import com.vitrum.api.entity.Anime;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AnimeRepository extends JpaRepository<Anime, Long> {
    Optional<Anime> findByName(String name);
}
