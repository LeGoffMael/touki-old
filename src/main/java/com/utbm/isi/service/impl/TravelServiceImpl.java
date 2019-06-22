package com.utbm.isi.service.impl;

import com.utbm.isi.service.TravelService;
import com.utbm.isi.domain.Travel;
import com.utbm.isi.repository.TravelRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Travel}.
 */
@Service
@Transactional
public class TravelServiceImpl implements TravelService {

    private final Logger log = LoggerFactory.getLogger(TravelServiceImpl.class);

    private final TravelRepository travelRepository;

    public TravelServiceImpl(TravelRepository travelRepository) {
        this.travelRepository = travelRepository;
    }

    /**
     * Save a travel.
     *
     * @param travel the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Travel save(Travel travel) {
        log.debug("Request to save Travel : {}", travel);
        return travelRepository.save(travel);
    }

    /**
     * Get all the travels.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Travel> findAll() {
        log.debug("Request to get all Travels");
        return travelRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the travels with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Travel> findAllWithEagerRelationships(Pageable pageable) {
        return travelRepository.findAllWithEagerRelationships(pageable);
    }
    

    /**
     * Get one travel by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Travel> findOne(Long id) {
        log.debug("Request to get Travel : {}", id);
        return travelRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the travel by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Travel : {}", id);
        travelRepository.deleteById(id);
    }
}
