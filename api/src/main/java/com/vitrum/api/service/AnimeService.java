package com.vitrum.api.service;

import com.vitrum.api.entity.Anime;
import com.vitrum.api.repository.AnimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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

    public Anime getAnimeByTitle(String title) {
        Optional<Anime> animeOptional = animeRepository.findByTitle(title);
        return animeOptional.orElse(null);
    }


    public void deleteAnimeByTitle(String name) throws IOException {
        Anime anime = getAnimeByTitle(name);
        if (anime != null) {
            String imagePath = anime.getImagePath();
            Path imagePathToDelete = Paths.get(imagePath);

            if (Files.exists(imagePathToDelete)) {
                Files.delete(imagePathToDelete);
            }

            animeRepository.delete(anime);
        }
    }
}
