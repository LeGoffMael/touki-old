package com.utbm.isi.web.rest;

import com.utbm.isi.domain.CheckListItem;
import com.utbm.isi.service.CheckListItemService;
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
 * REST controller for managing {@link com.utbm.isi.domain.CheckListItem}.
 */
@RestController
@RequestMapping("/api")
public class CheckListItemResource {

    private final Logger log = LoggerFactory.getLogger(CheckListItemResource.class);

    private static final String ENTITY_NAME = "checkListItem";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CheckListItemService checkListItemService;

    public CheckListItemResource(CheckListItemService checkListItemService) {
        this.checkListItemService = checkListItemService;
    }

    /**
     * {@code POST  /check-list-items} : Create a new checkListItem.
     *
     * @param checkListItem the checkListItem to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new checkListItem, or with status {@code 400 (Bad Request)} if the checkListItem has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/check-list-items")
    public ResponseEntity<CheckListItem> createCheckListItem(@Valid @RequestBody CheckListItem checkListItem) throws URISyntaxException {
        log.debug("REST request to save CheckListItem : {}", checkListItem);
        if (checkListItem.getId() != null) {
            throw new BadRequestAlertException("A new checkListItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CheckListItem result = checkListItemService.save(checkListItem);
        return ResponseEntity.created(new URI("/api/check-list-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /check-list-items} : Updates an existing checkListItem.
     *
     * @param checkListItem the checkListItem to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated checkListItem,
     * or with status {@code 400 (Bad Request)} if the checkListItem is not valid,
     * or with status {@code 500 (Internal Server Error)} if the checkListItem couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/check-list-items")
    public ResponseEntity<CheckListItem> updateCheckListItem(@Valid @RequestBody CheckListItem checkListItem) throws URISyntaxException {
        log.debug("REST request to update CheckListItem : {}", checkListItem);
        if (checkListItem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CheckListItem result = checkListItemService.save(checkListItem);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, checkListItem.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /check-list-items} : get all the checkListItems.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of checkListItems in body.
     */
    @GetMapping("/check-list-items")
    public List<CheckListItem> getAllCheckListItems() {
        log.debug("REST request to get all CheckListItems");
        return checkListItemService.findAll();
    }

    /**
     * {@code GET  /check-list-items/:id} : get the "id" checkListItem.
     *
     * @param id the id of the checkListItem to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the checkListItem, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/check-list-items/{id}")
    public ResponseEntity<CheckListItem> getCheckListItem(@PathVariable Long id) {
        log.debug("REST request to get CheckListItem : {}", id);
        Optional<CheckListItem> checkListItem = checkListItemService.findOne(id);
        return ResponseUtil.wrapOrNotFound(checkListItem);
    }

    /**
     * {@code DELETE  /check-list-items/:id} : delete the "id" checkListItem.
     *
     * @param id the id of the checkListItem to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/check-list-items/{id}")
    public ResponseEntity<Void> deleteCheckListItem(@PathVariable Long id) {
        log.debug("REST request to delete CheckListItem : {}", id);
        checkListItemService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
