package com.naija_flight_tracker.backend.user;

import com.naija_flight_tracker.backend.common.ApiResponse;

import java.time.Instant;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public ApiResponse<List<UserResponse>> getUsers() {
        List<UserResponse> users = userRepository.findAll().stream()
                .map(UserResponse::from)
                .toList();
        return ApiResponse.success("Users fetched successfully", users);
    }

    @GetMapping("/{id}")
    public ApiResponse<UserResponse> getUserById(@PathVariable String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found: " + id));
        return ApiResponse.success("User fetched successfully", UserResponse.from(user));
    }

    // /me, not /{id} — the target user comes from the token (via Authentication),
    // never from something the client could put anything into. Otherwise any
    // logged-in user could PATCH /users/some-other-users-id and rename them.
    @PatchMapping("/me")
    public ApiResponse<UserResponse> updateCurrentUser(Authentication authentication,
                                                       @RequestBody UpdateUserRequest request) {
        String userId = authentication.getName();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found: " + userId));

        // PATCH semantics: only fields actually present in the request change.
        // A missing field in the JSON body deserializes to null here, so falling
        // back to the existing value is what keeps this a *partial* update.
        String newName = request.name() != null ? request.name() : user.getName();
        String newEmail = request.email() != null ? request.email() : user.getEmail();

        if (!newEmail.equals(user.getEmail()) && userRepository.existsByEmail(newEmail)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "An account with this email already exists");
        }

        // Snapshotted *before* save(): Hibernate's persistence context tracks
        // entities by id, so `user` (loaded above) and the entity save() ends up
        // merging into are actually the same managed object in memory — merging
        // our detached updatedUser onto it overwrites createdAt with null in
        // place too (createdAt is excluded from the generated UPDATE statement
        // itself, so the database value is untouched — this is purely an
        // in-memory quirk). Reading user.getCreatedAt() *after* save() would
        // already see the overwritten null; capturing the Instant now, while
        // it's still correct, sidesteps that entirely.
        Instant createdAt = user.getCreatedAt();

        // User has no setters (same immutable-entity style as every other entity
        // in this codebase) — building a new instance with the same id and saving
        // it works because save() sees a non-null, already-assigned id and treats
        // it as an update (merge) rather than a new insert.
        User updatedUser = new User(user.getId(), newEmail, user.getPassword(), newName);
        User savedUser = userRepository.save(updatedUser);

        // updatedAt is fine straight from savedUser: @UpdateTimestamp refreshes on
        // both inserts and updates, so the merged instance genuinely has it.
        UserResponse response = new UserResponse(
                savedUser.getId(), savedUser.getName(), createdAt, savedUser.getUpdatedAt());
        return ApiResponse.success("User updated successfully", response);
    }
}
