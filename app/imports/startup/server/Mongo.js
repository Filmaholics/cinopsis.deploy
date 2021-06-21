import { Meteor } from 'meteor/meteor';
import { Movies } from '../../api/movie/Movies.js';
import { MovieGenres } from '../../api/movie/MovieGenres.js';
import { Profile } from '../../api/profile/Profile';
import { Users } from '../../api/user/User';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addMovie(data) {
  console.log(`  Adding: ${data.title} (${data.owner})`);
  Movies.collection.insert(data);
}

function addGenres(data) {
  MovieGenres.collection.insert(data);
}

function addProfile(data) {
  Profile.collection.insert(data);
}

// Initialize the database with a default profile document.
function addProfiles(user) {
  console.log(`  Adding: ${user.email})`);
  Users.collection.insert(user);
}

// Initialize the StuffsCollection if empty.
if (Movies.collection.find().count() === 0) {
  if (Meteor.settings.defaultMovies) {
    console.log('Creating default data.');
    Meteor.settings.defaultMovies.map(data => addMovie(data));
  }
}

if (MovieGenres.collection.find().count() === 0) {
  if (Meteor.settings.defaultMovieGenres) {
    console.log('Creating default data.');
    Meteor.settings.defaultMovieGenres.map(data => addGenres(data));
  }
}

if (Profile.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfile) {
    console.log('Creating list of possible genres.');
    Meteor.settings.defaultProfile.map(data => addProfile(data));
  }
}

if (Users.collection.find().count() === 0) {
  if (Meteor.settings.defaultUserProfile) {
    console.log('Creating default profiles.');
    Meteor.settings.defaultUserProfile.map(user => addProfiles(user));
  }
}
