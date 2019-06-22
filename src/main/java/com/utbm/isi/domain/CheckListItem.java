package com.utbm.isi.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A CheckListItem.
 */
@Entity
@Table(name = "check_list_item")
public class CheckListItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "is_done", nullable = false)
    private Boolean isDone;

    @ManyToOne
    @JsonIgnoreProperties("checkListItems")
    private Travel travel;

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

    public CheckListItem name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean isIsDone() {
        return isDone;
    }

    public CheckListItem isDone(Boolean isDone) {
        this.isDone = isDone;
        return this;
    }

    public void setIsDone(Boolean isDone) {
        this.isDone = isDone;
    }

    public Travel getTravel() {
        return travel;
    }

    public CheckListItem travel(Travel travel) {
        this.travel = travel;
        return this;
    }

    public void setTravel(Travel travel) {
        this.travel = travel;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CheckListItem)) {
            return false;
        }
        return id != null && id.equals(((CheckListItem) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "CheckListItem{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", isDone='" + isIsDone() + "'" +
            "}";
    }
}
