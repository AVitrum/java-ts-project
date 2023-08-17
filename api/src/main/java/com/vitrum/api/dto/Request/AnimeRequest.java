package com.vitrum.api.dto.Request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnimeRequest {

    private String title;
    private String genres;
    private String link;
    private String recommendation;
    private double rating;
    private MultipartFile image;
}
