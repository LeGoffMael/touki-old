package com.utbm.isi.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A City.
 */
@Entity
@Table(name = "city")
public class City implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "latitude")
    private Float latitude;

    @Column(name = "longitude")
    private Float longitude;

    @ManyToOne
    @JsonIgnoreProperties("cities")
    private Country country;

    @OneToMany(mappedBy = "city")
    private Set<Step> steps = new HashSet<>();

    @OneToMany(mappedBy = "city")
    private Set<Place> places = new HashSet<>();

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

    public City name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Float getLatitude() {
        return latitude;
    }

    public City latitude(Float latitude) {
        this.latitude = latitude;
        return this;
    }

    public void setLatitude(Float latitude) {
        this.latitude = latitude;
    }

    public Float getLongitude() {
        return longitude;
    }

    public City longitude(Float longitude) {
        this.longitude = longitude;
        return this;
    }

    public void setLongitude(Float longitude) {
        this.longitude = longitude;
    }

    public Country getCountry() {
        return country;
    }

    public City country(Country country) {
        this.country = country;
        return this;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public Set<Step> getSteps() {
        return steps;
    }

    public City steps(Set<Step> steps) {
        this.steps = steps;
        return this;
    }

    public City addSteps(Step step) {
        this.steps.add(step);
        step.setCity(this);
        return this;
    }

    public City removeSteps(Step step) {
        this.steps.remove(step);
        step.setCity(null);
        return this;
    }

    public void setSteps(Set<Step> steps) {
        this.steps = steps;
    }

    public Set<Place> getPlaces() {
        return places;
    }

    public City places(Set<Place> places) {
        this.places = places;
        return this;
    }

    public City addPlaces(Place place) {
        this.places.add(place);
        place.setCity(this);
        return this;
    }

    public City removePlaces(Place place) {
        this.places.remove(place);
        place.setCity(null);
        return this;
    }

    public void setPlaces(Set<Place> places) {
        this.places = places;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof City)) {
            return false;
        }
        return id != null && id.equals(((City) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "City{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", latitude=" + getLatitude() +
            ", longitude=" + getLongitude() +
            "}";
    }
}
