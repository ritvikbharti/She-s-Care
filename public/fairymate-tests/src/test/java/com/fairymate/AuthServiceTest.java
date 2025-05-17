package com.fairymate;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class AuthServiceTest {

    private AuthService authService;

    @BeforeEach
    public void setUp() {
        authService = new AuthService();
    }

    @Test
    public void testValidLogin() {
        assertTrue(authService.login("user1", "password123"));
    }

    @Test
    public void testInvalidPassword() {
        assertFalse(authService.login("user1", "wrongpass"));
    }

    @Test
    public void testInvalidUsername() {
        assertFalse(authService.login("invalidUser", "password123"));
    }

    @Test
    public void testNullUsername() {
        assertFalse(authService.login(null, "password123"));
    }

    @Test
    public void testNullPassword() {
        assertFalse(authService.login("user1", null));
    }

    @Test
    public void testNullUsernameAndPassword() {
        assertFalse(authService.login(null, null));
    }
}
