package com.utbm.isi.service.impl;

import com.utbm.isi.service.CheckListItemService;
import com.utbm.isi.domain.CheckListItem;
import com.utbm.isi.repository.CheckListItemRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link CheckListItem}.
 */
@Service
@Transactional
public class CheckListItemServiceImpl implements CheckListItemService {

    private final Logger log = LoggerFactory.getLogger(CheckListItemServiceImpl.class);

    private final CheckListItemRepository checkListItemRepository;

    public CheckListItemServiceImpl(CheckListItemRepository checkListItemRepository) {
        this.checkListItemRepository = checkListItemRepository;
    }

    /**
     * Save a checkListItem.
     *
     * @param checkListItem the entity to save.
     * @return the persisted entity.
     */
    @Override
    public CheckListItem save(CheckListItem checkListItem) {
        log.debug("Request to save CheckListItem : {}", checkListItem);
        return checkListItemRepository.save(checkListItem);
    }

    /**
     * Get all the checkListItems.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<CheckListItem> findAll() {
        log.debug("Request to get all CheckListItems");
        return checkListItemRepository.findAll();
    }


    /**
     * Get one checkListItem by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CheckListItem> findOne(Long id) {
        log.debug("Request to get CheckListItem : {}", id);
        return checkListItemRepository.findById(id);
    }

    /**
     * Delete the checkListItem by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CheckListItem : {}", id);
        checkListItemRepository.deleteById(id);
    }
}
