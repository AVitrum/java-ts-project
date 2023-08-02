package com.vitrum.api.service;

import com.vitrum.api.entity.Anime;
import com.vitrum.api.repository.AnimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class AnimeService {

    private final AnimeRepository animeRepository;

    @Autowired
    public AnimeService(AnimeRepository animeRepository) {
        this.animeRepository = animeRepository;
    }

    public Anime saveAnime(Anime anime) {
        return animeRepository.save(anime);
    }

    public List<Anime> getAllAnime() {
        return animeRepository.findAll();
    }

    public Anime getAnimeByName(String name) {
        Optional<Anime> animeOptional = animeRepository.findByName(name);
        return animeOptional.orElse(null);
    }

    public Anime getAnimeById(Long id) {
        Optional<Anime> animeOptional = animeRepository.findById(id);
        return animeOptional.orElse(null);
    }

    public void deleteAnimeByName(String name) throws IOException {
        Anime anime = getAnimeByName(name);
//        String pathArray = anime.getImagePath();
//        String fileName = pathArray.split("/")[4];
//        Path filePath = Paths.get(anime.getImagePath(), fileName);
        animeRepository.deleteById(anime.getId());
//        Files.delete(filePath);
    }

}