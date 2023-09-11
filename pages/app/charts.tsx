import { Doughnut, Line, Bar } from 'react-chartjs-2'
import ChartCard from 'example/components/Chart/ChartCard'
import ChartLegend from 'example/components/Chart/ChartLegend'
import PageTitle from 'example/components/Typography/PageTitle'
import Layout from 'example/containers/Layout'
import {
  Chart,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { useCharts } from 'hooks/Charts/useCharts'

function Charts() {
  const {doughnutOptionsDepartment, doughnutOptionsStatus, doughnutOptionsReason} = useCharts();
  Chart.register(
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )

  return (
    <Layout>
      <PageTitle>Análise Gráfica das Reclamações</PageTitle>

      <div className="grid gap-6 mb-8 md:grid-cols-3">
        <ChartCard title="Reclamações por Departamento">
          <Doughnut {...doughnutOptionsDepartment} />
          {/* <ChartLegend legends={doughnutLegends} /> */}
        </ChartCard>

        <ChartCard title="Reclamações por Status">
          <Doughnut {...doughnutOptionsStatus} />
          {/* <ChartLegend legends={doughnutLegends} /> */}
        </ChartCard>

        <ChartCard title="Reclamações por Motivos">
          <Doughnut {...doughnutOptionsReason} />
          {/* <ChartLegend legends={doughnutLegends} /> */}
        </ChartCard>        

        {/* <ChartCard title="Lines">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>

        <ChartCard title="Bars">
          <Bar {...barOptions} />
          <ChartLegend legends={barLegends} />
        </ChartCard> */}
      </div>
    </Layout>
  )
}

export default Charts
