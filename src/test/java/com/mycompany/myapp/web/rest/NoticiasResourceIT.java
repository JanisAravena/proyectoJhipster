package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.domain.NoticiasAsserts.*;
import static com.mycompany.myapp.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Noticias;
import com.mycompany.myapp.repository.NoticiasRepository;
import jakarta.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link NoticiasResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class NoticiasResourceIT {

    private static final String DEFAULT_TITULO = "AAAAAAAAAA";
    private static final String UPDATED_TITULO = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENIDO = "AAAAAAAAAA";
    private static final String UPDATED_CONTENIDO = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_FECHA_PUBLICACION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_PUBLICACION = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_AUTOR = "AAAAAAAAAA";
    private static final String UPDATED_AUTOR = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/noticias";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private NoticiasRepository noticiasRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNoticiasMockMvc;

    private Noticias noticias;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Noticias createEntity(EntityManager em) {
        Noticias noticias = new Noticias()
            .titulo(DEFAULT_TITULO)
            .contenido(DEFAULT_CONTENIDO)
            .fechaPublicacion(DEFAULT_FECHA_PUBLICACION)
            .autor(DEFAULT_AUTOR);
        return noticias;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Noticias createUpdatedEntity(EntityManager em) {
        Noticias noticias = new Noticias()
            .titulo(UPDATED_TITULO)
            .contenido(UPDATED_CONTENIDO)
            .fechaPublicacion(UPDATED_FECHA_PUBLICACION)
            .autor(UPDATED_AUTOR);
        return noticias;
    }

    @BeforeEach
    public void initTest() {
        noticias = createEntity(em);
    }

    @Test
    @Transactional
    void createNoticias() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Noticias
        var returnedNoticias = om.readValue(
            restNoticiasMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(noticias)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            Noticias.class
        );

        // Validate the Noticias in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertNoticiasUpdatableFieldsEquals(returnedNoticias, getPersistedNoticias(returnedNoticias));
    }

    @Test
    @Transactional
    void createNoticiasWithExistingId() throws Exception {
        // Create the Noticias with an existing ID
        noticias.setId(1L);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restNoticiasMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(noticias)))
            .andExpect(status().isBadRequest());

        // Validate the Noticias in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllNoticias() throws Exception {
        // Initialize the database
        noticiasRepository.saveAndFlush(noticias);

        // Get all the noticiasList
        restNoticiasMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(noticias.getId().intValue())))
            .andExpect(jsonPath("$.[*].titulo").value(hasItem(DEFAULT_TITULO)))
            .andExpect(jsonPath("$.[*].contenido").value(hasItem(DEFAULT_CONTENIDO)))
            .andExpect(jsonPath("$.[*].fechaPublicacion").value(hasItem(DEFAULT_FECHA_PUBLICACION.toString())))
            .andExpect(jsonPath("$.[*].autor").value(hasItem(DEFAULT_AUTOR)));
    }

    @Test
    @Transactional
    void getNoticias() throws Exception {
        // Initialize the database
        noticiasRepository.saveAndFlush(noticias);

        // Get the noticias
        restNoticiasMockMvc
            .perform(get(ENTITY_API_URL_ID, noticias.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(noticias.getId().intValue()))
            .andExpect(jsonPath("$.titulo").value(DEFAULT_TITULO))
            .andExpect(jsonPath("$.contenido").value(DEFAULT_CONTENIDO))
            .andExpect(jsonPath("$.fechaPublicacion").value(DEFAULT_FECHA_PUBLICACION.toString()))
            .andExpect(jsonPath("$.autor").value(DEFAULT_AUTOR));
    }

    @Test
    @Transactional
    void getNonExistingNoticias() throws Exception {
        // Get the noticias
        restNoticiasMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingNoticias() throws Exception {
        // Initialize the database
        noticiasRepository.saveAndFlush(noticias);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the noticias
        Noticias updatedNoticias = noticiasRepository.findById(noticias.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedNoticias are not directly saved in db
        em.detach(updatedNoticias);
        updatedNoticias
            .titulo(UPDATED_TITULO)
            .contenido(UPDATED_CONTENIDO)
            .fechaPublicacion(UPDATED_FECHA_PUBLICACION)
            .autor(UPDATED_AUTOR);

        restNoticiasMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedNoticias.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedNoticias))
            )
            .andExpect(status().isOk());

        // Validate the Noticias in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedNoticiasToMatchAllProperties(updatedNoticias);
    }

    @Test
    @Transactional
    void putNonExistingNoticias() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        noticias.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNoticiasMockMvc
            .perform(
                put(ENTITY_API_URL_ID, noticias.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(noticias))
            )
            .andExpect(status().isBadRequest());

        // Validate the Noticias in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchNoticias() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        noticias.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNoticiasMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(noticias))
            )
            .andExpect(status().isBadRequest());

        // Validate the Noticias in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamNoticias() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        noticias.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNoticiasMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(noticias)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Noticias in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateNoticiasWithPatch() throws Exception {
        // Initialize the database
        noticiasRepository.saveAndFlush(noticias);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the noticias using partial update
        Noticias partialUpdatedNoticias = new Noticias();
        partialUpdatedNoticias.setId(noticias.getId());

        partialUpdatedNoticias.titulo(UPDATED_TITULO).contenido(UPDATED_CONTENIDO).autor(UPDATED_AUTOR);

        restNoticiasMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedNoticias.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedNoticias))
            )
            .andExpect(status().isOk());

        // Validate the Noticias in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertNoticiasUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedNoticias, noticias), getPersistedNoticias(noticias));
    }

    @Test
    @Transactional
    void fullUpdateNoticiasWithPatch() throws Exception {
        // Initialize the database
        noticiasRepository.saveAndFlush(noticias);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the noticias using partial update
        Noticias partialUpdatedNoticias = new Noticias();
        partialUpdatedNoticias.setId(noticias.getId());

        partialUpdatedNoticias
            .titulo(UPDATED_TITULO)
            .contenido(UPDATED_CONTENIDO)
            .fechaPublicacion(UPDATED_FECHA_PUBLICACION)
            .autor(UPDATED_AUTOR);

        restNoticiasMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedNoticias.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedNoticias))
            )
            .andExpect(status().isOk());

        // Validate the Noticias in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertNoticiasUpdatableFieldsEquals(partialUpdatedNoticias, getPersistedNoticias(partialUpdatedNoticias));
    }

    @Test
    @Transactional
    void patchNonExistingNoticias() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        noticias.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNoticiasMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, noticias.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(noticias))
            )
            .andExpect(status().isBadRequest());

        // Validate the Noticias in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchNoticias() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        noticias.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNoticiasMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(noticias))
            )
            .andExpect(status().isBadRequest());

        // Validate the Noticias in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamNoticias() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        noticias.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNoticiasMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(noticias)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Noticias in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteNoticias() throws Exception {
        // Initialize the database
        noticiasRepository.saveAndFlush(noticias);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the noticias
        restNoticiasMockMvc
            .perform(delete(ENTITY_API_URL_ID, noticias.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return noticiasRepository.count();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected Noticias getPersistedNoticias(Noticias noticias) {
        return noticiasRepository.findById(noticias.getId()).orElseThrow();
    }

    protected void assertPersistedNoticiasToMatchAllProperties(Noticias expectedNoticias) {
        assertNoticiasAllPropertiesEquals(expectedNoticias, getPersistedNoticias(expectedNoticias));
    }

    protected void assertPersistedNoticiasToMatchUpdatableProperties(Noticias expectedNoticias) {
        assertNoticiasAllUpdatablePropertiesEquals(expectedNoticias, getPersistedNoticias(expectedNoticias));
    }
}
