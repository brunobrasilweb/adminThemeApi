package br.com.brunobrasilweb.adminTheme.repository;

import br.com.brunobrasilweb.adminTheme.model.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

@RepositoryRestResource(collectionResourceRel = "users", path = "users")
public interface UsersRepository extends PagingAndSortingRepository<Users, Long> {

    @RestResource(path = "list", rel = "list")
    public Page findByIdOrNameOrEmail(Pageable page,
                                      @Param("id") Long id,
                                      @Param("name") String name,
                                      @Param("email") String email
    );

    Users findByLogin(String login);

}

