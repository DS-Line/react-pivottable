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
  setConfigurations,
}: {
  configurations: Omit<PivotTableUIProps, 'onChange'> & {
    hideTotals: boolean;
  };
  setConfigurations: (
    value: Omit<PivotTableUIProps, 'onChange'> & {
      hideTotals: boolean;
    }
  ) => void;
}) {
  const PlotlyRenderers = createPlotlyRenderers(Plot as any); // eslint-disable-line

  return (
    <div className="pl-8 w-full max-h-[80dvh] h-full overflow-y-auto showSQL">
      <PivotTableUI
        //    data={data}
        renderers={{...TableRenderers, ...PlotlyRenderers}}
        {...configurations}
        key="pivot-table"
        onChange={(
          e: Omit<PivotTableUIProps, 'onChange'> & {
            hideTotals: boolean;
          }
        ) => {
          const {aggregators, renderers, ...rest} = e;
          const newAdditionToCols = e.cols?.filter(
            (el) => !configurations.cols?.includes(el)
          );
          const newRowsData = e.rows?.filter(
            (el) => !newAdditionToCols?.includes(el)
          );
          const newAdditionToRows = e.rows?.filter(
            (el) => !configurations.rows?.includes(el)
          );
          const newColsData = e.cols?.filter(
            (el) => !newAdditionToRows?.includes(el)
          );
          setConfigurations({
            ...rest,
            rows: newRowsData,
            cols: newColsData,
          });
        }}
      />
    </div>
  );
}
