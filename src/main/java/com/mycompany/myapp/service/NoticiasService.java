package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Noticias;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.mycompany.myapp.domain.Noticias}.
 */
public interface NoticiasService {
    /**
     * Save a noticias.
     *
     * @param noticias the entity to save.
     * @return the persisted entity.
     */
    Noticias save(Noticias noticias);

    /**
     * Updates a noticias.
     *
     * @param noticias the entity to update.
     * @return the persisted entity.
     */
    Noticias update(Noticias noticias);

    /**
     * Partially updates a noticias.
     *
     * @param noticias the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Noticias> partialUpdate(Noticias noticias);

    /**
     * Get all the noticias.
     *
     * @return the list of entities.
     */
    List<Noticias> findAll();

    /**
     * Get the "id" noticias.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Noticias> findOne(Long id);

    /**
     * Delete the "id" noticias.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
