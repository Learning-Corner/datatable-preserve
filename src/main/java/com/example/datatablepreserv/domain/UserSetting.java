package com.example.datatablepreserv.domain;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;

@Entity
@Table(name = "user_settings")
@Getter
@Setter
@Slf4j
@EqualsAndHashCode
@Builder
public class UserSetting {

    public UserSetting() {
    }

    public UserSetting(String key, String settings) {
        this.key = key;
        this.settings = settings;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "key")
    private String key;

    @Column(name = "settings")
    @Lob
    private String settings;

}
