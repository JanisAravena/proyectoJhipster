package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Noticias;
import com.mycompany.myapp.repository.NoticiasRepository;
import com.mycompany.myapp.service.NoticiasService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Noticias}.
 */
@RestController
@RequestMapping("/api/noticias")
public class NoticiasResource {

    private final Logger log = LoggerFactory.getLogger(NoticiasResource.class);

    private static final String ENTITY_NAME = "noticias";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NoticiasService noticiasService;

    private final NoticiasRepository noticiasRepository;

    public NoticiasResource(NoticiasService noticiasService, NoticiasRepository noticiasRepository) {
        this.noticiasService = noticiasService;
        this.noticiasRepository = noticiasRepository;
    }

    /**
     * {@code POST  /noticias} : Create a new noticias.
     *
     * @param noticias the noticias to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new noticias, or with status {@code 400 (Bad Request)} if the noticias has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Noticias> createNoticias(@RequestBody Noticias noticias) throws URISyntaxException {
        log.debug("REST request to save Noticias : {}", noticias);
        if (noticias.getId() != null) {
            throw new BadRequestAlertException("A new noticias cannot already have an ID", ENTITY_NAME, "idexists");
        }
        noticias = noticiasService.save(noticias);
        return ResponseEntity.created(new URI("/api/noticias/" + noticias.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, noticias.getId().toString()))
            .body(noticias);
    }

    /**
     * {@code PUT  /noticias/:id} : Updates an existing noticias.
     *
     * @param id the id of the noticias to save.
     * @param noticias the noticias to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated noticias,
     * or with status {@code 400 (Bad Request)} if the noticias is not valid,
     * or with status {@code 500 (Internal Server Error)} if the noticias couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Noticias> updateNoticias(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Noticias noticias
    ) throws URISyntaxException {
        log.debug("REST request to update Noticias : {}, {}", id, noticias);
        if (noticias.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, noticias.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!noticiasRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        noticias = noticiasService.update(noticias);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, noticias.getId().toString()))
            .body(noticias);
    }

    /**
     * {@code PATCH  /noticias/:id} : Partial updates given fields of an existing noticias, field will ignore if it is null
     *
     * @param id the id of the noticias to save.
     * @param noticias the noticias to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated noticias,
     * or with status {@code 400 (Bad Request)} if the noticias is not valid,
     * or with status {@code 404 (Not Found)} if the noticias is not found,
     * or with status {@code 500 (Internal Server Error)} if the noticias couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Noticias> partialUpdateNoticias(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Noticias noticias
    ) throws URISyntaxException {
        log.debug("REST request to partial update Noticias partially : {}, {}", id, noticias);
        if (noticias.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, noticias.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!noticiasRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Noticias> result = noticiasService.partialUpdate(noticias);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, noticias.getId().toString())
        );
    }

    /**
     * {@code GET  /noticias} : get all the noticias.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of noticias in body.
     */
    @GetMapping("")
    public List<Noticias> getAllNoticias() {
        log.debug("REST request to get all Noticias");
        return noticiasService.findAll();
    }

    /**
     * {@code GET  /noticias/:id} : get the "id" noticias.
     *
     * @param id the id of the noticias to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the noticias, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Noticias> getNoticias(@PathVariable("id") Long id) {
        log.debug("REST request to get Noticias : {}", id);
        Optional<Noticias> noticias = noticiasService.findOne(id);
        return ResponseUtil.wrapOrNotFound(noticias);
    }

    /**
     * {@code DELETE  /noticias/:id} : delete the "id" noticias.
     *
     * @param id the id of the noticias to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNoticias(@PathVariable("id") Long id) {
        log.debug("REST request to delete Noticias : {}", id);
        noticiasService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
