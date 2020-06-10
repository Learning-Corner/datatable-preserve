package com.example.datatablepreserv.service;

import com.example.datatablepreserv.domain.User;
import com.example.datatablepreserv.domain.UserSetting;
import com.example.datatablepreserv.repos.UserRepository;
import com.example.datatablepreserv.repos.UserSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class DataServiceImpl implements DataService {

    private final UserRepository userRepository;
    private final UserSettingsRepository userSettingsRepository;

    @Autowired
    public DataServiceImpl(UserRepository userRepository, UserSettingsRepository userSettingsRepository) {
        this.userRepository = userRepository;
        this.userSettingsRepository = userSettingsRepository;
    }

    @Override
    public Iterable<User> findAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public UserSetting getSettingsOfUserByKey(String key) {
        return userSettingsRepository.findById(key).orElse(null);
    }

    @Override
    public Iterable<UserSetting> getAllSettings() {
        return this.userSettingsRepository.findAll(Sort.by("key").ascending());
    }

    @Override
    public void saveSettingsOfUser(UserSetting setting) {
        userSettingsRepository.save(setting);
    }
}
