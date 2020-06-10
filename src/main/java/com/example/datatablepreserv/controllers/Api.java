package com.example.datatablepreserv.controllers;

import com.example.datatablepreserv.domain.User;
import com.example.datatablepreserv.domain.UserSetting;
import com.example.datatablepreserv.service.DataService;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
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

    @RequestMapping("settings/{key}")
    @ResponseBody
    UserSetting getSettingsOfUserBySettingsKey(@PathVariable String key) {
        return this.dataService.getSettingsOfUserByKey(key);
    }

    @PostMapping(value = "setting", consumes = "text/plain")
    void saveSettings(@RequestBody String payload) throws ParseException {
        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObject = (JSONObject) jsonParser.parse(payload);
        UserSetting userSetting = UserSetting.builder()
                .key((String)jsonObject.get("key"))
                .settings(jsonObject.get("settings").toString())
                .build();
        this.dataService.saveSettingsOfUser(userSetting);
    }

    @GetMapping("settings")
    @ResponseBody
    Iterable<UserSetting> getSettings() {
        return this.dataService.getAllSettings();
    }

}
