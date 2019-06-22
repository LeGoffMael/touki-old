package com.utbm.isi.web.rest;

import com.utbm.isi.ToukiApp;
import com.utbm.isi.domain.Badge;
import com.utbm.isi.repository.BadgeRepository;
import com.utbm.isi.service.BadgeService;
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
import java.util.List;

import static com.utbm.isi.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link BadgeResource} REST controller.
 */
@SpringBootTest(classes = ToukiApp.class)
public class BadgeResourceIT {

    private static final String DEFAULT_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_LABEL = "BBBBBBBBBB";

    private static final String DEFAULT_ICON = "AAAAAAAAAA";
    private static final String UPDATED_ICON = "BBBBBBBBBB";

    private static final String DEFAULT_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_TEXT = "BBBBBBBBBB";

    @Autowired
    private BadgeRepository badgeRepository;

    @Autowired
    private BadgeService badgeService;

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

    private MockMvc restBadgeMockMvc;

    private Badge badge;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BadgeResource badgeResource = new BadgeResource(badgeService);
        this.restBadgeMockMvc = MockMvcBuilders.standaloneSetup(badgeResource)
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
    public static Badge createEntity(EntityManager em) {
        Badge badge = new Badge()
            .label(DEFAULT_LABEL)
            .icon(DEFAULT_ICON)
            .text(DEFAULT_TEXT);
        return badge;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Badge createUpdatedEntity(EntityManager em) {
        Badge badge = new Badge()
            .label(UPDATED_LABEL)
            .icon(UPDATED_ICON)
            .text(UPDATED_TEXT);
        return badge;
    }

    @BeforeEach
    public void initTest() {
        badge = createEntity(em);
    }

    @Test
    @Transactional
    public void createBadge() throws Exception {
        int databaseSizeBeforeCreate = badgeRepository.findAll().size();

        // Create the Badge
        restBadgeMockMvc.perform(post("/api/badges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(badge)))
            .andExpect(status().isCreated());

        // Validate the Badge in the database
        List<Badge> badgeList = badgeRepository.findAll();
        assertThat(badgeList).hasSize(databaseSizeBeforeCreate + 1);
        Badge testBadge = badgeList.get(badgeList.size() - 1);
        assertThat(testBadge.getLabel()).isEqualTo(DEFAULT_LABEL);
        assertThat(testBadge.getIcon()).isEqualTo(DEFAULT_ICON);
        assertThat(testBadge.getText()).isEqualTo(DEFAULT_TEXT);
    }

    @Test
    @Transactional
    public void createBadgeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = badgeRepository.findAll().size();

        // Create the Badge with an existing ID
        badge.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBadgeMockMvc.perform(post("/api/badges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(badge)))
            .andExpect(status().isBadRequest());

        // Validate the Badge in the database
        List<Badge> badgeList = badgeRepository.findAll();
        assertThat(badgeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkLabelIsRequired() throws Exception {
        int databaseSizeBeforeTest = badgeRepository.findAll().size();
        // set the field null
        badge.setLabel(null);

        // Create the Badge, which fails.

        restBadgeMockMvc.perform(post("/api/badges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(badge)))
            .andExpect(status().isBadRequest());

        List<Badge> badgeList = badgeRepository.findAll();
        assertThat(badgeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBadges() throws Exception {
        // Initialize the database
        badgeRepository.saveAndFlush(badge);

        // Get all the badgeList
        restBadgeMockMvc.perform(get("/api/badges?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(badge.getId().intValue())))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL.toString())))
            .andExpect(jsonPath("$.[*].icon").value(hasItem(DEFAULT_ICON.toString())))
            .andExpect(jsonPath("$.[*].text").value(hasItem(DEFAULT_TEXT.toString())));
    }
    
    @Test
    @Transactional
    public void getBadge() throws Exception {
        // Initialize the database
        badgeRepository.saveAndFlush(badge);

        // Get the badge
        restBadgeMockMvc.perform(get("/api/badges/{id}", badge.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(badge.getId().intValue()))
            .andExpect(jsonPath("$.label").value(DEFAULT_LABEL.toString()))
            .andExpect(jsonPath("$.icon").value(DEFAULT_ICON.toString()))
            .andExpect(jsonPath("$.text").value(DEFAULT_TEXT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBadge() throws Exception {
        // Get the badge
        restBadgeMockMvc.perform(get("/api/badges/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBadge() throws Exception {
        // Initialize the database
        badgeService.save(badge);

        int databaseSizeBeforeUpdate = badgeRepository.findAll().size();

        // Update the badge
        Badge updatedBadge = badgeRepository.findById(badge.getId()).get();
        // Disconnect from session so that the updates on updatedBadge are not directly saved in db
        em.detach(updatedBadge);
        updatedBadge
            .label(UPDATED_LABEL)
            .icon(UPDATED_ICON)
            .text(UPDATED_TEXT);

        restBadgeMockMvc.perform(put("/api/badges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBadge)))
            .andExpect(status().isOk());

        // Validate the Badge in the database
        List<Badge> badgeList = badgeRepository.findAll();
        assertThat(badgeList).hasSize(databaseSizeBeforeUpdate);
        Badge testBadge = badgeList.get(badgeList.size() - 1);
        assertThat(testBadge.getLabel()).isEqualTo(UPDATED_LABEL);
        assertThat(testBadge.getIcon()).isEqualTo(UPDATED_ICON);
        assertThat(testBadge.getText()).isEqualTo(UPDATED_TEXT);
    }

    @Test
    @Transactional
    public void updateNonExistingBadge() throws Exception {
        int databaseSizeBeforeUpdate = badgeRepository.findAll().size();

        // Create the Badge

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBadgeMockMvc.perform(put("/api/badges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(badge)))
            .andExpect(status().isBadRequest());

        // Validate the Badge in the database
        List<Badge> badgeList = badgeRepository.findAll();
        assertThat(badgeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBadge() throws Exception {
        // Initialize the database
        badgeService.save(badge);

        int databaseSizeBeforeDelete = badgeRepository.findAll().size();

        // Delete the badge
        restBadgeMockMvc.perform(delete("/api/badges/{id}", badge.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Badge> badgeList = badgeRepository.findAll();
        assertThat(badgeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Badge.class);
        Badge badge1 = new Badge();
        badge1.setId(1L);
        Badge badge2 = new Badge();
        badge2.setId(badge1.getId());
        assertThat(badge1).isEqualTo(badge2);
        badge2.setId(2L);
        assertThat(badge1).isNotEqualTo(badge2);
        badge1.setId(null);
        assertThat(badge1).isNotEqualTo(badge2);
    }
}
