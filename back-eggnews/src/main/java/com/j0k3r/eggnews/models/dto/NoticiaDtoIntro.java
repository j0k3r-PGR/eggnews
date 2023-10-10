package com.j0k3r.eggnews.models.dto;

import com.j0k3r.eggnews.models.Category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoticiaDtoIntro {
    private String titulo;
    
    private String texto;

    private String autor;

    private Category category;

    private String username;

}
