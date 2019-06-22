package com.utbm.isi.service;

import com.utbm.isi.domain.Badge;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Badge}.
 */
public interface BadgeService {

    /**
     * Save a badge.
     *
     * @param badge the entity to save.
     * @return the persisted entity.
     */
    Badge save(Badge badge);

    /**
     * Get all the badges.
     *
     * @return the list of entities.
     */
    List<Badge> findAll();


    /**
     * Get the "id" badge.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Badge> findOne(Long id);

    /**
     * Delete the "id" badge.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
