package com.example.datatablepreserv.repos;

import com.example.datatablepreserv.domain.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {
}
