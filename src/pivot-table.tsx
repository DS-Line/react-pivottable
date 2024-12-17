/* eslint-disable  import/no-duplicates */

'use client';

import React from 'react';

import './styles.css';

import './pivottable.css';
import PivotTableUI from './PivotTableUI';
import {PivotTableUIProps} from 'react-pivottable/PivotTableUI';
import createPlotlyRenderers from './PlotlyRenderers';
import TableRenderers from './TableRenderers';
import Plot from 'react-plotly.js';

export default function LocalPivotTable({
  configurations,
  setConfigurations
}: {
  configurations:  Omit<PivotTableUIProps,"onChange"> & {
        hideTotals: boolean
      };
  setConfigurations:(value:Omit<PivotTableUIProps,"onChange"> & {
    hideTotals: boolean
  })=> void
}) {
  const PlotlyRenderers = createPlotlyRenderers(Plot as any); // eslint-disable-line

  return (
    <div className="pl-8 w-full max-h-[80dvh] h-full overflow-y-auto showSQL">
      <PivotTableUI
        //    data={data}
        renderers={{...TableRenderers, ...PlotlyRenderers}}
        {...configurations}
        onChange={(e:Omit<PivotTableUIProps,"onChange"> & {
          hideTotals: boolean
        })=>{
          const {aggregators, renderers, ...rest}=e
          setConfigurations(({
            ...rest,
            rows: rest.rows?.filter((el) => el !== "3c6"),
            cols: rest.cols?.filter((el) => el !== "3ks")
          }))
        }}
      />
    </div>
  );
}
