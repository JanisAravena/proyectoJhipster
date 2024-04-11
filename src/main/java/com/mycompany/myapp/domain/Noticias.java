package com.mycompany.myapp.domain;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Noticias.
 */
@Entity
@Table(name = "noticias")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Noticias implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "titulo")
    private String titulo;

    @Column(name = "contenido")
    private String contenido;

    @Column(name = "fecha_publicacion")
    private LocalDate fechaPublicacion;

    @Column(name = "autor")
    private String autor;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Noticias id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return this.titulo;
    }

    public Noticias titulo(String titulo) {
        this.setTitulo(titulo);
        return this;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getContenido() {
        return this.contenido;
    }

    public Noticias contenido(String contenido) {
        this.setContenido(contenido);
        return this;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
    }

    public LocalDate getFechaPublicacion() {
        return this.fechaPublicacion;
    }

    public Noticias fechaPublicacion(LocalDate fechaPublicacion) {
        this.setFechaPublicacion(fechaPublicacion);
        return this;
    }

    public void setFechaPublicacion(LocalDate fechaPublicacion) {
        this.fechaPublicacion = fechaPublicacion;
    }

    public String getAutor() {
        return this.autor;
    }

    public Noticias autor(String autor) {
        this.setAutor(autor);
        return this;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Noticias)) {
            return false;
        }
        return getId() != null && getId().equals(((Noticias) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Noticias{" +
            "id=" + getId() +
            ", titulo='" + getTitulo() + "'" +
            ", contenido='" + getContenido() + "'" +
            ", fechaPublicacion='" + getFechaPublicacion() + "'" +
            ", autor='" + getAutor() + "'" +
            "}";
    }
}
