package com.utbm.isi.service.impl;

import com.utbm.isi.service.UserExtraService;
import com.utbm.isi.domain.UserExtra;
import com.utbm.isi.repository.UserExtraRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link UserExtra}.
 */
@Service
@Transactional
public class UserExtraServiceImpl implements UserExtraService {

    private final Logger log = LoggerFactory.getLogger(UserExtraServiceImpl.class);

    private final UserExtraRepository userExtraRepository;

    public UserExtraServiceImpl(UserExtraRepository userExtraRepository) {
        this.userExtraRepository = userExtraRepository;
    }

    /**
     * Save a userExtra.
     *
     * @param userExtra the entity to save.
     * @return the persisted entity.
     */
    @Override
    public UserExtra save(UserExtra userExtra) {
        log.debug("Request to save UserExtra : {}", userExtra);
        return userExtraRepository.save(userExtra);
    }

    /**
     * Get all the userExtras.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<UserExtra> findAll() {
        log.debug("Request to get all UserExtras");
        return userExtraRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the userExtras with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<UserExtra> findAllWithEagerRelationships(Pageable pageable) {
        return userExtraRepository.findAllWithEagerRelationships(pageable);
    }
    

    /**
     * Get one userExtra by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<UserExtra> findOne(Long id) {
        log.debug("Request to get UserExtra : {}", id);
        return userExtraRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the userExtra by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete UserExtra : {}", id);
        userExtraRepository.deleteById(id);
    }
}
