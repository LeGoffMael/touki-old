package com.utbm.isi.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Question.
 */
@Entity
@Table(name = "question")
public class Question implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "text", nullable = false)
    private String text;

    @ManyToOne
    @JsonIgnoreProperties("questions")
    private Survey survey;

    @OneToMany(mappedBy = "question")
    private Set<Answer> answers = new HashSet<>();

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

    public Question text(String text) {
        this.text = text;
        return this;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Survey getSurvey() {
        return survey;
    }

    public Question survey(Survey survey) {
        this.survey = survey;
        return this;
    }

    public void setSurvey(Survey survey) {
        this.survey = survey;
    }

    public Set<Answer> getAnswers() {
        return answers;
    }

    public Question answers(Set<Answer> answers) {
        this.answers = answers;
        return this;
    }

    public Question addAnswers(Answer answer) {
        this.answers.add(answer);
        answer.setQuestion(this);
        return this;
    }

    public Question removeAnswers(Answer answer) {
        this.answers.remove(answer);
        answer.setQuestion(null);
        return this;
    }

    public void setAnswers(Set<Answer> answers) {
        this.answers = answers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Question)) {
            return false;
        }
        return id != null && id.equals(((Question) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Question{" +
            "id=" + getId() +
            ", text='" + getText() + "'" +
            "}";
    }
}
