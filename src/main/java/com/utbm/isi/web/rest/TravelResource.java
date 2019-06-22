package com.utbm.isi.web.rest;

import com.utbm.isi.domain.Travel;
import com.utbm.isi.service.TravelService;
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
 * REST controller for managing {@link com.utbm.isi.domain.Travel}.
 */
@RestController
@RequestMapping("/api")
public class TravelResource {

    private final Logger log = LoggerFactory.getLogger(TravelResource.class);

    private static final String ENTITY_NAME = "travel";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TravelService travelService;

    public TravelResource(TravelService travelService) {
        this.travelService = travelService;
    }

    /**
     * {@code POST  /travels} : Create a new travel.
     *
     * @param travel the travel to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new travel, or with status {@code 400 (Bad Request)} if the travel has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/travels")
    public ResponseEntity<Travel> createTravel(@Valid @RequestBody Travel travel) throws URISyntaxException {
        log.debug("REST request to save Travel : {}", travel);
        if (travel.getId() != null) {
            throw new BadRequestAlertException("A new travel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Travel result = travelService.save(travel);
        return ResponseEntity.created(new URI("/api/travels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /travels} : Updates an existing travel.
     *
     * @param travel the travel to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated travel,
     * or with status {@code 400 (Bad Request)} if the travel is not valid,
     * or with status {@code 500 (Internal Server Error)} if the travel couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/travels")
    public ResponseEntity<Travel> updateTravel(@Valid @RequestBody Travel travel) throws URISyntaxException {
        log.debug("REST request to update Travel : {}", travel);
        if (travel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Travel result = travelService.save(travel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, travel.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /travels} : get all the travels.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of travels in body.
     */
    @GetMapping("/travels")
    public List<Travel> getAllTravels(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Travels");
        return travelService.findAll();
    }

    /**
     * {@code GET  /travels/:id} : get the "id" travel.
     *
     * @param id the id of the travel to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the travel, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/travels/{id}")
    public ResponseEntity<Travel> getTravel(@PathVariable Long id) {
        log.debug("REST request to get Travel : {}", id);
        Optional<Travel> travel = travelService.findOne(id);
        return ResponseUtil.wrapOrNotFound(travel);
    }

    /**
     * {@code DELETE  /travels/:id} : delete the "id" travel.
     *
     * @param id the id of the travel to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/travels/{id}")
    public ResponseEntity<Void> deleteTravel(@PathVariable Long id) {
        log.debug("REST request to delete Travel : {}", id);
        travelService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
