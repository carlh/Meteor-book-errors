Template.meteorErrors.helpers({
  errors: Errors.collection.find()
});

Template.meteorError.rendered = function(){
  var error = this.data;
  Meteor.defer(function(){
    Errors.collection.update(error._id, { $set: {seen: true}});
  });
};
