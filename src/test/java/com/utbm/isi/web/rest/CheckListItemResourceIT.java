package com.utbm.isi.web.rest;

import com.utbm.isi.ToukiApp;
import com.utbm.isi.domain.CheckListItem;
import com.utbm.isi.repository.CheckListItemRepository;
import com.utbm.isi.service.CheckListItemService;
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
 * Integration tests for the {@Link CheckListItemResource} REST controller.
 */
@SpringBootTest(classes = ToukiApp.class)
public class CheckListItemResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_DONE = false;
    private static final Boolean UPDATED_IS_DONE = true;

    @Autowired
    private CheckListItemRepository checkListItemRepository;

    @Autowired
    private CheckListItemService checkListItemService;

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

    private MockMvc restCheckListItemMockMvc;

    private CheckListItem checkListItem;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CheckListItemResource checkListItemResource = new CheckListItemResource(checkListItemService);
        this.restCheckListItemMockMvc = MockMvcBuilders.standaloneSetup(checkListItemResource)
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
    public static CheckListItem createEntity(EntityManager em) {
        CheckListItem checkListItem = new CheckListItem()
            .name(DEFAULT_NAME)
            .isDone(DEFAULT_IS_DONE);
        return checkListItem;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CheckListItem createUpdatedEntity(EntityManager em) {
        CheckListItem checkListItem = new CheckListItem()
            .name(UPDATED_NAME)
            .isDone(UPDATED_IS_DONE);
        return checkListItem;
    }

    @BeforeEach
    public void initTest() {
        checkListItem = createEntity(em);
    }

    @Test
    @Transactional
    public void createCheckListItem() throws Exception {
        int databaseSizeBeforeCreate = checkListItemRepository.findAll().size();

        // Create the CheckListItem
        restCheckListItemMockMvc.perform(post("/api/check-list-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(checkListItem)))
            .andExpect(status().isCreated());

        // Validate the CheckListItem in the database
        List<CheckListItem> checkListItemList = checkListItemRepository.findAll();
        assertThat(checkListItemList).hasSize(databaseSizeBeforeCreate + 1);
        CheckListItem testCheckListItem = checkListItemList.get(checkListItemList.size() - 1);
        assertThat(testCheckListItem.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCheckListItem.isIsDone()).isEqualTo(DEFAULT_IS_DONE);
    }

    @Test
    @Transactional
    public void createCheckListItemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = checkListItemRepository.findAll().size();

        // Create the CheckListItem with an existing ID
        checkListItem.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCheckListItemMockMvc.perform(post("/api/check-list-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(checkListItem)))
            .andExpect(status().isBadRequest());

        // Validate the CheckListItem in the database
        List<CheckListItem> checkListItemList = checkListItemRepository.findAll();
        assertThat(checkListItemList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = checkListItemRepository.findAll().size();
        // set the field null
        checkListItem.setName(null);

        // Create the CheckListItem, which fails.

        restCheckListItemMockMvc.perform(post("/api/check-list-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(checkListItem)))
            .andExpect(status().isBadRequest());

        List<CheckListItem> checkListItemList = checkListItemRepository.findAll();
        assertThat(checkListItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIsDoneIsRequired() throws Exception {
        int databaseSizeBeforeTest = checkListItemRepository.findAll().size();
        // set the field null
        checkListItem.setIsDone(null);

        // Create the CheckListItem, which fails.

        restCheckListItemMockMvc.perform(post("/api/check-list-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(checkListItem)))
            .andExpect(status().isBadRequest());

        List<CheckListItem> checkListItemList = checkListItemRepository.findAll();
        assertThat(checkListItemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCheckListItems() throws Exception {
        // Initialize the database
        checkListItemRepository.saveAndFlush(checkListItem);

        // Get all the checkListItemList
        restCheckListItemMockMvc.perform(get("/api/check-list-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(checkListItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].isDone").value(hasItem(DEFAULT_IS_DONE.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getCheckListItem() throws Exception {
        // Initialize the database
        checkListItemRepository.saveAndFlush(checkListItem);

        // Get the checkListItem
        restCheckListItemMockMvc.perform(get("/api/check-list-items/{id}", checkListItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(checkListItem.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.isDone").value(DEFAULT_IS_DONE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCheckListItem() throws Exception {
        // Get the checkListItem
        restCheckListItemMockMvc.perform(get("/api/check-list-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCheckListItem() throws Exception {
        // Initialize the database
        checkListItemService.save(checkListItem);

        int databaseSizeBeforeUpdate = checkListItemRepository.findAll().size();

        // Update the checkListItem
        CheckListItem updatedCheckListItem = checkListItemRepository.findById(checkListItem.getId()).get();
        // Disconnect from session so that the updates on updatedCheckListItem are not directly saved in db
        em.detach(updatedCheckListItem);
        updatedCheckListItem
            .name(UPDATED_NAME)
            .isDone(UPDATED_IS_DONE);

        restCheckListItemMockMvc.perform(put("/api/check-list-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCheckListItem)))
            .andExpect(status().isOk());

        // Validate the CheckListItem in the database
        List<CheckListItem> checkListItemList = checkListItemRepository.findAll();
        assertThat(checkListItemList).hasSize(databaseSizeBeforeUpdate);
        CheckListItem testCheckListItem = checkListItemList.get(checkListItemList.size() - 1);
        assertThat(testCheckListItem.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCheckListItem.isIsDone()).isEqualTo(UPDATED_IS_DONE);
    }

    @Test
    @Transactional
    public void updateNonExistingCheckListItem() throws Exception {
        int databaseSizeBeforeUpdate = checkListItemRepository.findAll().size();

        // Create the CheckListItem

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCheckListItemMockMvc.perform(put("/api/check-list-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(checkListItem)))
            .andExpect(status().isBadRequest());

        // Validate the CheckListItem in the database
        List<CheckListItem> checkListItemList = checkListItemRepository.findAll();
        assertThat(checkListItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCheckListItem() throws Exception {
        // Initialize the database
        checkListItemService.save(checkListItem);

        int databaseSizeBeforeDelete = checkListItemRepository.findAll().size();

        // Delete the checkListItem
        restCheckListItemMockMvc.perform(delete("/api/check-list-items/{id}", checkListItem.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<CheckListItem> checkListItemList = checkListItemRepository.findAll();
        assertThat(checkListItemList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CheckListItem.class);
        CheckListItem checkListItem1 = new CheckListItem();
        checkListItem1.setId(1L);
        CheckListItem checkListItem2 = new CheckListItem();
        checkListItem2.setId(checkListItem1.getId());
        assertThat(checkListItem1).isEqualTo(checkListItem2);
        checkListItem2.setId(2L);
        assertThat(checkListItem1).isNotEqualTo(checkListItem2);
        checkListItem1.setId(null);
        assertThat(checkListItem1).isNotEqualTo(checkListItem2);
    }
}
