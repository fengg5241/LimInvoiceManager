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
    
// Build the chart

    $(document).ready(function () {

    




















//         let thisObject = this;

//         $('#chart').highcharts({
//             chart: {
//                 plotBackgroundColor: null,
//                 plotBorderWidth: null,
//                 plotShadow: false
//             },
//         colors: [ 
//     '#43C83C', 
//     '#1171A3', 
//     '#F88529', 
//     '#FA3031', 
//     '#000000',
//     '#932AB6',
//     '#f28f43', 
//     '#77a1e5', 
//     '#c42525', 
//     '#a6c96a'
// ],
//         credits: {
//             enabled: false
//         },
//             title: {
//                 text: ''
//             },

//         tooltip: {
//         shared: true,
//                 valueSuffix: '<?= $Settings->currency_prefix; ?>',
//         headerFormat: '<span style="font-size:18px">{point.key}</span><table>',
//                 pointFormat: '<tr><td style="color:{series.color};padding:5px;">{series.name}: </td>' +
//                     '<td style="color:{series.color};padding:5px;text-align:right;"><b>{point.percentage:.1f}%</b></td></tr>',
//                 footerFormat: '</table>',
//                 useHTML: true,
//         valueDecimals: 2,
//         hideDelay: 200,
//         crosshairs: true,
//         style: {
//             fontSize: '15px',
//             padding: '10px',
//             fontWeight: 'bold',
//             color: '#000000'
//         }
//         },
//             plotOptions: {
//                 pie: {
//                     allowPointSelect: true,
//                     cursor: 'pointer',
//                     dataLabels: {
//                         enabled: false
//                     },
//                     showInLegend: true
//                 }
//             },
//             series: [{
//                 type: 'pie',
//                 name: 'Invoices',
//                 data: [
//                     /* ['<?= lang('total'); ?>',   <?= $total; ?>],*/
//                         // [thisObject.lang('paid'),   thisObject.$paid]
//                         ['paid',   1]
//             // ['<?= lang('partially_paid'); ?>',   <?= $pp; ?>],
//             // ['<?= lang('pending'); ?>',   <?= $pending; ?>],
//             // ['<?= lang('overdue'); ?>',   <?= $overdue; ?>],
//             // ['<?= lang('cancelled'); ?>',   <?= $cancelled; ?>]
//                 ]
//             }]
//         });
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
