package com.utbm.isi.service;

import com.utbm.isi.domain.Comment;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Comment}.
 */
public interface CommentService {

    /**
     * Save a comment.
     *
     * @param comment the entity to save.
     * @return the persisted entity.
     */
    Comment save(Comment comment);

    /**
     * Get all the comments.
     *
     * @return the list of entities.
     */
    List<Comment> findAll();


    /**
     * Get the "id" comment.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Comment> findOne(Long id);

    /**
     * Delete the "id" comment.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
