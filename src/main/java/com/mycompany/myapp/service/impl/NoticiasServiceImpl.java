package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.Noticias;
import com.mycompany.myapp.repository.NoticiasRepository;
import com.mycompany.myapp.service.NoticiasService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.mycompany.myapp.domain.Noticias}.
 */
@Service
@Transactional
public class NoticiasServiceImpl implements NoticiasService {

    private final Logger log = LoggerFactory.getLogger(NoticiasServiceImpl.class);

    private final NoticiasRepository noticiasRepository;

    public NoticiasServiceImpl(NoticiasRepository noticiasRepository) {
        this.noticiasRepository = noticiasRepository;
    }

    @Override
    public Noticias save(Noticias noticias) {
        log.debug("Request to save Noticias : {}", noticias);
        return noticiasRepository.save(noticias);
    }

    @Override
    public Noticias update(Noticias noticias) {
        log.debug("Request to update Noticias : {}", noticias);
        return noticiasRepository.save(noticias);
    }

    @Override
    public Optional<Noticias> partialUpdate(Noticias noticias) {
        log.debug("Request to partially update Noticias : {}", noticias);

        return noticiasRepository
            .findById(noticias.getId())
            .map(existingNoticias -> {
                if (noticias.getTitulo() != null) {
                    existingNoticias.setTitulo(noticias.getTitulo());
                }
                if (noticias.getContenido() != null) {
                    existingNoticias.setContenido(noticias.getContenido());
                }
                if (noticias.getFechaPublicacion() != null) {
                    existingNoticias.setFechaPublicacion(noticias.getFechaPublicacion());
                }
                if (noticias.getAutor() != null) {
                    existingNoticias.setAutor(noticias.getAutor());
                }

                return existingNoticias;
            })
            .map(noticiasRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Noticias> findAll() {
        log.debug("Request to get all Noticias");
        return noticiasRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Noticias> findOne(Long id) {
        log.debug("Request to get Noticias : {}", id);
        return noticiasRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Noticias : {}", id);
        noticiasRepository.deleteById(id);
    }
}
