package com.utbm.isi.domain;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Photo.
 */
@Entity
@Table(name = "photo")
public class Photo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "link", nullable = false)
    private String link;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @ManyToMany
    @JoinTable(name = "photo_steps",
               joinColumns = @JoinColumn(name = "photo_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "steps_id", referencedColumnName = "id"))
    private Set<Step> steps = new HashSet<>();

    @OneToMany(mappedBy = "photo")
    private Set<Reaction> reactions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLink() {
        return link;
    }

    public Photo link(String link) {
        this.link = link;
        return this;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Photo createdAt(Instant createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public Photo updatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Set<Step> getSteps() {
        return steps;
    }

    public Photo steps(Set<Step> steps) {
        this.steps = steps;
        return this;
    }

    public Photo addSteps(Step step) {
        this.steps.add(step);
        step.getPhotos().add(this);
        return this;
    }

    public Photo removeSteps(Step step) {
        this.steps.remove(step);
        step.getPhotos().remove(this);
        return this;
    }

    public void setSteps(Set<Step> steps) {
        this.steps = steps;
    }

    public Set<Reaction> getReactions() {
        return reactions;
    }

    public Photo reactions(Set<Reaction> reactions) {
        this.reactions = reactions;
        return this;
    }

    public Photo addReactions(Reaction reaction) {
        this.reactions.add(reaction);
        reaction.setPhoto(this);
        return this;
    }

    public Photo removeReactions(Reaction reaction) {
        this.reactions.remove(reaction);
        reaction.setPhoto(null);
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
        if (!(o instanceof Photo)) {
            return false;
        }
        return id != null && id.equals(((Photo) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Photo{" +
            "id=" + getId() +
            ", link='" + getLink() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            "}";
    }
}
