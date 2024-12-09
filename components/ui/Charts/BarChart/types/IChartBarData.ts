export interface IChartBarData {
  labels: string[];
  datasets: Array<{
    label: string;
    backgroundColor: string | string[];
    borderColor: string | string[];
    borderWidth: number;
    data: number[];
  }>;
}
