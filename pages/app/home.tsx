import React, { useState, useEffect } from 'react'
import { Doughnut, Line } from 'react-chartjs-2'

import CTA from 'example/components/CTA'
import InfoCard from 'example/components/Cards/InfoCard'
import ChartCard from 'example/components/Chart/ChartCard'
import ChartLegend from 'example/components/Chart/ChartLegend'
import PageTitle from 'example/components/Typography/PageTitle'
import RoundIcon from 'example/components/RoundIcon'
import Layout from 'example/containers/Layout'
import response, { ITableData } from 'utils/demo/tableData'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from 'icons'

import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
} from '@roketid/windmill-react-ui'

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from 'utils/demo/chartsData'

import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import SectionTitle from 'example/components/Typography/SectionTitle'
import TableRsolve from 'components/Table/TableRsolve'
import { useGrievances } from 'hooks/Grievance/useGrievances'
import { useTables } from 'hooks/Table/useTable'
import { fetchData } from 'hooks/FetchData/fecthData'

function Home() {
  const [statuses, setStatuses] = useState([]);
  const [countByStatuses, setCountByStatuses] = useState([]);
  const { grievances } = useGrievances();

  useEffect(() => {
    fetchData("statuses", setStatuses, "");
  }, []);

  useEffect(() => {
    fetchData("grievances/view/count/status", setCountByStatuses, "");
  }, []);

  console.log("Count By Statuses");
  console.log(countByStatuses);

  Chart.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )

  // setup pages control for every table
  const [pageTable, setPageTable] = useState(1);

  // pagination setup
  const resultsPerPage = 5;
  const totalResults = grievances.length;

  const {
    displayedGrievances: displayedTableGrievances,
    // ... outras funções e estados do useTables
  } = useTables({
    data: grievances,
    pageTable,
    resultsPerPage,
  });

  // pagination change control
  function onPageChangeTable(p: number) {
    setPageTable(p);
  }

  // const [page, setPage] = useState(1)
  // const [data, setData] = useState<ITableData[]>([])

  // // pagination setup
  // const resultsPerPage = 10
  // const totalResults = response.length

  // // pagination change control
  // function onPageChange(p: number) {
  //   setPage(p)
  // }

  // // on page change, load new sliced data
  // // here you would make another server request for new data
  // useEffect(() => {
  //   setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage))
  // }, [page])

  function getColorBasedOnStatus(status: string) {
    switch (status) {
      case 'Recebido':
        return "bg-orange-100 dark:bg-orange-500";
      case 'Em Tratamento':
        return "bg-blue-100 dark:bg-blue-500";
      case 'Finalizado':
        return "bg-lime-100 dark:bg-lime-500";
      case 'Pendente':
        return "bg-red-100 dark:bg-red-500";
      case 'Improcedente':
        return "bg-purple-100 dark:bg-purple-500";
      default:
        return '#6b7280';
    }
  }

  return (
    <Layout>
      {/* <PageTitle>Home</PageTitle> */}

      {/* <!-- Cards --> */}
      <SectionTitle>Denúncias</SectionTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-5">
        <InfoCard title="Recebidas" value="35">
          {/* @ts-ignore */}
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Em Tratamento" value="6">
          {/* @ts-ignore */}
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Pendentes" value="19">
          {/* @ts-ignore */}
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Improcedente" value="19">
          {/* @ts-ignore */}
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Finalizadas" value="35">
          {/* @ts-ignore */}
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

      {/* <!-- Cards --> */}
      <SectionTitle>Reclamações</SectionTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-5">
        {countByStatuses.map((countByStatus) => (
          <InfoCard key={countByStatus.id} title={countByStatus.status} value={countByStatus.total}>
            {/* @ts-ignore */}
            <RoundIcon
              icon={PeopleIcon}
              iconColorClass="text-orange-500 dark:text-orange-100"
              bgColorClass={getColorBasedOnStatus(countByStatus.status)}
              className="mr-4"
            />
          </InfoCard>
        ))}
      </div>

      <TableRsolve
        data={grievances}
        columns={[
          // { label: 'ID', key: 'id' },
          { label: 'Data', key: 'createdAt' },
          { label: 'Protocolo', key: 'protocol' },
          { label: 'Situação', key: 'statusName' },
          { label: 'Reclamante', key: 'userName' },
          { label: 'Departamento', key: 'departmentName' },
        ]}
        currentPage={pageTable}
        totalResults={totalResults}
        resultsPerPage={resultsPerPage}
        onPageChangeTable={onPageChangeTable}
        onEdit={null}
        onDelete={null}
      />

      {/* <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Client</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar
                      className="hidden mr-3 md:block"
                      src={user.avatar}
                      alt="User image"
                    />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {user.job}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">$ {user.amount}</span>
                </TableCell>
                <TableCell>
                  <Badge type={user.status}>{user.status}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {new Date(user.date).toLocaleDateString()}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>

      <PageTitle>Charts</PageTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="Revenue">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="Traffic">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>
      </div> */}
    </Layout>
  )
}

export default Home
