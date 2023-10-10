package com.j0k3r.eggnews.models;

import java.util.Date;

import com.j0k3r.eggnews.models.auth.UserEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "noticias")
public class Noticia {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(length = 200)
    private String titulo;

    @Column(length = 15000)
    private String texto;

    @ManyToOne
    private UserEntity user;

    @ManyToOne
    private Category category;

    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaAlta;

    private String autor;

    @Builder.Default
    private Boolean alta = true;

}
