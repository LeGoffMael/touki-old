package com.utbm.isi.service;

import com.utbm.isi.domain.Answer;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Answer}.
 */
public interface AnswerService {

    /**
     * Save a answer.
     *
     * @param answer the entity to save.
     * @return the persisted entity.
     */
    Answer save(Answer answer);

    /**
     * Get all the answers.
     *
     * @return the list of entities.
     */
    List<Answer> findAll();


    /**
     * Get the "id" answer.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Answer> findOne(Long id);

    /**
     * Delete the "id" answer.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
