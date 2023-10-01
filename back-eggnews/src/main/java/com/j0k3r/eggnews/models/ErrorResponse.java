package com.j0k3r.eggnews.models;

import org.springframework.http.HttpStatus;

import lombok.Data;


@Data
public class ErrorResponse {
    private HttpStatus statusCode;
    private String statusText;
    private String details;

    public ErrorResponse(HttpStatus statusCode, String statusText) {
        this.statusCode = statusCode;
        this.statusText = statusText;
    }

}
