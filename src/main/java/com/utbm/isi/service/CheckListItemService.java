package com.utbm.isi.service;

import com.utbm.isi.domain.CheckListItem;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link CheckListItem}.
 */
public interface CheckListItemService {

    /**
     * Save a checkListItem.
     *
     * @param checkListItem the entity to save.
     * @return the persisted entity.
     */
    CheckListItem save(CheckListItem checkListItem);

    /**
     * Get all the checkListItems.
     *
     * @return the list of entities.
     */
    List<CheckListItem> findAll();


    /**
     * Get the "id" checkListItem.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CheckListItem> findOne(Long id);

    /**
     * Delete the "id" checkListItem.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
