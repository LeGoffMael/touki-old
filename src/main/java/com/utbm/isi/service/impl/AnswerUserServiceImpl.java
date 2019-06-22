package com.utbm.isi.service.impl;

import com.utbm.isi.service.AnswerUserService;
import com.utbm.isi.domain.AnswerUser;
import com.utbm.isi.repository.AnswerUserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link AnswerUser}.
 */
@Service
@Transactional
public class AnswerUserServiceImpl implements AnswerUserService {

    private final Logger log = LoggerFactory.getLogger(AnswerUserServiceImpl.class);

    private final AnswerUserRepository answerUserRepository;

    public AnswerUserServiceImpl(AnswerUserRepository answerUserRepository) {
        this.answerUserRepository = answerUserRepository;
    }

    /**
     * Save a answerUser.
     *
     * @param answerUser the entity to save.
     * @return the persisted entity.
     */
    @Override
    public AnswerUser save(AnswerUser answerUser) {
        log.debug("Request to save AnswerUser : {}", answerUser);
        return answerUserRepository.save(answerUser);
    }

    /**
     * Get all the answerUsers.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<AnswerUser> findAll() {
        log.debug("Request to get all AnswerUsers");
        return answerUserRepository.findAll();
    }


    /**
     * Get one answerUser by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<AnswerUser> findOne(Long id) {
        log.debug("Request to get AnswerUser : {}", id);
        return answerUserRepository.findById(id);
    }

    /**
     * Delete the answerUser by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete AnswerUser : {}", id);
        answerUserRepository.deleteById(id);
    }
}
