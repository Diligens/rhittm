import React from 'react'
import { AreaChart, linearGradient, Area, ResponsiveContainer, ReferenceLine } from 'recharts'
import { labelDay, getOffset } from '../../helpers/days.js'
import circle from './circle.js'
import styles from './styles.module.css'

const transformData = (data, day) => data[day].map((amount, index) => ({
  "uv": amount
}))

export default props => (
  <div className={ styles.root }>
    <ResponsiveContainer width="100%" height={ 400 } >
      <AreaChart data={ circle(transformData(props.data, labelDay(props.date.getDay())), getOffset(props.date)) } margin={{
        top: 0,
        bottom: 0,
        left: -10,
        right: 0
      }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#feb692" stopOpacity={ 0.8 } />
            <stop offset="95%" stopColor="#fa7268" stopOpacity={ 0 } />
          </linearGradient>
        </defs>
        <Area type="basis" dataKey="uv" stroke="#feb692" fillOpacity={1} fill="url(#colorUv)" />
        <ReferenceLine x="12" isFront={ true } label="Noon" />
        <ReferenceLine x={ props.date.getHours() } isFront={ true } label="Now" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
)
