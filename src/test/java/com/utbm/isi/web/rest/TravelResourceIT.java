package com.utbm.isi.web.rest;

import com.utbm.isi.ToukiApp;
import com.utbm.isi.domain.Travel;
import com.utbm.isi.repository.TravelRepository;
import com.utbm.isi.service.TravelService;
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

import com.utbm.isi.domain.enumeration.TravelStatus;
/**
 * Integration tests for the {@Link TravelResource} REST controller.
 */
@SpringBootTest(classes = ToukiApp.class)
public class TravelResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_START_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_END_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_END_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final TravelStatus DEFAULT_STATUS = TravelStatus.PLANNED;
    private static final TravelStatus UPDATED_STATUS = TravelStatus.CURRENT;

    private static final String DEFAULT_PRECAUTION = "AAAAAAAAAA";
    private static final String UPDATED_PRECAUTION = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private TravelRepository travelRepository;

    @Mock
    private TravelRepository travelRepositoryMock;

    @Mock
    private TravelService travelServiceMock;

    @Autowired
    private TravelService travelService;

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

    private MockMvc restTravelMockMvc;

    private Travel travel;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TravelResource travelResource = new TravelResource(travelService);
        this.restTravelMockMvc = MockMvcBuilders.standaloneSetup(travelResource)
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
    public static Travel createEntity(EntityManager em) {
        Travel travel = new Travel()
            .title(DEFAULT_TITLE)
            .description(DEFAULT_DESCRIPTION)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE)
            .status(DEFAULT_STATUS)
            .precaution(DEFAULT_PRECAUTION)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedAt(DEFAULT_UPDATED_AT);
        return travel;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Travel createUpdatedEntity(EntityManager em) {
        Travel travel = new Travel()
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .status(UPDATED_STATUS)
            .precaution(UPDATED_PRECAUTION)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);
        return travel;
    }

    @BeforeEach
    public void initTest() {
        travel = createEntity(em);
    }

    @Test
    @Transactional
    public void createTravel() throws Exception {
        int databaseSizeBeforeCreate = travelRepository.findAll().size();

        // Create the Travel
        restTravelMockMvc.perform(post("/api/travels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(travel)))
            .andExpect(status().isCreated());

        // Validate the Travel in the database
        List<Travel> travelList = travelRepository.findAll();
        assertThat(travelList).hasSize(databaseSizeBeforeCreate + 1);
        Travel testTravel = travelList.get(travelList.size() - 1);
        assertThat(testTravel.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testTravel.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testTravel.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testTravel.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testTravel.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testTravel.getPrecaution()).isEqualTo(DEFAULT_PRECAUTION);
        assertThat(testTravel.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testTravel.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createTravelWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = travelRepository.findAll().size();

        // Create the Travel with an existing ID
        travel.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTravelMockMvc.perform(post("/api/travels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(travel)))
            .andExpect(status().isBadRequest());

        // Validate the Travel in the database
        List<Travel> travelList = travelRepository.findAll();
        assertThat(travelList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = travelRepository.findAll().size();
        // set the field null
        travel.setTitle(null);

        // Create the Travel, which fails.

        restTravelMockMvc.perform(post("/api/travels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(travel)))
            .andExpect(status().isBadRequest());

        List<Travel> travelList = travelRepository.findAll();
        assertThat(travelList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = travelRepository.findAll().size();
        // set the field null
        travel.setStatus(null);

        // Create the Travel, which fails.

        restTravelMockMvc.perform(post("/api/travels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(travel)))
            .andExpect(status().isBadRequest());

        List<Travel> travelList = travelRepository.findAll();
        assertThat(travelList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTravels() throws Exception {
        // Initialize the database
        travelRepository.saveAndFlush(travel);

        // Get all the travelList
        restTravelMockMvc.perform(get("/api/travels?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(travel.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].precaution").value(hasItem(DEFAULT_PRECAUTION.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllTravelsWithEagerRelationshipsIsEnabled() throws Exception {
        TravelResource travelResource = new TravelResource(travelServiceMock);
        when(travelServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restTravelMockMvc = MockMvcBuilders.standaloneSetup(travelResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTravelMockMvc.perform(get("/api/travels?eagerload=true"))
        .andExpect(status().isOk());

        verify(travelServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllTravelsWithEagerRelationshipsIsNotEnabled() throws Exception {
        TravelResource travelResource = new TravelResource(travelServiceMock);
            when(travelServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restTravelMockMvc = MockMvcBuilders.standaloneSetup(travelResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTravelMockMvc.perform(get("/api/travels?eagerload=true"))
        .andExpect(status().isOk());

            verify(travelServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getTravel() throws Exception {
        // Initialize the database
        travelRepository.saveAndFlush(travel);

        // Get the travel
        restTravelMockMvc.perform(get("/api/travels/{id}", travel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(travel.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.precaution").value(DEFAULT_PRECAUTION.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTravel() throws Exception {
        // Get the travel
        restTravelMockMvc.perform(get("/api/travels/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTravel() throws Exception {
        // Initialize the database
        travelService.save(travel);

        int databaseSizeBeforeUpdate = travelRepository.findAll().size();

        // Update the travel
        Travel updatedTravel = travelRepository.findById(travel.getId()).get();
        // Disconnect from session so that the updates on updatedTravel are not directly saved in db
        em.detach(updatedTravel);
        updatedTravel
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .status(UPDATED_STATUS)
            .precaution(UPDATED_PRECAUTION)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);

        restTravelMockMvc.perform(put("/api/travels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTravel)))
            .andExpect(status().isOk());

        // Validate the Travel in the database
        List<Travel> travelList = travelRepository.findAll();
        assertThat(travelList).hasSize(databaseSizeBeforeUpdate);
        Travel testTravel = travelList.get(travelList.size() - 1);
        assertThat(testTravel.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testTravel.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testTravel.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testTravel.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testTravel.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testTravel.getPrecaution()).isEqualTo(UPDATED_PRECAUTION);
        assertThat(testTravel.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testTravel.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingTravel() throws Exception {
        int databaseSizeBeforeUpdate = travelRepository.findAll().size();

        // Create the Travel

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTravelMockMvc.perform(put("/api/travels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(travel)))
            .andExpect(status().isBadRequest());

        // Validate the Travel in the database
        List<Travel> travelList = travelRepository.findAll();
        assertThat(travelList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTravel() throws Exception {
        // Initialize the database
        travelService.save(travel);

        int databaseSizeBeforeDelete = travelRepository.findAll().size();

        // Delete the travel
        restTravelMockMvc.perform(delete("/api/travels/{id}", travel.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Travel> travelList = travelRepository.findAll();
        assertThat(travelList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Travel.class);
        Travel travel1 = new Travel();
        travel1.setId(1L);
        Travel travel2 = new Travel();
        travel2.setId(travel1.getId());
        assertThat(travel1).isEqualTo(travel2);
        travel2.setId(2L);
        assertThat(travel1).isNotEqualTo(travel2);
        travel1.setId(null);
        assertThat(travel1).isNotEqualTo(travel2);
    }
}
