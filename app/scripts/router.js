/*global define*/
define([
    'backbone',
    'views/map-view',
    'views/haaste-view',
    'views/single-photo-view',
    'collections/photos-collection',
    'views/profile-view',
    'views/registration-view'
], function(Backbone, MapView, HaasteView, KuvaView, PhotosCollection, ProfileView, RegistrationView) {

    'use strict';

    var MainRouter = Backbone.Router.extend({

        routes: {
            '': 'showPage',
            ':page': 'showPage',
            'photos/:id': 'photoDetails',
        },

        showPage: function(page) {
            page = page || '';
            switch(page) {
            case '':
                this.mapView = this.mapView || new MapView();
                $('#page').html(this.mapView.render().el);
                this.mapView.renderMap();
                break;
            case 'haaste':
                this.photosCollection = this.photosCollection || new PhotosCollection();
                this.haasteView = this.haasteView || new HaasteView({ collection: this.photosCollection });

                $('#page').html(this.haasteView.render().el);
                break;
            case 'profiili':
                $('#page').html(new ProfileView().render().el);
                break;
            case 'rekisteroityminen':
                $('#page').html(new RegistrationView().render().el);
                break;
            default:
                console.error('Tuntematon sivu ' + page);
                break;
            }
        },

        photoDetails: function(photoId) {
            if( ! this.photosCollection ) {
                this.photosCollection = new PhotosCollection();
                this.photosCollection.once('sync', function() {
                    this.photo = this.photosCollection.findWhere({id: photoId});
                    this.kuvaView = new KuvaView({model: this.photo});
                    $('#page').html(this.kuvaView.render().el);
                },this);
            }
            else {
                this.photo = this.photosCollection.findWhere({id: photoId});
                this.kuvaView = new KuvaView({model: this.photo});
                $('#page').html(this.kuvaView.render().el);
            }


        },


    });

    return MainRouter;
});
