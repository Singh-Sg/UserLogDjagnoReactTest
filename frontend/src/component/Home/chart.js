import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
import moment from 'moment';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class Chart extends Component {	
  render() {
	const connect = this.props.connections.map(function(data){
		return {label:data.month, y:data.count}
	})
    const options = {
      title: {
        text: "User Connected in months"
      },
      data: [{				
                type: "column",
                dataPoints:connect
       }]
   }
		
   return (
      <div>
        <CanvasJSChart options = {options}
        />
      </div>
    );
  }
}