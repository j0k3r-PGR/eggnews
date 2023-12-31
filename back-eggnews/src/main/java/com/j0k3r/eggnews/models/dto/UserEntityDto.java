package com.j0k3r.eggnews.models.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntityDto {
    
    private String username;

    private String password;

    private String name;

    private String surname;

    private Long idRole;

    private Boolean alta;
}
