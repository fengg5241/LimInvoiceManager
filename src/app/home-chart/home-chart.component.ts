import { Component, OnInit } from '@angular/core';
import { LangService } from '../lang.service';
import { Chart } from 'angular-highcharts';
import { HttpClient } from '@angular/common/http';
import { UserSessionService } from '../user-session.service'
import * as $ from 'jquery';
@Component({
  selector: 'app-home-chart',
  templateUrl: './home-chart.component.html',
  styleUrls: ['./home-chart.component.css']
})
export class HomeChartComponent implements OnInit {

  $page_title = "Welcome to Invoice Manager!";
  user:any

  // $settings = {site_name:"site name"};
  $settings :any;
  total = 1;
  $paid = 1;
  $pp = 1;
  $pending = 1;
  $overdue = 1;
  $cancelled = 1;
  chart: Chart;
  options:Object;

  constructor(private langService: LangService,
    private userSessionService: UserSessionService,
    private http: HttpClient) { }

  ngOnInit() {
    this.initHome();
  }

  lang(word){
    return this.langService.lang(word);
  }

  async initHome() {
    this.user = JSON.parse(this.userSessionService.getUserInfo());
    let sysSettings = localStorage.getItem("LimSysSettings");
    if(sysSettings){
        this.$settings = JSON.parse(sysSettings);
    }else {
        let sysSettings1 = await this.http.get('/api/sysSetting/selectAll').toPromise()
        this.$settings = sysSettings1[0];
        localStorage.setItem("LimSysSettings",JSON.stringify(sysSettings1[0]));
    }

    this.options = {
      
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
      
    };

      this.chart = new Chart(this.options);
  }

}
