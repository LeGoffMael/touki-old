package com.utbm.isi.service.impl;

import com.utbm.isi.service.PhotoService;
import com.utbm.isi.domain.Photo;
import com.utbm.isi.repository.PhotoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Photo}.
 */
@Service
@Transactional
public class PhotoServiceImpl implements PhotoService {

    private final Logger log = LoggerFactory.getLogger(PhotoServiceImpl.class);

    private final PhotoRepository photoRepository;

    public PhotoServiceImpl(PhotoRepository photoRepository) {
        this.photoRepository = photoRepository;
    }

    /**
     * Save a photo.
     *
     * @param photo the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Photo save(Photo photo) {
        log.debug("Request to save Photo : {}", photo);
        return photoRepository.save(photo);
    }

    /**
     * Get all the photos.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Photo> findAll() {
        log.debug("Request to get all Photos");
        return photoRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the photos with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Photo> findAllWithEagerRelationships(Pageable pageable) {
        return photoRepository.findAllWithEagerRelationships(pageable);
    }
    

    /**
     * Get one photo by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Photo> findOne(Long id) {
        log.debug("Request to get Photo : {}", id);
        return photoRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the photo by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Photo : {}", id);
        photoRepository.deleteById(id);
    }
}
