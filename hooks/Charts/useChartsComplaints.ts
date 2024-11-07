import { fetchData } from "hooks/FetchData/fecthData"
import { useEffect, useState } from "react"
import { amberColors, blueColors, cyanColors, greenColors, newColorGenerator, orangeColors, redColors, tealColors, yellowColors } from "utils/colors";

type ComplaintCompany = {
  company: string;
  total: number;
}

type ComplaintDepartment = {
  department: string;
  total: number;
}

type ComplaintWitness = {
  witness: string;
  total: number;
}

type ComplaintAnonymity = {
  anonymity: string;
  total: number;
}

type ComplaintStatus = {
  status: string;
  total: number;
}

type ComplaintCategory = {
  category: string;
  total: number;
}

interface ILegends {
  title: string
  color: string
}

export function useChartsComplaints() {
  //Criando os estados necessários para a aplicação
  const [complaintsAnonymity, setComplaintsAnonymity] = useState<ComplaintAnonymity[]>([]);
  const [complaintsCompany, setComplaintsCompany] = useState<ComplaintCompany[]>([]);
  const [complaintsDepartment, setComplaintsDepartment] = useState<ComplaintDepartment[]>([]);
  const [complaintsCategory, setComplaintsCategory] = useState<ComplaintCategory[]>([]);
  const [complaintsStatus, setComplaintsStatus] = useState<ComplaintStatus[]>([]);
  const [complaintsWitness, setComplaintsWitness] = useState<ComplaintWitness[]>([]);
  const [anonymity, setAnonymity] = useState<string[]>([]);
  const [company, setCompany] = useState<string[]>([]);
  const [department, setDepartment] = useState<string[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [status, setStatus] = useState<string[]>([]);
  const [witness, setWitness] = useState<string[]>([]);
  const [countByAnonymity, setCountByAnonymity] = useState<number[]>([]);
  const [countByCompany, setCountByCompany] = useState<number[]>([]);
  const [countByDepartment, setCountByDepartment] = useState<number[]>([]);
  const [countByCategory, setCountByCategory] = useState<number[]>([]);
  const [countByStatus, setCountByStatus] = useState<number[]>([]);
  const [countByWitness, setCountByWitness] = useState<number[]>([]);
  const [colorByAnonymity, setColorByAnonymity] = useState<string[]>([]);
  const [colorByCompany, setColorByCompany] = useState<string[]>([]);
  const [colorByDepartment, setColorByDepartment] = useState<string[]>([]);
  const [colorByCategory, setColorByCategory] = useState<string[]>([]);
  const [colorByStatus, setColorByStatus] = useState<string[]>([]);
  const [colorByWitness, setColorByWitness] = useState<string[]>([]);


  // Buscando dados da API
  useEffect(() => {
    fetchData("complaints/view/count/anonymity", setComplaintsAnonymity, "");
  }, []);

  useEffect(() => {
    fetchData("complaints/view/count/company", setComplaintsCompany, "");
  }, []);

  useEffect(() => {
    fetchData("complaints/view/count/department", setComplaintsDepartment, "");
  }, []);

  useEffect(() => {
    fetchData("complaints/view/count/Category", setComplaintsCategory, "");
  }, [])

  useEffect(() => {
    fetchData("complaints/view/count/status", setComplaintsStatus, "");
  }, []);

  useEffect(() => {
    fetchData("complaints/view/count/witness", setComplaintsWitness, "");
  }, []);

  // Atualizo os dados vindos de Complaints, 
  // e os separo em três vetores, para preencher os dados do gráfico
  useEffect(() => {
    const newAnonymity: string[] = [];
    const newCompany: string[] = [];
    const newDepartment: string[] = [];
    const newCategory: string[] = [];
    const newStatus: string[] = [];
    const newWitness: string[] = [];
    const newCountByAnonymity: number[] = [];
    const newCountByCompany: number[] = [];
    const newCountByDepartment: number[] = [];
    const newCountByCategory: number[] = [];
    const newCountByStatus: number[] = [];
    const newCountByWitness: number[] = [];
    let newColorByAnonymity: string[] = [];
    let newColorByCompany: string[] = [];
    let newColorByDepartment: string[] = [];
    let newColorByCategory: string[] = [];
    let newColorByStatus: string[] = [];
    let newColorByWitness: string[] = [];

    complaintsAnonymity.forEach((ComplaintAnonymity) => {
      newAnonymity.push(ComplaintAnonymity.anonymity);
      newCountByAnonymity.push(ComplaintAnonymity.total);
    })

    newColorByAnonymity = newColorGenerator(newAnonymity, tealColors);

    complaintsCompany.forEach((ComplaintCompany) => {
      newCompany.push(ComplaintCompany.company);
      newCountByCompany.push(ComplaintCompany.total);
    });

    newColorByCompany = newColorGenerator(newCompany, greenColors);

    complaintsDepartment.forEach((ComplaintDepartment) => {
      newDepartment.push(ComplaintDepartment.department);
      newCountByDepartment.push(ComplaintDepartment.total);
    });

    newColorByDepartment = newColorGenerator(newDepartment, yellowColors);

    complaintsCategory.forEach((ComplaintCategory) => {
      newCategory.push(ComplaintCategory.category);
      newCountByCategory.push(ComplaintCategory.total);
    });

    newColorByCategory = newColorGenerator(newCategory, redColors);

    complaintsStatus.forEach((ComplaintStatus) => {
      newStatus.push(ComplaintStatus.status);
      newCountByStatus.push(ComplaintStatus.total);
    });

    newColorByStatus = newColorGenerator(newStatus, orangeColors);

    complaintsWitness.forEach((ComplaintWitness) => {
      newWitness.push(ComplaintWitness.witness);
      newCountByWitness.push(ComplaintWitness.total);
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
    setCategory(newCategory);
    setCountByCategory(newCountByCategory);
    setColorByCategory(newColorByCategory);
    setStatus(newStatus);
    setCountByStatus(newCountByStatus);
    setColorByStatus(newColorByStatus);
    setWitness(newWitness);
    setCountByWitness(newCountByWitness);
    setColorByWitness(newColorByWitness);
  }, [complaintsAnonymity, complaintsCompany, complaintsDepartment, complaintsCategory, complaintsStatus, complaintsWitness]);


  // Criando as legendas para o gráfico de doughnut (rosquinha)
  // const doughnutLegends = complaintsStatus.map(item => ({
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
          label: 'Denúncias por Anonimidade',
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
          label: 'Denúncias por empresa',
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
          label: 'Denúncias por departamento',
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

  const doughnutOptionsCategory = {
    data: {
      datasets: [
        {
          data: countByCategory,
          /**
           * These colors come from Tailwind CSS palette
           * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
           */
          backgroundColor: colorByCategory,
          label: 'Denúncias por motivos',
        },
      ],
      labels: category,
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
          label: 'Denúncias por status',
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
          label: 'Denúncias por status',
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
    complaintsCategory,
    setComplaintsCategory,
    complaintsStatus,
    setComplaintsStatus,
    doughnutOptionsAnonymity,
    doughnutOptionsCompany,
    doughnutOptionsDepartment,
    doughnutOptionsCategory,
    doughnutOptionsStatus,
    doughnutOptionsWitness
  }
}
