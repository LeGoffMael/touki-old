package com.utbm.isi.service.impl;

import com.utbm.isi.service.ReactionService;
import com.utbm.isi.domain.Reaction;
import com.utbm.isi.repository.ReactionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Reaction}.
 */
@Service
@Transactional
public class ReactionServiceImpl implements ReactionService {

    private final Logger log = LoggerFactory.getLogger(ReactionServiceImpl.class);

    private final ReactionRepository reactionRepository;

    public ReactionServiceImpl(ReactionRepository reactionRepository) {
        this.reactionRepository = reactionRepository;
    }

    /**
     * Save a reaction.
     *
     * @param reaction the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Reaction save(Reaction reaction) {
        log.debug("Request to save Reaction : {}", reaction);
        return reactionRepository.save(reaction);
    }

    /**
     * Get all the reactions.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Reaction> findAll() {
        log.debug("Request to get all Reactions");
        return reactionRepository.findAll();
    }


    /**
     * Get one reaction by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Reaction> findOne(Long id) {
        log.debug("Request to get Reaction : {}", id);
        return reactionRepository.findById(id);
    }

    /**
     * Delete the reaction by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Reaction : {}", id);
        reactionRepository.deleteById(id);
    }
}
