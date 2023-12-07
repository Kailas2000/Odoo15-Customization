odoo.define('button_near_create.kanban_button', function(require) {
"use strict";

var KanbanRenderer = require('web.KanbanRenderer');
var KanbanRecord = require('web.KanbanRecord');
var KanbanController = require('web.KanbanController');
var KanbanView = require('web.KanbanView');
var core = require('web.core');
var Domain = require('web.Domain');
var viewRegistry = require('web.view_registry');
var QWeb = core.qweb;

        var SalespersonKanbanRenderer = KanbanRenderer.extend({
            config: Object.assign({}, KanbanRenderer.prototype.config, {
                KanbanRecord: SalespersonKanbanRenderer,
            }),
                _renderView: function () {
                var self = this;
                const sales_person = this._rpc({
                    model: 'res.users',
                    method: 'search_read',
                    domain: [['share', '=', false]],
                }).then((sales_person)=>{
                    this.$el.prepend(QWeb.render('sales_person_filter.CustomKanbanView', {'data': sales_person}))
                })
                return this._super.apply(this, arguments)
            }
        });
        var SalespersonKanbanController = KanbanController.extend({
            events: _.extend({}, KanbanController.prototype.events, {
               'change .sales-person-render': 'onChange_sales_person',
            }),
            onChange_sales_person: function (e) {
                if (e.currentTarget.value) {
                    const preFilters = {
                        description: `Salesperson is ${e.currentTarget.value}`,
                        domain: Domain.prototype.arrayToString([['user_id', 'ilike',`${e.currentTarget.value}`]]),
                        type: 'filter',
                    }
                    this.searchModel.dispatch('createNewFilters', [preFilters]);
                }
            }
        });
       var SalespersonKanbanView = KanbanView.extend({
           config: _.extend({}, KanbanView.prototype.config, {
                Controller: SalespersonKanbanController,
                Renderer: SalespersonKanbanRenderer
           }),
       });
   viewRegistry.add('custom_kanban', SalespersonKanbanView);
});
