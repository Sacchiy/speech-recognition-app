import React, { PureComponent } from 'react';
import {
  ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend,
} from 'recharts';

const data = [
  {
    name: 'Page A',  pv: 800, 
  },
  {
    name: 'Page B',  pv: 967, 
  },
  {
    name: 'Page C',  pv: 1098,
  },
  {
    name: 'Page D',  pv: 1200, 
  },
  {
    name: 'Page E',  pv: 1108, 
  },
  {
    name: 'Page F',  pv: 680,
  },
];

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/shjsn5su/';

  render() {
    return (
      <ComposedChart
        layout="vertical"
        width={500}
        height={400}
        data={data}
        margin={{
          top: 20, right: 20, bottom: 20, left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" barSize={20} fill="#413ea0" />
        
      </ComposedChart>
    );
  }
}
