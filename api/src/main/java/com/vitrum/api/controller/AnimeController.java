package com.vitrum.api.controller;

import com.vitrum.api.dto.Request.AnimeRequest;
import com.vitrum.api.entity.Anime;
import com.vitrum.api.entity.User;
import com.vitrum.api.service.AnimeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/anime")
@CrossOrigin("http://localhost:5173")
@RequiredArgsConstructor
public class AnimeController {

    private final AnimeService animeService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Anime addAnime(
            @AuthenticationPrincipal UserDetails userDetails,
            @ModelAttribute AnimeRequest animeRequest
    ) throws IOException {
        Long userId = ((User) userDetails).getId();
        return animeService.saveAnime(animeRequest, userId);
    }

    @GetMapping
    public List<Anime> getAllAnime() {
        return animeService.getAllAnime();
    }

    @GetMapping("/{title}")
    public ResponseEntity<?> getAnimeByName(
            @PathVariable("title") String title
    ) {
        Anime anime = animeService.getAnimeByTitle(title);
        return ResponseEntity.status(HttpStatus.OK)
                .body(anime);
    }

    @DeleteMapping("/{title}")
    public ResponseEntity<?> deleteAnimeByName(
            @PathVariable("title") String title
    ) throws IOException {
        animeService.deleteAnimeByTitle(title);
        return ResponseEntity.status(HttpStatus.OK).body("Deleted");
    }
}
