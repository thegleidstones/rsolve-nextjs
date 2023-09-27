import { fetchData } from "hooks/FetchData/fecthData"
import { useEffect, useState } from "react"
import { amberColors, blueColors, cyanColors, greenColors, newColorGenerator, orangeColors, redColors, tealColors, yellowColors } from "utils/colors";

type GrievanceCompany = {
  company: string;
  total: number;
}

type GrievanceDepartment = {
  department: string;
  total: number;
}

type GrievanceWitness = {
  witness: string;
  total: number;
}

type GrievanceAnonymity = {
  anonymity: string;
  total: number;
}

type GrievanceStatus = {
  status: string;
  total: number;
}

type GrievanceReason = {
  reason: string;
  total: number;
}

interface ILegends {
  title: string
  color: string
}

export function useCharts() {
  //Criando os estados necessários para a aplicação
  const [grievancesAnonymity, setGrievancesAnonymity] = useState<GrievanceAnonymity[]>([]);
  const [grievancesCompany, setGrievancesCompany] = useState<GrievanceCompany[]>([]);
  const [grievancesDepartment, setGrievancesDepartment] = useState<GrievanceDepartment[]>([]);
  const [grievancesReason, setGrievancesReason] = useState<GrievanceReason[]>([]);
  const [grievancesStatus, setGrievancesStatus] = useState<GrievanceStatus[]>([]);
  const [grievancesWitness, setGrievancesWitness] = useState<GrievanceWitness[]>([]);
  const [anonymity, setAnonymity] = useState<string[]>([]);
  const [company, setCompany] = useState<string[]>([]);
  const [department, setDepartment] = useState<string[]>([]);
  const [reason, setReason] = useState<string[]>([]);
  const [status, setStatus] = useState<string[]>([]);
  const [witness, setWitness] = useState<string[]>([]);
  const [countByAnonymity, setCountByAnonymity] = useState<number[]>([]);
  const [countByCompany, setCountByCompany] = useState<number[]>([]);
  const [countByDepartment, setCountByDepartment] = useState<number[]>([]);
  const [countByReason, setCountByReason] = useState<number[]>([]);
  const [countByStatus, setCountByStatus] = useState<number[]>([]);
  const [countByWitness, setCountByWitness] = useState<number[]>([]);
  const [colorByAnonymity, setColorByAnonymity] = useState<string[]>([]);
  const [colorByCompany, setColorByCompany] = useState<string[]>([]);
  const [colorByDepartment, setColorByDepartment] = useState<string[]>([]);
  const [colorByReason, setColorByReason] = useState<string[]>([]);
  const [colorByStatus, setColorByStatus] = useState<string[]>([]);
  const [colorByWitness, setColorByWitness] = useState<string[]>([]);


  // Buscando dados da API
  useEffect(() => {
    fetchData("grievances/view/count/anonymity", setGrievancesAnonymity, "");
  }, []);

  useEffect(() => {
    fetchData("grievances/view/count/company", setGrievancesCompany, "");
  }, []);

  useEffect(() => {
    fetchData("grievances/view/count/department", setGrievancesDepartment, "");
  }, []);

  useEffect(() => {
    fetchData("grievances/view/count/reason", setGrievancesReason, "");
  }, [])

  useEffect(() => {
    fetchData("grievances/view/count/status", setGrievancesStatus, "");
  }, []);

  useEffect(() => {
    fetchData("grievances/view/count/witness", setGrievancesWitness, "");
  }, []);

  // Atualizo os dados vindos de Grievances, 
  // e os separo em três vetores, para preencher os dados do gráfico
  useEffect(() => {
    const newAnonymity: string[] = [];
    const newCompany: string[] = [];
    const newDepartment: string[] = [];
    const newReason: string[] = [];
    const newStatus: string[] = [];
    const newWitness: string[] = [];
    const newCountByAnonymity: number[] = [];
    const newCountByCompany: number[] = [];
    const newCountByDepartment: number[] = [];
    const newCountByReason: number[] = [];
    const newCountByStatus: number[] = [];
    const newCountByWitness: number[] = [];
    let newColorByAnonymity: string[] = [];
    let newColorByCompany: string[] = [];
    let newColorByDepartment: string[] = [];
    let newColorByReason: string[] = [];
    let newColorByStatus: string[] = [];
    let newColorByWitness: string[] = [];

    grievancesAnonymity.forEach((grievanceAnonymity) => {
      newAnonymity.push(grievanceAnonymity.anonymity);
      newCountByAnonymity.push(grievanceAnonymity.total);
    })

    newColorByAnonymity = newColorGenerator(newAnonymity, tealColors);

    grievancesCompany.forEach((grievanceCompany) => {
      newCompany.push(grievanceCompany.company);
      newCountByCompany.push(grievanceCompany.total);
    });

    newColorByCompany = newColorGenerator(newCompany, greenColors);

    grievancesDepartment.forEach((grievanceDepartment) => {
      newDepartment.push(grievanceDepartment.department);
      newCountByDepartment.push(grievanceDepartment.total);
    });

    newColorByDepartment = newColorGenerator(newDepartment, yellowColors);

    grievancesReason.forEach((grievanceReason) => {
      newReason.push(grievanceReason.reason);
      newCountByReason.push(grievanceReason.total);
    });

    newColorByReason = newColorGenerator(newReason, redColors);

    grievancesStatus.forEach((grievanceStatus) => {
      newStatus.push(grievanceStatus.status);
      newCountByStatus.push(grievanceStatus.total);
    });

    newColorByStatus = newColorGenerator(newStatus, orangeColors);

    grievancesWitness.forEach((grievanceWitness) => {
      newWitness.push(grievanceWitness.witness);
      newCountByWitness.push(grievanceWitness.total);
    });

    newColorByWitness = newColorGenerator(newWitness, blueColors);

    setAnonymity(newAnonymity);
    setCountByAnonymity(newCountByAnonymity);
    setColorByAnonymity(newColorByAnonymity);
    setCompany(newCompany);
    setCountByCompany(newCountByCompany);
    setColorByCompany(newColorByCompany);
    setDepartment(newDepartment);
    setCountByDepartment(newCountByDepartment);
    setColorByDepartment(newColorByDepartment);
    setReason(newReason);
    setCountByReason(newCountByReason);
    setColorByReason(newColorByReason);
    setStatus(newStatus);
    setCountByStatus(newCountByStatus);
    setColorByStatus(newColorByStatus);
    setWitness(newWitness);
    setCountByWitness(newCountByWitness);
    setColorByWitness(newColorByWitness);
  }, [grievancesAnonymity, grievancesCompany, grievancesDepartment, grievancesReason, grievancesStatus, grievancesWitness]);


  // Criando as legendas para o gráfico de doughnut (rosquinha)
  // const doughnutLegends = grievancesStatus.map(item => ({
  //   title: item.status,
  //   color: getColorBasedOnStatus(item.status),
  // }));

  // const doughnutLegendsOLD: ILegends[] = [
  //   { title: 'Shirts', color: 'bg-blue-500' },
  //   { title: 'Shoes', color: 'bg-teal-600' },
  //   { title: 'Bags', color: 'bg-purple-600' },
  // ]

  // const lineLegends: ILegends[] = [
  //   { title: 'Organic', color: 'bg-teal-600' },
  //   { title: 'Paid', color: 'bg-purple-600' },
  // ]

  // const barLegends: ILegends[] = [
  //   { title: 'Shoes', color: 'bg-teal-600' },
  //   { title: 'Bags', color: 'bg-purple-600' },
  // ]
  const doughnutOptionsAnonymity = {
    data: {
      datasets: [
        {
          data: countByAnonymity,
          /**
           * These colors come from Tailwind CSS palette
           * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
           */
          backgroundColor: colorByAnonymity,
          label: 'Reclamações por Anonimidade',
        },
      ],
      labels: anonymity,
    },
    options: {
      responsive: true,
      cutoutPercentage: 80,
    },
    legend: {
      display: true,
    },
  }

  const doughnutOptionsCompany = {
    data: {
      datasets: [
        {
          data: countByCompany,
          /**
           * These colors come from Tailwind CSS palette
           * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
           */
          backgroundColor: colorByCompany,
          label: 'Reclamações por empresa',
        },
      ],
      labels: company,
    },
    options: {
      responsive: true,
      cutoutPercentage: 80,
    },
    legend: {
      display: true,
    },
  }

  const doughnutOptionsDepartment = {
    data: {
      datasets: [
        {
          data: countByDepartment,
          /**
           * These colors come from Tailwind CSS palette
           * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
           */
          backgroundColor: colorByDepartment,
          label: 'Reclamações por departamento',
        },
      ],
      labels: department,
    },
    options: {
      responsive: true,
      cutoutPercentage: 80,
    },
    legend: {
      display: true,
    },
  }

  const doughnutOptionsReason = {
    data: {
      datasets: [
        {
          data: countByReason,
          /**
           * These colors come from Tailwind CSS palette
           * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
           */
          backgroundColor: colorByReason,
          label: 'Reclamações por motivos',
        },
      ],
      labels: reason,
    },
    options: {
      responsive: true,
      cutoutPercentage: 80,
    },
    legend: {
      display: true,
    },
  }


  const doughnutOptionsStatus = {
    data: {
      datasets: [
        {
          data: countByStatus,
          /**
           * These colors come from Tailwind CSS palette
           * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
           */
          backgroundColor: colorByStatus,
          label: 'Reclamações por status',
        },
      ],
      labels: status,
    },
    options: {
      responsive: true,
      cutoutPercentage: 80,
    },
    legend: {
      display: true,
    },
  }


  const doughnutOptionsWitness = {
    data: {
      datasets: [
        {
          data: countByWitness,
          /**
           * These colors come from Tailwind CSS palette
           * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
           */
          backgroundColor: colorByWitness,
          label: 'Reclamações por status',
        },
      ],
      labels: witness,
    },
    options: {
      responsive: true,
      cutoutPercentage: 80,
    },
    legend: {
      display: true,
    },
  }

  // const lineOptions = {
  //   data: {
  //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  //     datasets: [
  //       {
  //         label: 'Organic',
  //         /**
  //          * These colors come from Tailwind CSS palette
  //          * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
  //          */
  //         backgroundColor: '#0694a2',
  //         borderColor: '#0694a2',
  //         data: [43, 48, 40, 54, 67, 73, 70],
  //         fill: false,
  //       },
  //       {
  //         label: 'Paid',
  //         fill: false,
  //         /**
  //          * These colors come from Tailwind CSS palette
  //          * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
  //          */
  //         backgroundColor: '#7e3af2',
  //         borderColor: '#7e3af2',
  //         data: [24, 50, 64, 74, 52, 51, 65],
  //       },
  //     ],
  //   },
  //   options: {
  //     responsive: true,
  //     tooltips: {
  //       mode: 'index',
  //       intersect: false,
  //     },
  //     scales: {
  //       x: {
  //         display: true,
  //         scaleLabel: {
  //           display: true,
  //           labelString: 'Month',
  //         },
  //       },
  //       y: {
  //         display: true,
  //         scaleLabel: {
  //           display: true,
  //           labelString: 'Value',
  //         },
  //       },
  //     },
  //   },
  //   legend: {
  //     display: false,
  //   },
  // }

  // const barOptions = {
  //   data: {
  //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  //     datasets: [
  //       {
  //         label: 'Shoes',
  //         backgroundColor: '#0694a2',
  //         // borderColor: window.chartColors.red,
  //         borderWidth: 1,
  //         data: [-3, 14, 52, 74, 33, 90, 70],
  //       },
  //       {
  //         label: 'Bags',
  //         backgroundColor: '#7e3af2',
  //         // borderColor: window.chartColors.blue,
  //         borderWidth: 1,
  //         data: [66, 33, 43, 12, 54, 62, 84],
  //       },
  //     ],
  //   },
  //   options: {
  //     responsive: true,
  //   },
  //   legend: {
  //     display: false,
  //   },
  // }

  return {
    grievancesReason,
    setGrievancesReason,
    grievancesStatus,
    setGrievancesStatus,
    doughnutOptionsAnonymity,
    doughnutOptionsCompany,
    doughnutOptionsDepartment,
    doughnutOptionsReason,
    doughnutOptionsStatus,
    doughnutOptionsWitness
  }
}


