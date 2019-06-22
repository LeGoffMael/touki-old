package com.utbm.isi.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Answer.
 */
@Entity
@Table(name = "answer")
public class Answer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "text", nullable = false)
    private String text;

    @OneToMany(mappedBy = "answer")
    private Set<AnswerUser> answerResults = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("answers")
    private Question question;

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

    public Answer text(String text) {
        this.text = text;
        return this;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Set<AnswerUser> getAnswerResults() {
        return answerResults;
    }

    public Answer answerResults(Set<AnswerUser> answerUsers) {
        this.answerResults = answerUsers;
        return this;
    }

    public Answer addAnswerResults(AnswerUser answerUser) {
        this.answerResults.add(answerUser);
        answerUser.setAnswer(this);
        return this;
    }

    public Answer removeAnswerResults(AnswerUser answerUser) {
        this.answerResults.remove(answerUser);
        answerUser.setAnswer(null);
        return this;
    }

    public void setAnswerResults(Set<AnswerUser> answerUsers) {
        this.answerResults = answerUsers;
    }

    public Question getQuestion() {
        return question;
    }

    public Answer question(Question question) {
        this.question = question;
        return this;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Answer)) {
            return false;
        }
        return id != null && id.equals(((Answer) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Answer{" +
            "id=" + getId() +
            ", text='" + getText() + "'" +
            "}";
    }
}
