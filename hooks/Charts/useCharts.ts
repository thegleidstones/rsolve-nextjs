import { fetchData } from "hooks/FetchData/fecthData"
import { useEffect, useState } from "react"

type GrievanceCompany = {
  company: string;
  total: number;
}

type GrievanceDepartment = {
  department: string;
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
  const [grievancesStatus, setGrievancesStatus] = useState<GrievanceStatus[]>([]);
  const [grievancesReason, setGrievancesReason] = useState<GrievanceReason[]>([]);
  const [anonymity, setAnonymity] = useState<string[]>([]);
  const [company, setCompany] = useState<string[]>([]);
  const [department, setDepartment] = useState<string[]>([]);
  const [status, setStatus] = useState<string[]>([]);
  const [reason, setReason] = useState<string[]>([]);
  const [countByAnonymity, setCountByAnonymity] = useState<number[]>([]);
  const [countByCompany, setCountByCompany] = useState<number[]>([]);
  const [countByDepartment, setCountByDepartment] = useState<number[]>([]);
  const [countByReason, setCountByReason] = useState<number[]>([]);
  const [countByStatus, setCountByStatus] = useState<number[]>([]);
  const [colorByAnonymity, setColorByAnonymity] = useState<string[]>([]);
  const [colorByCompany, setColorByCompany] = useState<string[]>([]);
  const [colorByDepartment, setColorByDepartment] = useState<string[]>([]);
  const [colorByStatus, setColorByStatus] = useState<string[]>([]);
  const [colorByReason, setColorByReason] = useState<string[]>([]);

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
    fetchData("grievances/view/count/is-anonymous", setGrievancesDepartment, "");
  }, []);

  useEffect(() => {
    fetchData("grievances/view/count/status", setGrievancesStatus, "");
  }, []);

  useEffect(() => {
    fetchData("grievances/view/count/reason", setGrievancesReason, "");
  }, [])

  // Atualizo os dados vindos de Grievances, 
  // e os separo em três vetores, para preencher os dados do gráfico
  useEffect(() => {
    const newAnonymity: string[] = [];
    const newCompany: string[] = [];
    const newDepartment: string[] = [];
    const newStatus: string[] = [];
    const newReason: string[] = [];
    const newCountByAnonymity: number[] = [];
    const newCountByCompany: number[] = [];
    const newCountByDepartment: number[] = [];
    const newCountByStatus: number[] = [];
    const newCountByReason: number[] = [];
    let newColorByAnonymity: string[] = [];
    let newColorByCompany: string[] = [];
    let newColorByDepartment: string[] = [];
    let newColorByStatus: string[] = [];
    let newColorByReason: string[] = [];

    grievancesAnonymity.forEach((grievanceAnonymity) => {
      newAnonymity.push(grievanceAnonymity.anonymity);
      newCountByAnonymity.push(grievanceAnonymity.total);
    })

    newColorByAnonymity = colorGenerator(newAnonymity);

    grievancesCompany.forEach((grievanceCompany) => {
      newCompany.push(grievanceCompany.company);
      newCountByCompany.push(grievanceCompany.total);
    });

    newColorByCompany = colorGenerator(newCompany);

    grievancesDepartment.forEach((grievanceDepartment) => {
      newDepartment.push(grievanceDepartment.department);
      newCountByDepartment.push(grievanceDepartment.total);
    });

    newColorByDepartment = colorGenerator(newDepartment);

    grievancesReason.forEach((grievanceReason) => {
      newReason.push(grievanceReason.reason);
      newCountByReason.push(grievanceReason.total);
    });

    newColorByReason = colorGenerator(newReason);

    grievancesStatus.forEach((grievanceStatus) => {
      newStatus.push(grievanceStatus.status);
      newCountByStatus.push(grievanceStatus.total);
    });

    newColorByStatus = colorGenerator(newStatus);

    setAnonymity(newAnonymity);
    setCountByAnonymity(newCountByAnonymity);
    setColorByAnonymity(newColorByAnonymity);
    setCompany(newCompany);
    setCountByCompany(newCountByCompany);
    setColorByCompany(newColorByCompany);
    setDepartment(newDepartment);
    setCountByDepartment(newCountByDepartment);
    setColorByDepartment(newColorByDepartment);
    setStatus(newStatus);
    setCountByStatus(newCountByStatus);
    setColorByStatus(newColorByStatus);
    setReason(newReason);
    setCountByReason(newCountByReason);
    setColorByReason(newColorByReason);
  }, [grievancesAnonymity, grievancesCompany, grievancesDepartment, grievancesReason, grievancesStatus]);


  // Criando as legendas para o gráfico de doughnut (rosquinha)
  // const doughnutLegends = grievancesStatus.map(item => ({
  //   title: item.status,
  //   color: getColorBasedOnStatus(item.status),
  // }));

  // Função para obter a cor com base no status (apenas um exemplo, você pode personalizar isso)
  // function getColorBasedOnStatus(status: string) {
  //   switch (status) {
  //     case 'Recebidas':
  //       return 'bg-blue-500';
  //     case 'Em Tratamento':
  //       return 'bg-teal-600';
  //     case 'Finalizadas':
  //       return 'bg-lime-600';
  //     case 'Pendentes':
  //       return 'bg-red-600';      
  //     case 'Improcedentes':
  //       return 'bg-purple-600';      
  //     default:
  //       return 'bg-gray-500';
  //   }
  // }

  function colorGenerator(values: string[]) {
    const colorArray: string[] = [];

    // Função para gerar uma cor aleatória em formato hexadecimal
    function randomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    for (let i = 0; i < values.length; i++) {
      colorArray[i] = randomColor();
    }

    return colorArray;
  }

  function colorGeneratorV2(values: string[], baseColor: string): string[] {
    const generatedColors: string[] = [];

    // Obtenha os componentes RGB da cor base
    const baseRed = parseInt(baseColor.slice(1, 3), 16);
    const baseGreen = parseInt(baseColor.slice(3, 5), 16);
    const baseBlue = parseInt(baseColor.slice(5, 7), 16);

    values.forEach((value) => {
      // Gere variações dos componentes RGB da cor base
      const r = Math.floor(Math.random() * 128) + baseRed;
      const g = Math.floor(Math.random() * 128) + baseGreen;
      const b = Math.floor(Math.random() * 128) + baseBlue;

      // Garanta que os valores RGB não ultrapassem 255
      const randomR = Math.min(255, r);
      const randomG = Math.min(255, g);
      const randomB = Math.min(255, b);

      // Converta os componentes RGB para uma cor hexadecimal
      const randomColor = `#${randomR.toString(16)}${randomG.toString(16)}${randomB.toString(16)}`;

      // Adicione a cor gerada ao vetor
      generatedColors.push(randomColor);
    });

    return generatedColors;
  }

  // Função para obter a cor com base no status (apenas um exemplo, você pode personalizar isso)
  function getColorBasedOnStatusV2(status: string) {
    switch (status) {
      case 'Recebido':
        return '#3b82f6';
      case 'Em Tratamento':
        return '#0ea5e9';
      case 'Finalizado':
        return '#84cc16';
      case 'Pendente':
        return '#dc2626';
      case 'Improcedente':
        return '#9333ea';
      default:
        return '#6b7280';
    }
  }

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
          backgroundColor: colorByCompany,
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
  }
}


