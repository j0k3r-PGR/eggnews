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

import io.jsonwebtoken.io.IOException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter{
    
    private JwtUtils jwtUtils;

    public JwtAuthenticationFilter(JwtUtils jwtUtils){
        this.jwtUtils = jwtUtils;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response){
        UserEntity userEntity = null;
        String username = "";
        String password = "";
    
        try{
            userEntity = new ObjectMapper().readValue(request.getInputStream(),UserEntity.class);
            username = userEntity.getUsername();
            password = userEntity.getPassword();
        }catch(Exception e){
            throw new RuntimeException(e);
        }
        
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password);

        return getAuthenticationManager().authenticate(authToken);
    }


    @Override
    protected void successfulAuthentication(HttpServletRequest request, 
                                            HttpServletResponse response, 
                                            FilterChain chain, 
                                            Authentication authResult) throws IOException, ServletException, JsonProcessingException, java.io.IOException {
        User userDetails = (User) authResult.getPrincipal();

        String token = jwtUtils.generatedAccesToken(userDetails.getUsername());
        
        response.addHeader("Authorization", "Bearer " + token);
        
        Map<String,Object> httpResponse = new HashMap<>();

        httpResponse.put("token", token);
        httpResponse.put("message", "success login");
        httpResponse.put("username", userDetails.getUsername());

        response.getWriter().write(new ObjectMapper().writeValueAsString(httpResponse));
        response.setStatus(HttpStatus.OK.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().flush();

        super.successfulAuthentication(request, response, chain, authResult);

    }

}
