package com.j0k3r.eggnews.jwt;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.j0k3r.eggnews.models.auth.UserEntity;
import com.j0k3r.eggnews.utils.UserUtil;

import io.jsonwebtoken.io.IOException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Optional;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private JwtUtils jwtUtils;

    public JwtAuthenticationFilter(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
        UserEntity userEntity = null;
        String username = "";
        String password = "";

        try {
            userEntity = new ObjectMapper().readValue(request.getInputStream(), UserEntity.class);
            username = userEntity.getUsername();
            password = userEntity.getPassword();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password);

        return getAuthenticationManager().authenticate(authToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain,
            Authentication authResult)
            throws IOException, ServletException, JsonProcessingException, java.io.IOException {
        User userDetails = (User) authResult.getPrincipal();

        Optional<UserEntity> userOptional = UserUtil.findUser(userDetails.getUsername());

        if (userOptional.isPresent()) {
            String token = jwtUtils.generatedAccesToken(userDetails.getUsername());

            UserEntity userEntity = userOptional.get();

            if (userEntity.getAlta()) {

                response.addHeader("Authorization", "Bearer " + token);

                Map<String, Object> httpResponse = new HashMap<>();

                httpResponse.put("token", token);
                httpResponse.put("message", "success login");
                httpResponse.put("username", userDetails.getUsername());
                httpResponse.put("name", userEntity.getName());
                httpResponse.put("surname", userEntity.getSurname());
                httpResponse.put("roles", userEntity.getRoles().stream().map(e -> e.getName()).toList());
                httpResponse.put("id", userEntity.getId());
                httpResponse.put("idRole", userEntity.getIdRole());

                response.getWriter().write(new ObjectMapper().writeValueAsString(httpResponse));
                response.setStatus(HttpStatus.OK.value());
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                response.getWriter().flush();
            }

        }

        super.successfulAuthentication(request, response, chain, authResult);

    }

}
