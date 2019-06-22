package com.utbm.isi.service;

import com.utbm.isi.domain.AnswerUser;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link AnswerUser}.
 */
public interface AnswerUserService {

    /**
     * Save a answerUser.
     *
     * @param answerUser the entity to save.
     * @return the persisted entity.
     */
    AnswerUser save(AnswerUser answerUser);

    /**
     * Get all the answerUsers.
     *
     * @return the list of entities.
     */
    List<AnswerUser> findAll();


    /**
     * Get the "id" answerUser.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<AnswerUser> findOne(Long id);

    /**
     * Delete the "id" answerUser.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
