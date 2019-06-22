package com.utbm.isi.repository;

import com.utbm.isi.domain.UserExtra;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the UserExtra entity.
 */
@Repository
public interface UserExtraRepository extends JpaRepository<UserExtra, Long> {

    @Query(value = "select distinct userExtra from UserExtra userExtra left join fetch userExtra.badges left join fetch userExtra.followings",
        countQuery = "select count(distinct userExtra) from UserExtra userExtra")
    Page<UserExtra> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct userExtra from UserExtra userExtra left join fetch userExtra.badges left join fetch userExtra.followings")
    List<UserExtra> findAllWithEagerRelationships();

    @Query("select userExtra from UserExtra userExtra left join fetch userExtra.badges left join fetch userExtra.followings where userExtra.id =:id")
    Optional<UserExtra> findOneWithEagerRelationships(@Param("id") Long id);

}
