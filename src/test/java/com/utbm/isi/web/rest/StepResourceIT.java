package com.utbm.isi.web.rest;

import com.utbm.isi.ToukiApp;
import com.utbm.isi.domain.Step;
import com.utbm.isi.repository.StepRepository;
import com.utbm.isi.service.StepService;
import com.utbm.isi.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.Instant;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import static com.utbm.isi.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link StepResource} REST controller.
 */
@SpringBootTest(classes = ToukiApp.class)
public class StepResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_START_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_END_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_END_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private StepRepository stepRepository;

    @Mock
    private StepRepository stepRepositoryMock;

    @Mock
    private StepService stepServiceMock;

    @Autowired
    private StepService stepService;

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

    private MockMvc restStepMockMvc;

    private Step step;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StepResource stepResource = new StepResource(stepService);
        this.restStepMockMvc = MockMvcBuilders.standaloneSetup(stepResource)
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
    public static Step createEntity(EntityManager em) {
        Step step = new Step()
            .title(DEFAULT_TITLE)
            .description(DEFAULT_DESCRIPTION)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedAt(DEFAULT_UPDATED_AT);
        return step;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Step createUpdatedEntity(EntityManager em) {
        Step step = new Step()
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);
        return step;
    }

    @BeforeEach
    public void initTest() {
        step = createEntity(em);
    }

    @Test
    @Transactional
    public void createStep() throws Exception {
        int databaseSizeBeforeCreate = stepRepository.findAll().size();

        // Create the Step
        restStepMockMvc.perform(post("/api/steps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(step)))
            .andExpect(status().isCreated());

        // Validate the Step in the database
        List<Step> stepList = stepRepository.findAll();
        assertThat(stepList).hasSize(databaseSizeBeforeCreate + 1);
        Step testStep = stepList.get(stepList.size() - 1);
        assertThat(testStep.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testStep.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testStep.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testStep.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testStep.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testStep.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createStepWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = stepRepository.findAll().size();

        // Create the Step with an existing ID
        step.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStepMockMvc.perform(post("/api/steps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(step)))
            .andExpect(status().isBadRequest());

        // Validate the Step in the database
        List<Step> stepList = stepRepository.findAll();
        assertThat(stepList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = stepRepository.findAll().size();
        // set the field null
        step.setTitle(null);

        // Create the Step, which fails.

        restStepMockMvc.perform(post("/api/steps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(step)))
            .andExpect(status().isBadRequest());

        List<Step> stepList = stepRepository.findAll();
        assertThat(stepList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSteps() throws Exception {
        // Initialize the database
        stepRepository.saveAndFlush(step);

        // Get all the stepList
        restStepMockMvc.perform(get("/api/steps?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(step.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllStepsWithEagerRelationshipsIsEnabled() throws Exception {
        StepResource stepResource = new StepResource(stepServiceMock);
        when(stepServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restStepMockMvc = MockMvcBuilders.standaloneSetup(stepResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restStepMockMvc.perform(get("/api/steps?eagerload=true"))
        .andExpect(status().isOk());

        verify(stepServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllStepsWithEagerRelationshipsIsNotEnabled() throws Exception {
        StepResource stepResource = new StepResource(stepServiceMock);
            when(stepServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restStepMockMvc = MockMvcBuilders.standaloneSetup(stepResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restStepMockMvc.perform(get("/api/steps?eagerload=true"))
        .andExpect(status().isOk());

            verify(stepServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getStep() throws Exception {
        // Initialize the database
        stepRepository.saveAndFlush(step);

        // Get the step
        restStepMockMvc.perform(get("/api/steps/{id}", step.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(step.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingStep() throws Exception {
        // Get the step
        restStepMockMvc.perform(get("/api/steps/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStep() throws Exception {
        // Initialize the database
        stepService.save(step);

        int databaseSizeBeforeUpdate = stepRepository.findAll().size();

        // Update the step
        Step updatedStep = stepRepository.findById(step.getId()).get();
        // Disconnect from session so that the updates on updatedStep are not directly saved in db
        em.detach(updatedStep);
        updatedStep
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);

        restStepMockMvc.perform(put("/api/steps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStep)))
            .andExpect(status().isOk());

        // Validate the Step in the database
        List<Step> stepList = stepRepository.findAll();
        assertThat(stepList).hasSize(databaseSizeBeforeUpdate);
        Step testStep = stepList.get(stepList.size() - 1);
        assertThat(testStep.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testStep.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testStep.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testStep.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testStep.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testStep.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingStep() throws Exception {
        int databaseSizeBeforeUpdate = stepRepository.findAll().size();

        // Create the Step

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStepMockMvc.perform(put("/api/steps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(step)))
            .andExpect(status().isBadRequest());

        // Validate the Step in the database
        List<Step> stepList = stepRepository.findAll();
        assertThat(stepList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStep() throws Exception {
        // Initialize the database
        stepService.save(step);

        int databaseSizeBeforeDelete = stepRepository.findAll().size();

        // Delete the step
        restStepMockMvc.perform(delete("/api/steps/{id}", step.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Step> stepList = stepRepository.findAll();
        assertThat(stepList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Step.class);
        Step step1 = new Step();
        step1.setId(1L);
        Step step2 = new Step();
        step2.setId(step1.getId());
        assertThat(step1).isEqualTo(step2);
        step2.setId(2L);
        assertThat(step1).isNotEqualTo(step2);
        step1.setId(null);
        assertThat(step1).isNotEqualTo(step2);
    }
}
