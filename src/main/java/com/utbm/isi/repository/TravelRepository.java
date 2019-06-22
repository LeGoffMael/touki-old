package com.utbm.isi.repository;

import com.utbm.isi.domain.Travel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Travel entity.
 */
@Repository
public interface TravelRepository extends JpaRepository<Travel, Long> {

    @Query(value = "select distinct travel from Travel travel left join fetch travel.users",
        countQuery = "select count(distinct travel) from Travel travel")
    Page<Travel> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct travel from Travel travel left join fetch travel.users")
    List<Travel> findAllWithEagerRelationships();

    @Query("select travel from Travel travel left join fetch travel.users where travel.id =:id")
    Optional<Travel> findOneWithEagerRelationships(@Param("id") Long id);

}
