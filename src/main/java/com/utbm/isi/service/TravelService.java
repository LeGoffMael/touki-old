package com.utbm.isi.service;

import com.utbm.isi.domain.Travel;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Travel}.
 */
public interface TravelService {

    /**
     * Save a travel.
     *
     * @param travel the entity to save.
     * @return the persisted entity.
     */
    Travel save(Travel travel);

    /**
     * Get all the travels.
     *
     * @return the list of entities.
     */
    List<Travel> findAll();

    /**
     * Get all the travels with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<Travel> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" travel.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Travel> findOne(Long id);

    /**
     * Delete the "id" travel.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
