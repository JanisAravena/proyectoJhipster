package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class NoticiasTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Noticias getNoticiasSample1() {
        return new Noticias().id(1L).titulo("titulo1").contenido("contenido1").autor("autor1");
    }

    public static Noticias getNoticiasSample2() {
        return new Noticias().id(2L).titulo("titulo2").contenido("contenido2").autor("autor2");
    }

    public static Noticias getNoticiasRandomSampleGenerator() {
        return new Noticias()
            .id(longCount.incrementAndGet())
            .titulo(UUID.randomUUID().toString())
            .contenido(UUID.randomUUID().toString())
            .autor(UUID.randomUUID().toString());
    }
}
