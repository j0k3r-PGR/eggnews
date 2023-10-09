package com.j0k3r.eggnews.models.auth;


import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "usuarios")
public class UserEntity {
    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false,unique = true,length = 20)
    private String username;
    @Column(nullable = false)
    private String password;

    @ManyToMany(fetch = FetchType.EAGER, targetEntity = RoleEntity.class , cascade = CascadeType.PERSIST)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    @Column(nullable = false)
    private Set<RoleEntity> roles;
    private String token;
    @Column(nullable = false,length = 40)
    private String name;
    @Column(nullable = false,length = 40)
    private String surname;

    @Builder.Default
    private Boolean alta= true;
}
