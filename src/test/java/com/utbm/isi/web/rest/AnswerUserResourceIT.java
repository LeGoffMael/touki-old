package com.utbm.isi.web.rest;

import com.utbm.isi.ToukiApp;
import com.utbm.isi.domain.AnswerUser;
import com.utbm.isi.repository.AnswerUserRepository;
import com.utbm.isi.service.AnswerUserService;
import com.utbm.isi.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.utbm.isi.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link AnswerUserResource} REST controller.
 */
@SpringBootTest(classes = ToukiApp.class)
public class AnswerUserResourceIT {

    private static final Instant DEFAULT_COMPLETE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_COMPLETE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private AnswerUserRepository answerUserRepository;

    @Autowired
    private AnswerUserService answerUserService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restAnswerUserMockMvc;

    private AnswerUser answerUser;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AnswerUserResource answerUserResource = new AnswerUserResource(answerUserService);
        this.restAnswerUserMockMvc = MockMvcBuilders.standaloneSetup(answerUserResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AnswerUser createEntity(EntityManager em) {
        AnswerUser answerUser = new AnswerUser()
            .completeDate(DEFAULT_COMPLETE_DATE);
        return answerUser;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AnswerUser createUpdatedEntity(EntityManager em) {
        AnswerUser answerUser = new AnswerUser()
            .completeDate(UPDATED_COMPLETE_DATE);
        return answerUser;
    }

    @BeforeEach
    public void initTest() {
        answerUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createAnswerUser() throws Exception {
        int databaseSizeBeforeCreate = answerUserRepository.findAll().size();

        // Create the AnswerUser
        restAnswerUserMockMvc.perform(post("/api/answer-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(answerUser)))
            .andExpect(status().isCreated());

        // Validate the AnswerUser in the database
        List<AnswerUser> answerUserList = answerUserRepository.findAll();
        assertThat(answerUserList).hasSize(databaseSizeBeforeCreate + 1);
        AnswerUser testAnswerUser = answerUserList.get(answerUserList.size() - 1);
        assertThat(testAnswerUser.getCompleteDate()).isEqualTo(DEFAULT_COMPLETE_DATE);
    }

    @Test
    @Transactional
    public void createAnswerUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = answerUserRepository.findAll().size();

        // Create the AnswerUser with an existing ID
        answerUser.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAnswerUserMockMvc.perform(post("/api/answer-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(answerUser)))
            .andExpect(status().isBadRequest());

        // Validate the AnswerUser in the database
        List<AnswerUser> answerUserList = answerUserRepository.findAll();
        assertThat(answerUserList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAnswerUsers() throws Exception {
        // Initialize the database
        answerUserRepository.saveAndFlush(answerUser);

        // Get all the answerUserList
        restAnswerUserMockMvc.perform(get("/api/answer-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(answerUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].completeDate").value(hasItem(DEFAULT_COMPLETE_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getAnswerUser() throws Exception {
        // Initialize the database
        answerUserRepository.saveAndFlush(answerUser);

        // Get the answerUser
        restAnswerUserMockMvc.perform(get("/api/answer-users/{id}", answerUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(answerUser.getId().intValue()))
            .andExpect(jsonPath("$.completeDate").value(DEFAULT_COMPLETE_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAnswerUser() throws Exception {
        // Get the answerUser
        restAnswerUserMockMvc.perform(get("/api/answer-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAnswerUser() throws Exception {
        // Initialize the database
        answerUserService.save(answerUser);

        int databaseSizeBeforeUpdate = answerUserRepository.findAll().size();

        // Update the answerUser
        AnswerUser updatedAnswerUser = answerUserRepository.findById(answerUser.getId()).get();
        // Disconnect from session so that the updates on updatedAnswerUser are not directly saved in db
        em.detach(updatedAnswerUser);
        updatedAnswerUser
            .completeDate(UPDATED_COMPLETE_DATE);

        restAnswerUserMockMvc.perform(put("/api/answer-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAnswerUser)))
            .andExpect(status().isOk());

        // Validate the AnswerUser in the database
        List<AnswerUser> answerUserList = answerUserRepository.findAll();
        assertThat(answerUserList).hasSize(databaseSizeBeforeUpdate);
        AnswerUser testAnswerUser = answerUserList.get(answerUserList.size() - 1);
        assertThat(testAnswerUser.getCompleteDate()).isEqualTo(UPDATED_COMPLETE_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingAnswerUser() throws Exception {
        int databaseSizeBeforeUpdate = answerUserRepository.findAll().size();

        // Create the AnswerUser

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAnswerUserMockMvc.perform(put("/api/answer-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(answerUser)))
            .andExpect(status().isBadRequest());

        // Validate the AnswerUser in the database
        List<AnswerUser> answerUserList = answerUserRepository.findAll();
        assertThat(answerUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAnswerUser() throws Exception {
        // Initialize the database
        answerUserService.save(answerUser);

        int databaseSizeBeforeDelete = answerUserRepository.findAll().size();

        // Delete the answerUser
        restAnswerUserMockMvc.perform(delete("/api/answer-users/{id}", answerUser.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<AnswerUser> answerUserList = answerUserRepository.findAll();
        assertThat(answerUserList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AnswerUser.class);
        AnswerUser answerUser1 = new AnswerUser();
        answerUser1.setId(1L);
        AnswerUser answerUser2 = new AnswerUser();
        answerUser2.setId(answerUser1.getId());
        assertThat(answerUser1).isEqualTo(answerUser2);
        answerUser2.setId(2L);
        assertThat(answerUser1).isNotEqualTo(answerUser2);
        answerUser1.setId(null);
        assertThat(answerUser1).isNotEqualTo(answerUser2);
    }
}
