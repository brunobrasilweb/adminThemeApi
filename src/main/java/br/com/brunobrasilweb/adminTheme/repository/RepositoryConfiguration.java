package br.com.brunobrasilweb.adminTheme.repository;

import br.com.brunobrasilweb.adminTheme.model.Role;
import br.com.brunobrasilweb.adminTheme.model.Users;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

@Configuration
public class RepositoryConfiguration extends RepositoryRestConfigurerAdapter {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Users.class);
        config.exposeIdsFor(Role.class);
    }

}
