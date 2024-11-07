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
import { useChartsComplaints } from 'hooks/Charts/useChartsComplaints'

function ChartsComplaints() {
  const { doughnutOptionsAnonymity, doughnutOptionsCompany, doughnutOptionsDepartment, doughnutOptionsCategory, doughnutOptionsStatus, doughnutOptionsWitness } = useChartsComplaints();
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
      <PageTitle>Análise Gráfica das Denúncias</PageTitle>

      <div className="grid gap-6 mb-8 md:grid-cols-3">
        <ChartCard title="Denúncias por Anonimidade">
          <Doughnut {...doughnutOptionsAnonymity} />
          {/* <ChartLegend legends={doughnutLegends} /> */}
        </ChartCard>

        <ChartCard title="Denúncias por Empresa">
          <Doughnut {...doughnutOptionsCompany} />
          {/* <ChartLegend legends={doughnutLegends} /> */}
        </ChartCard>

        <ChartCard title="Denúncias por Departamento">
          <Doughnut {...doughnutOptionsDepartment} />
          {/* <ChartLegend legends={doughnutLegends} /> */}
        </ChartCard>

        <ChartCard title="Denúncias por Status">
          <Doughnut {...doughnutOptionsStatus} />
          {/* <ChartLegend legends={doughnutLegends} /> */}
        </ChartCard>

        <ChartCard title="Denúncias por Motivos">
          <Doughnut {...doughnutOptionsCategory} />
          {/* <ChartLegend legends={doughnutLegends} /> */}
        </ChartCard>

        <ChartCard title="Denúncias por Testemunhas">
          <Doughnut {...doughnutOptionsWitness} />
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

export default ChartsComplaints
