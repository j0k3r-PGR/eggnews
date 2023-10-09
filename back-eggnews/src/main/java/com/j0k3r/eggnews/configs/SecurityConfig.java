package com.j0k3r.eggnews.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.j0k3r.eggnews.jwt.JwtAuthenticationFilter;
import com.j0k3r.eggnews.jwt.JwtUtils;
import com.j0k3r.eggnews.jwt.JwtAuthorizationFilter;
import com.j0k3r.eggnews.services.UserDetailsServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthorizationFilter jwtAuthorizationFilter;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private JwtUtils jwtUtils;
    
    @Bean
    SecurityFilterChain securityFilter(HttpSecurity httpSecurity,AuthenticationManager authenticationManager) throws Exception{
        JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(jwtUtils);

        jwtAuthenticationFilter.setAuthenticationManager(authenticationManager);
        jwtAuthenticationFilter.setFilterProcessesUrl("/login");

        httpSecurity.csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> {
            auth.requestMatchers(AntPathRequestMatcher.antMatcher("/noticias/**")).permitAll();
            auth.requestMatchers(AntPathRequestMatcher.antMatcher("/admin/noticias")).hasAnyRole("ADMIN","EMPLEADO");
            auth.requestMatchers(AntPathRequestMatcher.antMatcher("/admin/user/**")).hasAnyRole("ADMIN");
            auth.anyRequest().authenticated();
        })
        .sessionManagement(session -> session
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        )
        .addFilter(jwtAuthenticationFilter)
        .addFilterBefore(jwtAuthorizationFilter,UsernamePasswordAuthenticationFilter.class);
        return httpSecurity.build();
    }

    @Bean
    AuthenticationManager authenticationManager(HttpSecurity httpHttpSecurity,PasswordEncoder passwordEncoder) throws Exception{
        return httpHttpSecurity
                .getSharedObject(AuthenticationManagerBuilder.class)
                .userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder)
            .and().build();
    }

    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
