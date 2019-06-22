package com.utbm.isi.repository;

import com.utbm.isi.domain.Badge;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Badge entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BadgeRepository extends JpaRepository<Badge, Long> {

}
