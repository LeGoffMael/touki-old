package com.utbm.isi.web.rest;

import com.utbm.isi.domain.Badge;
import com.utbm.isi.service.BadgeService;
import com.utbm.isi.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.utbm.isi.domain.Badge}.
 */
@RestController
@RequestMapping("/api")
public class BadgeResource {

    private final Logger log = LoggerFactory.getLogger(BadgeResource.class);

    private static final String ENTITY_NAME = "badge";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BadgeService badgeService;

    public BadgeResource(BadgeService badgeService) {
        this.badgeService = badgeService;
    }

    /**
     * {@code POST  /badges} : Create a new badge.
     *
     * @param badge the badge to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new badge, or with status {@code 400 (Bad Request)} if the badge has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/badges")
    public ResponseEntity<Badge> createBadge(@Valid @RequestBody Badge badge) throws URISyntaxException {
        log.debug("REST request to save Badge : {}", badge);
        if (badge.getId() != null) {
            throw new BadRequestAlertException("A new badge cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Badge result = badgeService.save(badge);
        return ResponseEntity.created(new URI("/api/badges/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /badges} : Updates an existing badge.
     *
     * @param badge the badge to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated badge,
     * or with status {@code 400 (Bad Request)} if the badge is not valid,
     * or with status {@code 500 (Internal Server Error)} if the badge couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/badges")
    public ResponseEntity<Badge> updateBadge(@Valid @RequestBody Badge badge) throws URISyntaxException {
        log.debug("REST request to update Badge : {}", badge);
        if (badge.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Badge result = badgeService.save(badge);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, badge.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /badges} : get all the badges.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of badges in body.
     */
    @GetMapping("/badges")
    public List<Badge> getAllBadges() {
        log.debug("REST request to get all Badges");
        return badgeService.findAll();
    }

    /**
     * {@code GET  /badges/:id} : get the "id" badge.
     *
     * @param id the id of the badge to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the badge, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/badges/{id}")
    public ResponseEntity<Badge> getBadge(@PathVariable Long id) {
        log.debug("REST request to get Badge : {}", id);
        Optional<Badge> badge = badgeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(badge);
    }

    /**
     * {@code DELETE  /badges/:id} : delete the "id" badge.
     *
     * @param id the id of the badge to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/badges/{id}")
    public ResponseEntity<Void> deleteBadge(@PathVariable Long id) {
        log.debug("REST request to delete Badge : {}", id);
        badgeService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
