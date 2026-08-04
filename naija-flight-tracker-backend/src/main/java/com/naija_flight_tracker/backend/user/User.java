package com.naija_flight_tracker.backend.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.time.Instant;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
public class User {

    @Id
    private String id; // plain assigned id (a UUID string generated in code, not by JPA)

    @Column(unique = true, nullable = false)
    private String email;

    // A BCrypt hash, never the plain-text password. Hashing happens where the
    // User is constructed (AuthController), not inside this class.
    @Column(nullable = false)
    private String password;

    private String name; // e.g. "Adaeze O."

    // Hibernate generates both of these itself — we never set them, not even in
    // the constructor. @CreationTimestamp only fires on the row's first INSERT
    // and is then excluded from every UPDATE statement Hibernate generates, so
    // it can't be accidentally overwritten later. @UpdateTimestamp fires on both
    // INSERT and every subsequent UPDATE. That matters here specifically because
    // User has no setters — updateCurrentUser() "updates" a user by building a
    // brand-new User instance and calling save(), which Hibernate treats as a
    // merge since the id is already assigned. Without this behavior, that new
    // instance's null createdAt could otherwise blow away the real one on merge.
    @CreationTimestamp
    private Instant createdAt;

    @UpdateTimestamp
    private Instant updatedAt;

    protected User() {
    }

    public User(String id, String email, String password, String name) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getName() {
        return name;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }
}
