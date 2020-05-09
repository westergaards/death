import React from "react";
import { Box, Paper, Grid } from "@material-ui/core";
import { createGlobalState, useMount } from "react-use";
import { StateChart } from "./StateChart";
import { StateTestChart } from "./StateTestChart";
import { stateAbbreviations } from "../models/stateAbbreviations";
import data from "../../data/historical-state-data.json";

export interface State {
  dataQualityGrade: string;
  date: string;
  dateChecked: string;
  datetime: number;
  death: number;
  deathIncrease: number;
  fips: string;
  hash: string;
  hospitalized: null;
  hospitalizedCumulative: null;
  hospitalizedCurrently: number;
  hospitalizedIncrease: number;
  inIcuCumulative: null;
  inIcuCurrently: number;
  lastUpdateEt: string;
  negative: number;
  negativeIncrease: number;
  onVentilatorCumulative: null;
  onVentilatorCurrently: null;
  pending: null;
  posNeg: number;
  positive: number;
  positiveIncrease: number;
  recovered: null;
  state: string;
  total: number;
  totalTestResults: number;
  totalTestResultsIncrease: number;
}

export const useStateStats = createGlobalState<State[]>();

export const StateChartWrapper = () => {
  const [, setStateStats] = useStateStats();

  useMount(() => {
    let stateData = data.map((value) => {
      let dateStr = value.date.toString();

      let newDate = new Date(
        dateStr.slice(0, 4) +
          "/" +
          dateStr.slice(4, dateStr.length - 2) +
          "/" +
          dateStr.slice(6, dateStr.length)
      );

      return {
        datetime: newDate.getTime(),
        date: newDate.toDateString(),
        ...value,
      };
    });
    setStateStats(stateData);
  });

  return (
    <Box display="flex" pr={2}>
      <Grid container spacing={3}>
        {Object.keys(stateAbbreviations).map((key) => (
          <Grid item xs={12} sm={6}>
            <Paper elevation={3}>
              <StateChart state={key} />
            </Paper>
            <Paper elevation={3}>
              <StateTestChart state={key} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
