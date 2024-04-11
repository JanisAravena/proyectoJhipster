package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.NoticiasTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class NoticiasTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Noticias.class);
        Noticias noticias1 = getNoticiasSample1();
        Noticias noticias2 = new Noticias();
        assertThat(noticias1).isNotEqualTo(noticias2);

        noticias2.setId(noticias1.getId());
        assertThat(noticias1).isEqualTo(noticias2);

        noticias2 = getNoticiasSample2();
        assertThat(noticias1).isNotEqualTo(noticias2);
    }
}
