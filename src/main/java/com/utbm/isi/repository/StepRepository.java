package com.utbm.isi.repository;

import com.utbm.isi.domain.Step;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Step entity.
 */
@Repository
public interface StepRepository extends JpaRepository<Step, Long> {

    @Query(value = "select distinct step from Step step left join fetch step.places",
        countQuery = "select count(distinct step) from Step step")
    Page<Step> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct step from Step step left join fetch step.places")
    List<Step> findAllWithEagerRelationships();

    @Query("select step from Step step left join fetch step.places where step.id =:id")
    Optional<Step> findOneWithEagerRelationships(@Param("id") Long id);

}
