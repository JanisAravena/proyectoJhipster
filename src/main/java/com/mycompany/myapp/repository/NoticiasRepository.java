package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Noticias;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Noticias entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NoticiasRepository extends JpaRepository<Noticias, Long> {}
