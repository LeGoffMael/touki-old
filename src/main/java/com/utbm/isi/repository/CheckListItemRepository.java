package com.utbm.isi.repository;

import com.utbm.isi.domain.CheckListItem;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CheckListItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CheckListItemRepository extends JpaRepository<CheckListItem, Long> {

}
