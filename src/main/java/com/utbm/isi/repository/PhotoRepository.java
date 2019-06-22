package com.utbm.isi.repository;

import com.utbm.isi.domain.Photo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Photo entity.
 */
@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {

    @Query(value = "select distinct photo from Photo photo left join fetch photo.steps",
        countQuery = "select count(distinct photo) from Photo photo")
    Page<Photo> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct photo from Photo photo left join fetch photo.steps")
    List<Photo> findAllWithEagerRelationships();

    @Query("select photo from Photo photo left join fetch photo.steps where photo.id =:id")
    Optional<Photo> findOneWithEagerRelationships(@Param("id") Long id);

}
