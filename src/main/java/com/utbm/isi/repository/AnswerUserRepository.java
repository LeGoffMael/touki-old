package com.utbm.isi.repository;

import com.utbm.isi.domain.AnswerUser;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AnswerUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AnswerUserRepository extends JpaRepository<AnswerUser, Long> {

}
