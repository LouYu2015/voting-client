import React from 'react';
import {BASE_URL} from '../Configuration';
import Chart from 'chart.js';
import './App.css';

class VoteResultApp extends React.Component {
  state = {count: []};
  chartRef = React.createRef();
  labels = [];
  data = [];

  componentDidMount = () => {
    const myChartRef = this.chartRef.current.getContext("2d");
    Chart.defaults.global.defaultFontSize = 30;
          
    this.chart = new Chart(myChartRef, {
        type: "horizontalBar",
        data: {
            //Bring in data
            labels: this.labels,
            datasets: [
                {
                    label: "Votes",
                    data: this.data,
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.5)',
                      'rgba(54, 162, 235, 0.5)',
                      'rgba(255, 206, 86, 0.5)',
                      'rgba(75, 192, 192, 0.5)',
                      'rgba(153, 102, 255, 0.5)',
                      'rgba(255, 159, 64, 0.5)'
                  ],
                }
            ],
            
        },
        
        options: {
          maintainAspectRatio: false,
          responsive:true,
          legend: {
            display: false,
            position: "top",
          },
          title: {
            display: true,
            fontSize: 30,
            text: "Voting Result",
            fontColor: 'black'
          },
          layout: {
            padding: {
              left: 60,
              right: 120,
              top: 60,
              bottom: 30,
            }
          },
          tooltips: {
            enabled: true,
            bodyFontSize: 23,
            fontColor: 'black'
          },
          scales: {
            xAxes: [{
              ticks: {
                suggestedMin: 0,
                suggestedMax: 10
              }
            }]
          }
        }
    });
    this.onRefresh();
    setInterval(this.onRefresh, 3000);
  }

  onRefresh = () => {
    let question_id = this.props.match.params.question_id;
    fetch(BASE_URL + "vote_count/" + question_id + "/", {cache: "no-cache"})
    .then(async (response) => {
      if (response.ok) {
        this.setState({count: await response.json()});
      }
    });
  }

  render = () => {
    if (this.chart) {
      for (let i = 0; i < this.state.count.length; i++) {
        this.data[i] = this.state.count[i].count;
        this.labels[i] = this.state.count[i].message;
      }
      this.chart.update();
    }

    return (
      <div className="result">
        <div className="logo"><img src='/logo.jpg' alt='pic'></img></div>
        <div className="result-board">
            <canvas ref={this.chartRef}/>
        </div>
      </div>
    );
  }
}

export default VoteResultApp;
