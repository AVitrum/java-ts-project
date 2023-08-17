package com.vitrum.api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "anime")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Anime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;
    private String recommendation;
    private String genres;
    private String link;

    @Column(nullable = false, name = "user_id")
    private Long userId;

    @Column(nullable = false)
    private double rating;

    @Column(nullable = false, name = "image_path")
    private String imagePath;
}
