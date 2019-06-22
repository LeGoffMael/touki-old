package com.utbm.isi.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Place.
 */
@Entity
@Table(name = "place")
public class Place implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @ManyToOne
    @JsonIgnoreProperties("places")
    private City city;

    @ManyToMany(mappedBy = "places")
    @JsonIgnore
    private Set<Step> steps = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Place name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public City getCity() {
        return city;
    }

    public Place city(City city) {
        this.city = city;
        return this;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public Set<Step> getSteps() {
        return steps;
    }

    public Place steps(Set<Step> steps) {
        this.steps = steps;
        return this;
    }

    public Place addSteps(Step step) {
        this.steps.add(step);
        step.getPlaces().add(this);
        return this;
    }

    public Place removeSteps(Step step) {
        this.steps.remove(step);
        step.getPlaces().remove(this);
        return this;
    }

    public void setSteps(Set<Step> steps) {
        this.steps = steps;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Place)) {
            return false;
        }
        return id != null && id.equals(((Place) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Place{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
