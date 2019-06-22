package com.utbm.isi.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import com.utbm.isi.domain.enumeration.ReactionType;

/**
 * A Reaction.
 */
@Entity
@Table(name = "reaction")
public class Reaction implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private ReactionType type;

    @ManyToOne
    @JsonIgnoreProperties("reactions")
    private UserExtra owner;

    @ManyToOne
    @JsonIgnoreProperties("reactions")
    private Travel travel;

    @ManyToOne
    @JsonIgnoreProperties("reactions")
    private Photo photo;

    @ManyToOne
    @JsonIgnoreProperties("reactions")
    private Comment comment;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ReactionType getType() {
        return type;
    }

    public Reaction type(ReactionType type) {
        this.type = type;
        return this;
    }

    public void setType(ReactionType type) {
        this.type = type;
    }

    public UserExtra getOwner() {
        return owner;
    }

    public Reaction owner(UserExtra userExtra) {
        this.owner = userExtra;
        return this;
    }

    public void setOwner(UserExtra userExtra) {
        this.owner = userExtra;
    }

    public Travel getTravel() {
        return travel;
    }

    public Reaction travel(Travel travel) {
        this.travel = travel;
        return this;
    }

    public void setTravel(Travel travel) {
        this.travel = travel;
    }

    public Photo getPhoto() {
        return photo;
    }

    public Reaction photo(Photo photo) {
        this.photo = photo;
        return this;
    }

    public void setPhoto(Photo photo) {
        this.photo = photo;
    }

    public Comment getComment() {
        return comment;
    }

    public Reaction comment(Comment comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(Comment comment) {
        this.comment = comment;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Reaction)) {
            return false;
        }
        return id != null && id.equals(((Reaction) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Reaction{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            "}";
    }
}
