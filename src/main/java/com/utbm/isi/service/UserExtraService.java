package com.utbm.isi.service;

import com.utbm.isi.domain.UserExtra;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link UserExtra}.
 */
public interface UserExtraService {

    /**
     * Save a userExtra.
     *
     * @param userExtra the entity to save.
     * @return the persisted entity.
     */
    UserExtra save(UserExtra userExtra);

    /**
     * Get all the userExtras.
     *
     * @return the list of entities.
     */
    List<UserExtra> findAll();

    /**
     * Get all the userExtras with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<UserExtra> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" userExtra.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<UserExtra> findOne(Long id);

    /**
     * Delete the "id" userExtra.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
