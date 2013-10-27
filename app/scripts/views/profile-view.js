/*global define*/
define(['backbone',
        'hbs!tmpl/profiili'
        ],
    function(Backbone, Template) {
    'use strict';

    var ProfileView = Backbone.View.extend({
        template: Template,

        render: function() {
            this.el.innerHTML=this.template();
            console.log(this);
            return this;
        }
    });

    return ProfileView;
});
