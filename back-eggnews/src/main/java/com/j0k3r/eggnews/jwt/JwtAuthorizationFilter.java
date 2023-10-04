package com.j0k3r.eggnews.jwt;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.j0k3r.eggnews.services.UserDetailsServiceImpl;

@Component
public class JwtAuthorizationFilter extends OncePerRequestFilter{

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {
        
        String tokenHeader = request.getHeader("Authorization");

        if (tokenHeader!= null && tokenHeader.startsWith("Bearer ")) {
            String token = tokenHeader.substring(7);
            

            if (jwtUtils.isTokenValid(token)) {
                String username = jwtUtils.getUserNameFromToken(token);

                UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(username);

                UsernamePasswordAuthenticationToken authenticationToken = 
                    new UsernamePasswordAuthenticationToken(username, null, userDetails.getAuthorities());

                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            } else {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
            }
        } 
        filterChain.doFilter(request,response);
    }
    
}
