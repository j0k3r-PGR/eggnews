package com.j0k3r.eggnews.models.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoticiaDtoSend {
    private Long id;
    
    private String titulo;

    private String texto;

    private String autor;

    private Date fechaAlta;

    private boolean alta;

}
