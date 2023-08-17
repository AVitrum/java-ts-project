package com.vitrum.api.service;

import com.vitrum.api.dto.Request.AnimeRequest;
import com.vitrum.api.entity.Anime;
import com.vitrum.api.repository.AnimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class AnimeService {

    @Value("${upload.dir}")
    private String uploadDir;

    private final AnimeRepository animeRepository;

    @Autowired
    public AnimeService(AnimeRepository animeRepository) {
        this.animeRepository = animeRepository;
    }

    public Anime saveAnime(AnimeRequest animeRequest, Long userId) throws IOException {
        MultipartFile image = animeRequest.getImage();

        String fileName = image.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, fileName);
        Files.write(filePath, image.getBytes());

        Anime anime = new Anime();
        anime.setTitle(animeRequest.getTitle());
        anime.setRating(animeRequest.getRating());
        anime.setRecommendation(animeRequest.getRecommendation());
        anime.setGenres(animeRequest.getGenres());
        anime.setLink(animeRequest.getLink());
        anime.setImagePath("/images/" + fileName);
        anime.setUserId(userId);

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
