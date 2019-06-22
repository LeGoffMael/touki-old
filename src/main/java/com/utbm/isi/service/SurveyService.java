package com.utbm.isi.service;

import com.utbm.isi.domain.Survey;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Survey}.
 */
public interface SurveyService {

    /**
     * Save a survey.
     *
     * @param survey the entity to save.
     * @return the persisted entity.
     */
    Survey save(Survey survey);

    /**
     * Get all the surveys.
     *
     * @return the list of entities.
     */
    List<Survey> findAll();


    /**
     * Get the "id" survey.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Survey> findOne(Long id);

    /**
     * Delete the "id" survey.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
