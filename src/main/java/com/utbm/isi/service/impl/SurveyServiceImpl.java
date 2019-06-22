package com.utbm.isi.service.impl;

import com.utbm.isi.service.SurveyService;
import com.utbm.isi.domain.Survey;
import com.utbm.isi.repository.SurveyRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Survey}.
 */
@Service
@Transactional
public class SurveyServiceImpl implements SurveyService {

    private final Logger log = LoggerFactory.getLogger(SurveyServiceImpl.class);

    private final SurveyRepository surveyRepository;

    public SurveyServiceImpl(SurveyRepository surveyRepository) {
        this.surveyRepository = surveyRepository;
    }

    /**
     * Save a survey.
     *
     * @param survey the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Survey save(Survey survey) {
        log.debug("Request to save Survey : {}", survey);
        return surveyRepository.save(survey);
    }

    /**
     * Get all the surveys.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Survey> findAll() {
        log.debug("Request to get all Surveys");
        return surveyRepository.findAll();
    }


    /**
     * Get one survey by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Survey> findOne(Long id) {
        log.debug("Request to get Survey : {}", id);
        return surveyRepository.findById(id);
    }

    /**
     * Delete the survey by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Survey : {}", id);
        surveyRepository.deleteById(id);
    }
}
