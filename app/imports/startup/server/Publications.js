import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Movies } from '../../api/movie/Movies';
import { Reviews } from '../../api/review/Reviews';
import { Profile } from '../../api/profile/Profile';
import { MovieGenres } from '../../api/movie/MovieGenres';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Movies.userPublicationName, function () {
  if (this.userId) {
    return Movies.collection.find();
  }
  return this.ready();
});

Meteor.publish(MovieGenres.userPublicationName, function () {
  if (this.userId) {
    return MovieGenres.collection.find();
  }
  return this.ready();
});

Meteor.publish(Reviews.userPublicationName, function () {
  if (this.userId) {
    return Reviews.collection.find();
  }
  return this.ready();
});

Meteor.publish(Profile.userPublicationName, function () {
  if (this.userId) {
    return Profile.collection.find();
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Movies.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Movies.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
