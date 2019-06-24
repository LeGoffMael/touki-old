package com.utbm.isi.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A UserExtra.
 */
@Entity
@Table(name = "user_extra")
public class UserExtra implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private Long id;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Column(name = "description")
    private String description;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "user")
    private Set<AnswerUser> answers = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "user_extra_badges",
               joinColumns = @JoinColumn(name = "user_extra_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "badges_id", referencedColumnName = "id"))
    private Set<Badge> badges = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "user_extra_followings",
               joinColumns = @JoinColumn(name = "user_extra_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "followings_id", referencedColumnName = "id"))
   @JsonIgnoreProperties(ignoreUnknown = true,
                             value = {"followers", "followings"})
    private Set<UserExtra> followings = new HashSet<>();

    @OneToMany(mappedBy = "owner")
    private Set<Comment> comments = new HashSet<>();

    @OneToMany(mappedBy = "owner")
    private Set<Reaction> reactions = new HashSet<>();

    @ManyToMany(mappedBy = "users", fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"users"})
    private Set<Travel> travels = new HashSet<>();

    @ManyToMany(mappedBy = "followings", fetch = FetchType.EAGER)
    @JsonIgnoreProperties(ignoreUnknown = true,
                          value = {"followers", "followings"})
    private Set<UserExtra> followers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public UserExtra id(Long id) {
        this.id = id;
        return this;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public UserExtra birthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
        return this;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getDescription() {
        return description;
    }

    public UserExtra description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getUser() {
        return user;
    }

    public UserExtra user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<AnswerUser> getAnswers() {
        return answers;
    }

    public UserExtra answers(Set<AnswerUser> answerUsers) {
        this.answers = answerUsers;
        return this;
    }

    public UserExtra addAnswers(AnswerUser answerUser) {
        this.answers.add(answerUser);
        answerUser.setUser(this);
        return this;
    }

    public UserExtra removeAnswers(AnswerUser answerUser) {
        this.answers.remove(answerUser);
        answerUser.setUser(null);
        return this;
    }

    public void setAnswers(Set<AnswerUser> answerUsers) {
        this.answers = answerUsers;
    }

    public Set<Badge> getBadges() {
        return badges;
    }

    public UserExtra badges(Set<Badge> badges) {
        this.badges = badges;
        return this;
    }

    public UserExtra addBadges(Badge badge) {
        this.badges.add(badge);
        badge.getUsers().add(this);
        return this;
    }

    public UserExtra removeBadges(Badge badge) {
        this.badges.remove(badge);
        badge.getUsers().remove(this);
        return this;
    }

    public void setBadges(Set<Badge> badges) {
        this.badges = badges;
    }

    public Set<UserExtra> getFollowings() {
        return followings;
    }

    public UserExtra followings(Set<UserExtra> userExtras) {
        this.followings = userExtras;
        return this;
    }

    public UserExtra addFollowings(UserExtra userExtra) {
        this.followings.add(userExtra);
        userExtra.getFollowers().add(this);
        return this;
    }

    public UserExtra removeFollowings(UserExtra userExtra) {
        this.followings.remove(userExtra);
        userExtra.getFollowers().remove(this);
        return this;
    }

    public void setFollowings(Set<UserExtra> userExtras) {
        this.followings = userExtras;
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public UserExtra comments(Set<Comment> comments) {
        this.comments = comments;
        return this;
    }

    public UserExtra addComments(Comment comment) {
        this.comments.add(comment);
        comment.setOwner(this);
        return this;
    }

    public UserExtra removeComments(Comment comment) {
        this.comments.remove(comment);
        comment.setOwner(null);
        return this;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }

    public Set<Reaction> getReactions() {
        return reactions;
    }

    public UserExtra reactions(Set<Reaction> reactions) {
        this.reactions = reactions;
        return this;
    }

    public UserExtra addReactions(Reaction reaction) {
        this.reactions.add(reaction);
        reaction.setOwner(this);
        return this;
    }

    public UserExtra removeReactions(Reaction reaction) {
        this.reactions.remove(reaction);
        reaction.setOwner(null);
        return this;
    }

    public void setReactions(Set<Reaction> reactions) {
        this.reactions = reactions;
    }

    public Set<Travel> getTravels() {
        return travels;
    }

    public UserExtra travels(Set<Travel> travels) {
        this.travels = travels;
        return this;
    }

    public UserExtra addTravels(Travel travel) {
        this.travels.add(travel);
        travel.getUsers().add(this);
        return this;
    }

    public UserExtra removeTravels(Travel travel) {
        this.travels.remove(travel);
        travel.getUsers().remove(this);
        return this;
    }

    public void setTravels(Set<Travel> travels) {
        this.travels = travels;
    }

    public Set<UserExtra> getFollowers() {
        return followers;
    }

    public UserExtra followers(Set<UserExtra> userExtras) {
        this.followers = userExtras;
        return this;
    }

    public UserExtra addFollowers(UserExtra userExtra) {
        this.followers.add(userExtra);
        userExtra.getFollowings().add(this);
        return this;
    }

    public UserExtra removeFollowers(UserExtra userExtra) {
        this.followers.remove(userExtra);
        userExtra.getFollowings().remove(this);
        return this;
    }

    public void setFollowers(Set<UserExtra> userExtras) {
        this.followers = userExtras;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserExtra)) {
            return false;
        }
        return id != null && id.equals(((UserExtra) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "UserExtra{" +
            "id=" + getId() +
            ", birthDate='" + getBirthDate() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
