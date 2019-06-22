package com.utbm.isi.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Badge.
 */
@Entity
@Table(name = "badge")
public class Badge implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "label", nullable = false)
    private String label;

    @Column(name = "icon")
    private String icon;

    @Column(name = "text")
    private String text;

    @ManyToMany(mappedBy = "badges")
    @JsonIgnore
    private Set<UserExtra> users = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public Badge label(String label) {
        this.label = label;
        return this;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getIcon() {
        return icon;
    }

    public Badge icon(String icon) {
        this.icon = icon;
        return this;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getText() {
        return text;
    }

    public Badge text(String text) {
        this.text = text;
        return this;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Set<UserExtra> getUsers() {
        return users;
    }

    public Badge users(Set<UserExtra> userExtras) {
        this.users = userExtras;
        return this;
    }

    public Badge addUsers(UserExtra userExtra) {
        this.users.add(userExtra);
        userExtra.getBadges().add(this);
        return this;
    }

    public Badge removeUsers(UserExtra userExtra) {
        this.users.remove(userExtra);
        userExtra.getBadges().remove(this);
        return this;
    }

    public void setUsers(Set<UserExtra> userExtras) {
        this.users = userExtras;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Badge)) {
            return false;
        }
        return id != null && id.equals(((Badge) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Badge{" +
            "id=" + getId() +
            ", label='" + getLabel() + "'" +
            ", icon='" + getIcon() + "'" +
            ", text='" + getText() + "'" +
            "}";
    }
}
