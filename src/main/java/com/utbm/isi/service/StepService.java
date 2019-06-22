package com.utbm.isi.service;

import com.utbm.isi.domain.Step;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Step}.
 */
public interface StepService {

    /**
     * Save a step.
     *
     * @param step the entity to save.
     * @return the persisted entity.
     */
    Step save(Step step);

    /**
     * Get all the steps.
     *
     * @return the list of entities.
     */
    List<Step> findAll();

    /**
     * Get all the steps with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<Step> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" step.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Step> findOne(Long id);

    /**
     * Delete the "id" step.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
