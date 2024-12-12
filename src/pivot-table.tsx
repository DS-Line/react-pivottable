/* eslint-disable  import/no-duplicates */

'use client';

import React, {useState} from 'react';

import './styles.css';

import './pivottable.css';
import PivotTableUI from './PivotTableUI';
import {PivotTableUIProps} from 'react-pivottable/PivotTableUI';
import createPlotlyRenderers from './PlotlyRenderers';
import TableRenderers from './TableRenderers';
import Plot from 'react-plotly.js';

export default function LocalPivotTable({
  data,
}: {
  data: {[k: string]: string}[];
}) {
  const [requiredProps, setRequiredProps] = useState<
    PivotTableUIProps & {
      hideTotals: boolean;
    }
  >({
    data,
    rows: data.length > 0 ? Object.keys(data[0]) : undefined,
    cols: undefined,
    aggregatorName: 'None',
    vals: undefined,
    rendererName: undefined,
    hideTotals: true,
    onChange: (
      e: PivotTableUIProps & {
        hideTotals: boolean;
      }
    ) => {
      setRequiredProps(() => {
        return {
          ...e,
          rows: e.rows?.filter((el) => el !== '3c6'),
          cols: e.cols?.filter((el) => el !== '3ks'),
          aggregatorName:
            e.cols?.filter((el) => el !== '3c6').length === 0 ||
            e.rows?.filter((el) => el !== '3ks').length === 0
              ? 'None'
              : e.aggregatorName === 'None'
                ? 'Count'
                : e.aggregatorName,
        };
      });
    },
    sorters: undefined,
  });

  const PlotlyRenderers = createPlotlyRenderers(Plot as any); // eslint-disable-line
  // useEffect(()=>{
  //   setRequiredProps((e)=>({...e, data:jsonData}))
  // },[jsonData])
  return (
    <div className="pl-8 w-full max-h-[80dvh] h-full overflow-y-auto showSQL">
      <PivotTableUI
        //    data={data}
        renderers={{...TableRenderers, ...PlotlyRenderers}}
        {...requiredProps}
      />
    </div>
  );
}
