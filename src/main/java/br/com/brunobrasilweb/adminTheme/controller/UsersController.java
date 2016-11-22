package br.com.brunobrasilweb.adminTheme.controller;

import br.com.brunobrasilweb.adminTheme.model.Users;
import br.com.brunobrasilweb.adminTheme.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("users")
public class UsersController {

    @Autowired
    UsersRepository usersRepository;

    @RequestMapping(value = "/by-login/{login}", method = RequestMethod.GET)
    public Users byLogin(@PathVariable String login) {

        Users users = usersRepository.findByLogin(login);
        return users;

    }

}
