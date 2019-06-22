package com.utbm.isi.web.rest;

import com.utbm.isi.domain.AnswerUser;
import com.utbm.isi.service.AnswerUserService;
import com.utbm.isi.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.utbm.isi.domain.AnswerUser}.
 */
@RestController
@RequestMapping("/api")
public class AnswerUserResource {

    private final Logger log = LoggerFactory.getLogger(AnswerUserResource.class);

    private static final String ENTITY_NAME = "answerUser";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AnswerUserService answerUserService;

    public AnswerUserResource(AnswerUserService answerUserService) {
        this.answerUserService = answerUserService;
    }

    /**
     * {@code POST  /answer-users} : Create a new answerUser.
     *
     * @param answerUser the answerUser to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new answerUser, or with status {@code 400 (Bad Request)} if the answerUser has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/answer-users")
    public ResponseEntity<AnswerUser> createAnswerUser(@RequestBody AnswerUser answerUser) throws URISyntaxException {
        log.debug("REST request to save AnswerUser : {}", answerUser);
        if (answerUser.getId() != null) {
            throw new BadRequestAlertException("A new answerUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AnswerUser result = answerUserService.save(answerUser);
        return ResponseEntity.created(new URI("/api/answer-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /answer-users} : Updates an existing answerUser.
     *
     * @param answerUser the answerUser to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated answerUser,
     * or with status {@code 400 (Bad Request)} if the answerUser is not valid,
     * or with status {@code 500 (Internal Server Error)} if the answerUser couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/answer-users")
    public ResponseEntity<AnswerUser> updateAnswerUser(@RequestBody AnswerUser answerUser) throws URISyntaxException {
        log.debug("REST request to update AnswerUser : {}", answerUser);
        if (answerUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AnswerUser result = answerUserService.save(answerUser);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, answerUser.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /answer-users} : get all the answerUsers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of answerUsers in body.
     */
    @GetMapping("/answer-users")
    public List<AnswerUser> getAllAnswerUsers() {
        log.debug("REST request to get all AnswerUsers");
        return answerUserService.findAll();
    }

    /**
     * {@code GET  /answer-users/:id} : get the "id" answerUser.
     *
     * @param id the id of the answerUser to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the answerUser, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/answer-users/{id}")
    public ResponseEntity<AnswerUser> getAnswerUser(@PathVariable Long id) {
        log.debug("REST request to get AnswerUser : {}", id);
        Optional<AnswerUser> answerUser = answerUserService.findOne(id);
        return ResponseUtil.wrapOrNotFound(answerUser);
    }

    /**
     * {@code DELETE  /answer-users/:id} : delete the "id" answerUser.
     *
     * @param id the id of the answerUser to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/answer-users/{id}")
    public ResponseEntity<Void> deleteAnswerUser(@PathVariable Long id) {
        log.debug("REST request to delete AnswerUser : {}", id);
        answerUserService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
