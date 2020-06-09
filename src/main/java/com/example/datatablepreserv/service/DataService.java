package com.example.datatablepreserv.service;

import com.example.datatablepreserv.domain.User;
import com.example.datatablepreserv.domain.UserSetting;

public interface DataService {

    /**
     * Returns list of all stored users
     * @return List of users
     */
    Iterable<User> findAllUsers();

    /**
     * Persists user's data
     * @param user: user to be persisted
     * @return saved user
     */
    User saveUser(User user);

    /**
     * Return's settings of given key
     * @param key identifier of the setting
     * @return user settings of given key
     */
    UserSetting getSettingsOfUserByKey(String key);

    /**
     * Persists user's settings
     * @param setting user's setting to be persisted
     */
    void  saveSettingsOfUser(UserSetting setting);
}
