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
     * Returns settings of given user
     * @param user the user which data setting should be returned
     * @return user's settings
     */
    UserSetting getSettingsOfUser(User user);

    /**
     * Return's settings of user for given user id
     * @param userId user's identifier, of which user's setting to be returned
     * @return user's settings for given user's id
     */
    UserSetting getSettingsOfUserByUserId(Integer userId);

    /**
     * Persists user's settings
     * @param setting user's setting to be persisted
     */
    void  saveSettingsOfUser(UserSetting setting);
}
