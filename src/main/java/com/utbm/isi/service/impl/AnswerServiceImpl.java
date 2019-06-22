package com.utbm.isi.service.impl;

import com.utbm.isi.service.AnswerService;
import com.utbm.isi.domain.Answer;
import com.utbm.isi.repository.AnswerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Answer}.
 */
@Service
@Transactional
public class AnswerServiceImpl implements AnswerService {

    private final Logger log = LoggerFactory.getLogger(AnswerServiceImpl.class);

    private final AnswerRepository answerRepository;

    public AnswerServiceImpl(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
    }

    /**
     * Save a answer.
     *
     * @param answer the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Answer save(Answer answer) {
        log.debug("Request to save Answer : {}", answer);
        return answerRepository.save(answer);
    }

    /**
     * Get all the answers.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Answer> findAll() {
        log.debug("Request to get all Answers");
        return answerRepository.findAll();
    }


    /**
     * Get one answer by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Answer> findOne(Long id) {
        log.debug("Request to get Answer : {}", id);
        return answerRepository.findById(id);
    }

    /**
     * Delete the answer by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Answer : {}", id);
        answerRepository.deleteById(id);
    }
}
