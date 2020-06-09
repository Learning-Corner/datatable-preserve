package com.example.datatablepreserv.repos;

import com.example.datatablepreserv.domain.UserSetting;
import org.springframework.data.repository.CrudRepository;

public interface UserSettingsRepository extends CrudRepository<UserSetting, String> {
}
