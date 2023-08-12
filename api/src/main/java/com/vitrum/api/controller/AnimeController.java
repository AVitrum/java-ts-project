package com.vitrum.api.controller;

import com.vitrum.api.entity.Anime;
import com.vitrum.api.entity.User;
import com.vitrum.api.service.AnimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/anime")
@CrossOrigin("http://localhost:5173")
public class AnimeController {

    private final AnimeService animeService;

    @Autowired
    public AnimeController(AnimeService animeService) {
        this.animeService = animeService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Anime addAnime(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam("title") String title,
            @RequestParam("genres") String genres,
            @RequestParam("link") String link,
            @RequestParam("rating") double rating,
            @RequestParam("recommendation") String recommendation,
            @RequestParam("image") MultipartFile image
    ) throws IOException {
        String uploadDir = "/Users/almashiandrey/Developer/Projects/my-website/front/public/images";
        String fileName = image.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, fileName);
        Files.write(filePath, image.getBytes());

        Anime anime = new Anime();
        anime.setTitle(title);
        anime.setRating(rating);
        anime.setRecommendation(recommendation);
        anime.setGenres(genres);
        anime.setLink(link);
        anime.setImagePath("/images/" + fileName);

        Long userId = ((User) userDetails).getId();
        anime.setUserId(userId);


        return animeService.saveAnime(anime);
    }

    @GetMapping
    public List<Anime> getAllAnime() {
        return animeService.getAllAnime();
    }

    @GetMapping("/{title}")
    public ResponseEntity<?> getAnimeByName(@PathVariable("title") String title) {
        Anime anime = animeService.getAnimeByTitle(title);

        return ResponseEntity.status(HttpStatus.OK)
                .body(anime);
    }
    @DeleteMapping("/{title}")
    public ResponseEntity<?> deleteAnimeByName(@PathVariable("title") String title) throws IOException {
        animeService.deleteAnimeByTitle(title);
        return ResponseEntity.status(HttpStatus.OK).body("Deleted");
    }

    @GetMapping("/{title}/image")
    public ResponseEntity<?> getImageByName(@PathVariable("title") String title) {
        Anime anime = animeService.getAnimeByTitle(title);

        if (anime == null) {
            return ResponseEntity.notFound().build();
        }

        byte[] imageBytes;
        try {
            imageBytes = Files.readAllBytes(Paths.get(anime.getImagePath()));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to read image.");
        }

        ByteArrayResource resource = new ByteArrayResource(imageBytes);

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + anime.getImagePath() + "\"")
                .body(resource);
    }

}
