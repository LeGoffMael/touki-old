package com.utbm.isi.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A AnswerUser.
 */
@Entity
@Table(name = "answer_user")
public class AnswerUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "complete_date")
    private Instant completeDate;

    @ManyToOne
    @JsonIgnoreProperties("answers")
    private UserExtra user;

    @ManyToOne
    @JsonIgnoreProperties("answerResults")
    private Answer answer;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getCompleteDate() {
        return completeDate;
    }

    public AnswerUser completeDate(Instant completeDate) {
        this.completeDate = completeDate;
        return this;
    }

    public void setCompleteDate(Instant completeDate) {
        this.completeDate = completeDate;
    }

    public UserExtra getUser() {
        return user;
    }

    public AnswerUser user(UserExtra userExtra) {
        this.user = userExtra;
        return this;
    }

    public void setUser(UserExtra userExtra) {
        this.user = userExtra;
    }

    public Answer getAnswer() {
        return answer;
    }

    public AnswerUser answer(Answer answer) {
        this.answer = answer;
        return this;
    }

    public void setAnswer(Answer answer) {
        this.answer = answer;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AnswerUser)) {
            return false;
        }
        return id != null && id.equals(((AnswerUser) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "AnswerUser{" +
            "id=" + getId() +
            ", completeDate='" + getCompleteDate() + "'" +
            "}";
    }
}
