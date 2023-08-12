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

    @Column(nullable = false)
    private String recommendation;

//    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String genres;

    @Column(nullable = false)
    private String link;

    @Column(name = "user_id")
    private Long userId;

    @Column(nullable = false)
    private double rating;

    @Column(name = "image_path")
    private String imagePath;
}
