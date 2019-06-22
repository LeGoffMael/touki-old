package com.utbm.isi.service;

import com.utbm.isi.domain.Reaction;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Reaction}.
 */
public interface ReactionService {

    /**
     * Save a reaction.
     *
     * @param reaction the entity to save.
     * @return the persisted entity.
     */
    Reaction save(Reaction reaction);

    /**
     * Get all the reactions.
     *
     * @return the list of entities.
     */
    List<Reaction> findAll();


    /**
     * Get the "id" reaction.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Reaction> findOne(Long id);

    /**
     * Delete the "id" reaction.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
