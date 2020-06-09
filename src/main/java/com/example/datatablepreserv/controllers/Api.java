package com.example.datatablepreserv.controllers;

import com.example.datatablepreserv.domain.User;
import com.example.datatablepreserv.domain.UserSetting;
import com.example.datatablepreserv.service.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("api")
public class Api {

    private final DataService dataService;

    @Autowired
    public Api(DataService dataService) {
        this.dataService = dataService;
    }

    @RequestMapping("users")
    @ResponseBody
    Iterable<User> getUsers() {
        return this.dataService.findAllUsers();
    }

    @PostMapping("user")
    @ResponseBody
    User saveUser(User user) {
        return this.dataService.saveUser(user);
    }

    @RequestMapping("settings/{key}")
    @ResponseBody
    UserSetting getSettingsOfUserByUserId(@PathVariable String key) {
        return this.dataService.getSettingsOfUserByKey(key);
    }

    @PostMapping("setting")
    void saveSettings(UserSetting setting){
        this.dataService.saveSettingsOfUser(setting);
    }

}
