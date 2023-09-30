package com.j0k3r.eggnews.models;

import org.springframework.http.HttpStatus;

import lombok.Data;


@Data
public class ErrorResponse {
    private HttpStatus statusCode;
    private String message;
    private String details;

    public ErrorResponse(HttpStatus statusCode, String message) {
        this.statusCode = statusCode;
        this.message = message;
    }

}
