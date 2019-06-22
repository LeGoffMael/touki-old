package com.utbm.isi.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Comment.
 */
@Entity
@Table(name = "comment")
public class Comment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "text", nullable = false)
    private String text;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @ManyToOne
    @JsonIgnoreProperties("comments")
    private Travel travel;

    @ManyToOne
    @JsonIgnoreProperties("comments")
    private UserExtra owner;

    @OneToMany(mappedBy = "comment")
    private Set<Reaction> reactions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public Comment text(String text) {
        this.text = text;
        return this;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Comment createdAt(Instant createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public Comment updatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Travel getTravel() {
        return travel;
    }

    public Comment travel(Travel travel) {
        this.travel = travel;
        return this;
    }

    public void setTravel(Travel travel) {
        this.travel = travel;
    }

    public UserExtra getOwner() {
        return owner;
    }

    public Comment owner(UserExtra userExtra) {
        this.owner = userExtra;
        return this;
    }

    public void setOwner(UserExtra userExtra) {
        this.owner = userExtra;
    }

    public Set<Reaction> getReactions() {
        return reactions;
    }

    public Comment reactions(Set<Reaction> reactions) {
        this.reactions = reactions;
        return this;
    }

    public Comment addReactions(Reaction reaction) {
        this.reactions.add(reaction);
        reaction.setComment(this);
        return this;
    }

    public Comment removeReactions(Reaction reaction) {
        this.reactions.remove(reaction);
        reaction.setComment(null);
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
        if (!(o instanceof Comment)) {
            return false;
        }
        return id != null && id.equals(((Comment) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Comment{" +
            "id=" + getId() +
            ", text='" + getText() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            "}";
    }
}
