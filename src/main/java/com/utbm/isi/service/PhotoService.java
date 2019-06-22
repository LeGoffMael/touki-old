package com.utbm.isi.service;

import com.utbm.isi.domain.Photo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Photo}.
 */
public interface PhotoService {

    /**
     * Save a photo.
     *
     * @param photo the entity to save.
     * @return the persisted entity.
     */
    Photo save(Photo photo);

    /**
     * Get all the photos.
     *
     * @return the list of entities.
     */
    List<Photo> findAll();

    /**
     * Get all the photos with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<Photo> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" photo.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Photo> findOne(Long id);

    /**
     * Delete the "id" photo.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
