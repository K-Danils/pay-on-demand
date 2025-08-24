package com.danils.millers.payondemand.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFound extends RuntimeException{
    public ResourceNotFound(String resourceName, String accessor, String value) {
        super(String.format("%s not found with %s : %s", resourceName, accessor, value));
    }
}
