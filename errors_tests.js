Tinytest.add("Errors collection works", function(test){
  test.equal(Errors.collection.find({}).count(),0);
  Errors.throw('A test error');
  test.equal(Errors.collection.find({}).count(), 1);
  Errors.collection.remove({});
});

Tinytest.addAsync("Errors Template Works", function(test, done){
  Errors.throw("A new error");
  test.equal(Errors.collection.find({seen: false}).count(), 1);

  OnscreenDiv(Spark.render(function(){
    return Template.meteorErrors();
  }));

  Meteor.setTimeout(function(){
    test.equal(Errors.collection.find({seen: false}).count(), 0);
    test.equal(Errors.collection.find({}).count(), 1);
    Errors.clearSeen();
    test.equal(Errors.collection.find({}).count(), 0);
    done();
  }, 500);
});
