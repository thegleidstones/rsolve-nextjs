/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 */

import { AuthContext } from "context/AuthContext"
import { useContext } from "react"

interface IRoute {
  path?: string
  icon?: string
  name: string
  routes?: IRoute[]
  checkActive?(pathname: String, route: IRoute): boolean
  exact?: boolean
}

function routeIsActive(pathname: String, route: IRoute): boolean {
  if (route.checkActive) {
    return route.checkActive(pathname, route)
  }

  return route?.exact
    ? pathname == route?.path
    : (route?.path ? pathname.indexOf(route.path) === 0 : false)
}

export function SideBar() {
  const { user, company } = useContext(AuthContext);

  // const isAdmin: boolean = false;

  const routesAdmin: IRoute[] = [
    {
      path: '/app/home', // the url
      icon: 'HomeIcon', // the component being exported from icons/index.js
      name: 'Home', // name that appear in Sidebar
      // exact: true,
    },
    {
      path: '/app/complaint',
      icon: 'FormsIcon',
      name: 'Denúncia',
    },
    {
      path: '/app/complaintConsulting',
      icon: 'FormsIcon',
      name: 'Consultar Denúncia',
    },
    {
      path: '/app/complaintTreatmentConsulting',
      icon: 'FormsIcon',
      name: 'Tratar Denúncia',
    },
    // {
    //   path: '/app/complaintTreatment',
    //   icon: 'FormsIcon',
    //   name: 'Denúncia em Tratamento',
    // },
    {
      path: '/app/grievance',
      icon: 'FormsIcon',
      name: 'Reclamação',
    },
    {
      path: '/app/grievanceConsulting',
      icon: 'FormsIcon',
      name: 'Consultar Reclamação',
    },
    {
      path: '/app/grievanceTreatmentConsulting',
      icon: 'FormsIcon',
      name: 'Tratar Reclamação',
    },
    // {
    //   path: '/app/grievanceTreatment',
    //   icon: 'FormsIcon',
    //   name: 'Reclamação em Tratamento',
    // },
    // {
    //   path: '/app/login',
    //   icon: 'PeopleIcon',
    //   name: 'Login',
    // },
    // {
    //   path: '/example/forms',
    //   icon: 'FormsIcon',
    //   name: 'Forms',
    // },
    // {
    //   path: '/example/cards',
    //   icon: 'CardsIcon',
    //   name: 'Cards',
    // },
    {
      path: '/app/charts',
      icon: 'ChartsIcon',
      name: 'Gráficos Reclamações',
    },
    {
      path: '/app/chartsComplaint',
      icon: 'ChartsIcon',
      name: 'Gráficos Denúncias',
    },
    // {
    //   path: '/example/charts',
    //   icon: 'ChartsIcon',
    //   name: 'Charts',
    // },
    // {
    //   path: '/example/buttons',
    //   icon: 'ButtonsIcon',
    //   name: 'Buttons',
    // },
    // {
    //   path: '/example/modals',
    //   icon: 'ModalsIcon',
    //   name: 'Modals',
    // },
    // {
    //   path: '/example/tables',
    //   icon: 'TablesIcon',
    //   name: 'Tables',
    // },
    {
      icon: 'MenuIcon',
      name: 'Administração',
      routes: [
        // submenu
        {
          path: '/app/company',
          name: 'Empresas',
        },
        {
          path: '/app/reason',
          name: 'Filiais',
        },
        {
          path: '/app/department',
          name: 'Departamentos da Empresa',
        },
        {
          path: '/app/user',
          name: 'Usuários',
        },
        {
          path: '/app/fact',
          name: 'Permissões',
        },
      ],
    },
    {
      icon: 'MenuIcon',
      name: 'Configurações',
      routes: [
        // submenu
        {
          path: '/app/category',
          name: 'Categorias de Denúncia',
        },
        {
          path: '/app/reason',
          name: 'Motivos de Reclamação',
        },
        {
          path: '/app/status',
          name: 'Status da Denúncia',
        },
        {
          path: '/app/fact',
          name: 'Fatos e recorrência',
        },
      ],
    },
  ];

  const routesUser: IRoute[] = [
    {
      path: '/example/complaint',
      icon: 'FormsIcon',
      name: 'Denúncia',
    },
    {
      path: '/app/grievance',
      icon: 'FormsIcon',
      name: 'Reclamação',
    },
    {
      path: '/app/grievanceConsulting',
      icon: 'FormsIcon',
      name: 'Consultar Reclamação',
    },
  ];

  const routes: IRoute[] = user?.isAdmin ? routesAdmin : routesUser;

  return {
    routes,
    routeIsActive,
  };
}

export type { IRoute }
