import React from 'react';
import {BASE_URL} from '../Configuration';
import Chart from 'chart.js';
import './test.css';

class VoteResultApp extends React.Component {
  state = {count: []};
  chartRef = React.createRef();
  labels = [];
  data = [];

  componentDidMount = () => {
    const myChartRef = this.chartRef.current.getContext("2d");
          
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
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ],
                }
            ],
            
        },
        
        options: {
          legend: {
            display: false,
            position: "top",
          },
          title: {
            display: true,
            fontSize: 20,
            text: "Results",
            fontColor: 'white'
          },
          layout: {
            padding: {
              left: 50
            }
          },
          tooltips: {
            enabled: false,
            bodyFontSize: 23,
            fontColor: 'white'
          },
          scales: {
            yAxes: [{
              ticks: {
                suggestedMin: 0
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
    fetch(BASE_URL + "vote_count/" + question_id + "/")
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
      <div className="container result">
        <div><img src='/logo.jpg' alt='pic'></img></div>
        <div className="card my-3">
          <div className="card-body">
            <canvas ref={this.chartRef}/>
            <button
                className="btn btn-primary"
                onClick={this.onRefresh}>
              Refresh
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default VoteResultApp;