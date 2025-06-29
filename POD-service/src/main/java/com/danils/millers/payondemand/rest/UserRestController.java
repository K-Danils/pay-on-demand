package com.danils.millers.payondemand.rest;

import com.danils.millers.payondemand.entities.User;
import com.danils.millers.payondemand.service.PaymentRequestRepository;
import com.danils.millers.payondemand.service.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import utils.PatchUtility;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserRestController {
    private UserRepository userRepository;

    public UserRestController(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @GetMapping("/users")
    public List<User> getUsers(){
        return userRepository.findAll();
    }

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable String id){
        return userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    @PostMapping("/users")
    public User addUser(@RequestBody User user) {
        user.setId(null);
        return userRepository.save(user);
    }

    @PutMapping("/users")
    public User updateUser(@RequestBody User user) {
        User foundUser = userRepository.findById(user.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        return userRepository.save(foundUser);
    }

    @PatchMapping("/users")
    public ResponseEntity<User> patchUser(@PathVariable String id, @RequestBody Map<String, Object> payload){
        User foundUser = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        User patchedUser = userRepository
                .save(PatchUtility.applyPatchToEntity(foundUser, payload, User.class));

        return ResponseEntity.ok(patchedUser);
    }

    @DeleteMapping("/users/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable String id) {
        if (!userRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }

        userRepository.deleteById(id);
    }
}
