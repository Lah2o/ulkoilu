define(['backbone', 'models/selection'], function(Backbone, Selection) {

    var SelectionCollection = Backbone.Collection.extend({
        model: Selection
    });

    return SelectionCollection;
});
