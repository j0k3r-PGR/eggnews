package com.j0k3r.eggnews.jwt;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtils {
    
    @Value("${jwt.secret.key}")
    private String SECRET_KEY;

    @Value("${jwt.time.expiration}")
    private String TIME_SESSION_EXPIRATION;


    public String generatedAccesToken(String username){
        return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis()+Long.parseLong(TIME_SESSION_EXPIRATION)))
            .signWith(getSignatureKey(), SignatureAlgorithm.HS256)
            .compact();
    }

    public boolean isTokenValid(String token){
        try{
            Jwts.parserBuilder()
                .setSigningKey(getSignatureKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
            return true;
        }catch (Exception e){
            return false;
        }
    }

    public String getUserNameFromToken(String token){
        return getClaim(token, Claims::getSubject);
    }

    public <T> T getClaim(String token,Function<Claims,T> claimsFunction){
        Claims claims = extractAllClaims(token);
        return claimsFunction.apply(claims);
    }

    public Claims extractAllClaims(String token){
        return Jwts.parserBuilder()
                    .setSigningKey(getSignatureKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
    }

    public Key getSignatureKey(){
        byte[] keyByte = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyByte);
    }

}
