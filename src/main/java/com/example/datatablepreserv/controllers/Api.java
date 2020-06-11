package com.example.datatablepreserv.controllers;

import com.example.datatablepreserv.domain.UserSetting;
import com.example.datatablepreserv.service.DataService;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("api")
public class Api {

    private final DataService dataService;

    /**
     * Constructor
     * @param dataService - to be injected by Spring
     */
    @Autowired
    public Api(DataService dataService) {
        this.dataService = dataService;
    }

    /**
     * Method returning list of users
     * @return - list of Users wrapped in AjaxResponse
     */
    @RequestMapping("users")
    @ResponseBody
    AjaxResponse getUsers() {
        return new AjaxResponse(this.dataService.findAllUsers());
    }

    /**
     * Method returning settings of given key
     * @param key the key of the settings to be returned
     * @return UserSetting stored under given key; wrapped in AjaxReponse
     */
    @RequestMapping("settings/{key}")
    @ResponseBody
    AjaxResponse getSettingsOfUserBySettingsKey(@PathVariable String key) {
        return new AjaxResponse(this.dataService.getSettingsOfUserByKey(key));
    }

    /**
     * Save user's settings, and if OK then get all settings and return them with HTTP status OK.
     * Settings is accepted as String, and then parsed with Json.simple parser.
     * @param payload - user's settings in the form of json serialized to String
     * @return iterable of user's settings
     * TODO: surround with try/catch and return error if occurred
     * @throws ParseException - thrown in case of error occurred while parsing json string payload
     */
    @PostMapping(value = "setting", consumes = "text/plain")
    ResponseEntity<Iterable<UserSetting>> saveSettings(@RequestBody String payload) throws ParseException {
        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObject = (JSONObject) jsonParser.parse(payload);
        UserSetting userSetting = UserSetting.builder()
                .key((String)jsonObject.get("key"))
                .settings(jsonObject.get("settings").toString())
                .build();
        this.dataService.saveSettingsOfUser(userSetting);
        return new ResponseEntity(dataService.getAllSettings(), new HttpHeaders(), HttpStatus.OK);
    }

    /**
     * Returns all UserSetting stored in the app
     * @return iterable UserSetting wrapped in AjaxResponse
     */
    @GetMapping("settings")
    @ResponseBody
    AjaxResponse getSettings() {
        return new AjaxResponse(this.dataService.getAllSettings());
    }

}
