package com.utbm.isi.domain;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.utbm.isi.domain.enumeration.TravelStatus;

/**
 * A Travel.
 */
@Entity
@Table(name = "travel")
public class Travel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(min = 2, max = 20)
    @Column(name = "title", length = 20, nullable = false)
    private String title;

    @Size(max = 200)
    @Column(name = "description", length = 200)
    private String description;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private TravelStatus status;

    @Column(name = "precaution")
    private String precaution;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @OneToMany(mappedBy = "travel")
    private Set<Survey> surveys = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "travel_users",
               joinColumns = @JoinColumn(name = "travel_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "users_id", referencedColumnName = "id"))
    private Set<UserExtra> users = new HashSet<>();

    @OneToMany(mappedBy = "travel")
    private Set<Step> steps = new HashSet<>();

    @OneToMany(mappedBy = "travel")
    private Set<CheckListItem> checkListItems = new HashSet<>();

    @OneToMany(mappedBy = "travel")
    private Set<Comment> comments = new HashSet<>();

    @OneToMany(mappedBy = "travel")
    private Set<Reaction> reactions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Travel title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public Travel description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public Travel startDate(LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public Travel endDate(LocalDate endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public TravelStatus getStatus() {
        return status;
    }

    public Travel status(TravelStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(TravelStatus status) {
        this.status = status;
    }

    public String getPrecaution() {
        return precaution;
    }

    public Travel precaution(String precaution) {
        this.precaution = precaution;
        return this;
    }

    public void setPrecaution(String precaution) {
        this.precaution = precaution;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Travel createdAt(Instant createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public Travel updatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Set<Survey> getSurveys() {
        return surveys;
    }

    public Travel surveys(Set<Survey> surveys) {
        this.surveys = surveys;
        return this;
    }

    public Travel addSurveys(Survey survey) {
        this.surveys.add(survey);
        survey.setTravel(this);
        return this;
    }

    public Travel removeSurveys(Survey survey) {
        this.surveys.remove(survey);
        survey.setTravel(null);
        return this;
    }

    public void setSurveys(Set<Survey> surveys) {
        this.surveys = surveys;
    }

    public Set<UserExtra> getUsers() {
        return users;
    }

    public Travel users(Set<UserExtra> userExtras) {
        this.users = userExtras;
        return this;
    }

    public Travel addUsers(UserExtra userExtra) {
        this.users.add(userExtra);
        userExtra.getTravels().add(this);
        return this;
    }

    public Travel removeUsers(UserExtra userExtra) {
        this.users.remove(userExtra);
        userExtra.getTravels().remove(this);
        return this;
    }

    public void setUsers(Set<UserExtra> userExtras) {
        this.users = userExtras;
    }

    public Set<Step> getSteps() {
        return steps;
    }

    public Travel steps(Set<Step> steps) {
        this.steps = steps;
        return this;
    }

    public Travel addSteps(Step step) {
        this.steps.add(step);
        step.setTravel(this);
        return this;
    }

    public Travel removeSteps(Step step) {
        this.steps.remove(step);
        step.setTravel(null);
        return this;
    }

    public void setSteps(Set<Step> steps) {
        this.steps = steps;
    }

    public Set<CheckListItem> getCheckListItems() {
        return checkListItems;
    }

    public Travel checkListItems(Set<CheckListItem> checkListItems) {
        this.checkListItems = checkListItems;
        return this;
    }

    public Travel addCheckListItems(CheckListItem checkListItem) {
        this.checkListItems.add(checkListItem);
        checkListItem.setTravel(this);
        return this;
    }

    public Travel removeCheckListItems(CheckListItem checkListItem) {
        this.checkListItems.remove(checkListItem);
        checkListItem.setTravel(null);
        return this;
    }

    public void setCheckListItems(Set<CheckListItem> checkListItems) {
        this.checkListItems = checkListItems;
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public Travel comments(Set<Comment> comments) {
        this.comments = comments;
        return this;
    }

    public Travel addComments(Comment comment) {
        this.comments.add(comment);
        comment.setTravel(this);
        return this;
    }

    public Travel removeComments(Comment comment) {
        this.comments.remove(comment);
        comment.setTravel(null);
        return this;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }

    public Set<Reaction> getReactions() {
        return reactions;
    }

    public Travel reactions(Set<Reaction> reactions) {
        this.reactions = reactions;
        return this;
    }

    public Travel addReactions(Reaction reaction) {
        this.reactions.add(reaction);
        reaction.setTravel(this);
        return this;
    }

    public Travel removeReactions(Reaction reaction) {
        this.reactions.remove(reaction);
        reaction.setTravel(null);
        return this;
    }

    public void setReactions(Set<Reaction> reactions) {
        this.reactions = reactions;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Travel)) {
            return false;
        }
        return id != null && id.equals(((Travel) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Travel{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", status='" + getStatus() + "'" +
            ", precaution='" + getPrecaution() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            "}";
    }
}
