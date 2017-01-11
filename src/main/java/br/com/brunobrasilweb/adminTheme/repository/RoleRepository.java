package br.com.brunobrasilweb.adminTheme.repository;

import br.com.brunobrasilweb.adminTheme.model.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

@RepositoryRestResource(collectionResourceRel = "role", path = "role")
public interface RoleRepository extends PagingAndSortingRepository<Role, Long> {

    @RestResource(path = "list", rel = "list")
    public Page findByIdOrName(Pageable page,
                                      @Param("id") Long id,
                                      @Param("name") String name
    );

}
