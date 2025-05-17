package com.fairymate;

import java.util.HashMap;
import java.util.Map;

public class AuthService {

    private final Map<String, String> users = new HashMap<>();

    public AuthService() {
        users.put("user1", "password123");
        users.put("admin", "adminpass");
    }

    public boolean login(String username, String password) {
        return users.containsKey(username) && users.get(username).equals(password);
    }
}
