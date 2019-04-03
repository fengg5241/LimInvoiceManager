import { Component, OnInit } from '@angular/core';
import { LangService } from '../lang.service';
import { Chart } from 'angular-highcharts';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  $page_title = "Welcome to Invoice Manager!";
  $name = "Admin (admin@igetpower.com)";
  $settings = {site_name:"site name"};
  total = 1;
  $paid = 1;
  $pp = 1;
  $pending = 1;
  $overdue = 1;
  $cancelled = 1;
  chart: Chart;
  constructor(private langService:LangService) { }

  ngOnInit() {
    this.init();

    $(document).ready(function () {
      function ($) {
        'use strict';
      
        var DataKey = 'lte.tree';
      
        var Default = {
          animationSpeed: 500,
          accordion     : true,
          followLink    : false,
          trigger       : '.treeview a'
        };
      
        var Selector = {
          tree        : '.tree',
          treeview    : '.treeview',
          treeviewMenu: '.treeview-menu',
          open        : '.menu-open, .active',
          li          : 'li',
          data        : '[data-widget="tree"]',
          active      : '.active'
        };
      
        var ClassName = {
          open: 'menu-open',
          tree: 'tree'
        };
      
        var Event = {
          collapsed: 'collapsed.tree',
          expanded : 'expanded.tree'
        };
      
        // Tree Class Definition
        // =====================
        var Tree = function (element, options) {
          this.element = element;
          this.options = options;
      
          $(this.element).addClass(ClassName.tree);
      
          $(Selector.treeview + Selector.active, this.element).addClass(ClassName.open);
      
          this._setUpListeners();
        };
      
        Tree.prototype.toggle = function (link, event) {
          var treeviewMenu = link.next(Selector.treeviewMenu);
          var parentLi     = link.parent();
          var isOpen       = parentLi.hasClass(ClassName.open);
      
          if (!parentLi.is(Selector.treeview)) {
            return;
          }
      
          if (!this.options.followLink || link.attr('href') === '#') {
            event.preventDefault();
          }
      
          if (isOpen) {
            this.collapse(treeviewMenu, parentLi);
          } else {
            this.expand(treeviewMenu, parentLi);
          }
        };
      
        Tree.prototype.expand = function (tree, parent) {
          var expandedEvent = $.Event(Event.expanded);
      
          if (this.options.accordion) {
            var openMenuLi = parent.siblings(Selector.open);
            var openTree   = openMenuLi.children(Selector.treeviewMenu);
            this.collapse(openTree, openMenuLi);
          }
      
          parent.addClass(ClassName.open);
          tree.slideDown(this.options.animationSpeed, function () {
            $(this.element).trigger(expandedEvent);
          }.bind(this));
        };
      
        Tree.prototype.collapse = function (tree, parentLi) {
          var collapsedEvent = $.Event(Event.collapsed);
      
          //tree.find(Selector.open).removeClass(ClassName.open);
          parentLi.removeClass(ClassName.open);
          tree.slideUp(this.options.animationSpeed, function () {
            //tree.find(Selector.open + ' > ' + Selector.treeview).slideUp();
            $(this.element).trigger(collapsedEvent);
          }.bind(this));
        };
      
        // Private
      
        Tree.prototype._setUpListeners = function () {
          var that = this;
      
          $(this.element).on('click', this.options.trigger, function (event) {
            that.toggle($(this), event);
          });
        };
      
        // Plugin Definition
        // =================
        function Plugin(option) {
          return this.each(function () {
            var $this = $(this);
            var data  = $this.data(DataKey);
      
            if (!data) {
              var options = $.extend({}, Default, $this.data(), typeof option == 'object' && option);
              $this.data(DataKey, new Tree($this, options));
            }
          });
        }
      
        var old = $.fn.tree;
      
        $.fn.tree             = Plugin;
        $.fn.tree.Constructor = Tree;
      
        // No Conflict Mode
        // ================
        $.fn.tree.noConflict = function () {
          $.fn.tree = old;
          return this;
        };
      
        // Tree Data API
        // =============
        $(window).on('load', function () {
          $(Selector.data).each(function () {
            Plugin.call($(this));
          });
        });
      
      }($);
   
    });
  }

  lang(word){
    return this.langService.lang(word);
  }

  init() {
      this.chart = new Chart({
        chart: {
          type: 'pie',
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false
        },
        title: {
          text: 'Invoices'
        },
        colors: [ 
          '#43C83C', 
          '#1171A3', 
          '#F88529', 
          '#FA3031', 
          '#000000',
          '#932AB6',
          '#f28f43', 
          '#77a1e5', 
          '#c42525', 
          '#a6c96a'
        ],
        credits: {
          enabled: false
        },
        tooltip: {
          shared: true,
          // valueSuffix: '<?= $Settings->currency_prefix; ?>',
          // headerFormat: '<span style="font-size:18px">{point.key}</span><table>',
          //         pointFormat: '<tr><td style="color:{series.color};padding:5px;">{series.name}: </td>' +
          //             '<td style="color:{series.color};padding:5px;text-align:right;"><b>{point.percentage:.1f}%</b></td></tr>',
          //         footerFormat: '</table>',
          useHTML: true,
          valueDecimals: 2,
          hideDelay: 200,
          crosshairs: true,
          style: {
              fontSize: '15px',
              padding: '10px',
              fontWeight: 'bold',
              color: '#000000'
          }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series : [{
          name: 'Invoices',
          data: [
            [this.lang('paid'),this.$paid],
            [this.lang('partially_paid'),this.$pp], 
            [this.lang('pending'),this.$pending], 
            [this.lang('overdue'),this.$overdue],
            [this.lang('cancelled'),this.$cancelled]]
        }]
      });
  }

}
