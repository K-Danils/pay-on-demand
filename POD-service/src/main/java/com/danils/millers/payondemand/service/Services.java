package com.danils.millers.payondemand.service;

import java.util.List;

public interface Services<T> {

        List<T> findAll();

        T findById(String id);

        T save(T data);

        void deleteById(String id);

}
