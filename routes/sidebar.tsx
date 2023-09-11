/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 */

interface IRoute {
  path?: string
  icon?: string
  name: string
  routes?: IRoute[]
  checkActive?(pathname: String, route: IRoute): boolean
  exact?: boolean
}

export function routeIsActive (pathname: String, route: IRoute): boolean {
  if (route.checkActive) {
    return route.checkActive(pathname, route)
  }

  return route?.exact
    ? pathname == route?.path
    : (route?.path ? pathname.indexOf(route.path) === 0 : false)
}

const routes: IRoute[] = [
  // {
  //   path: '/example', // the url
  //   icon: 'HomeIcon', // the component being exported from icons/index.js
  //   name: 'Dashboard', // name that appear in Sidebar
  //   exact: true,
  // },
  {
    path: '/app/home', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Home', // name that appear in Sidebar
    // exact: true,
  },  
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
  {
    path: '/app/grievanceTreatmentConsulting',
    icon: 'FormsIcon',
    name: 'Tratar Reclamação',
  },    
  {
    path: '/app/grievanceTreatment',
    icon: 'FormsIcon',
    name: 'Reclamação em Tratamento',
  },  
  {
    path: '/app/login',
    icon: 'PeopleIcon',
    name: 'Login',
  },  
  {
    path: '/example/forms',
    icon: 'FormsIcon',
    name: 'Forms',
  },
  {
    path: '/example/cards',
    icon: 'CardsIcon',
    name: 'Cards',
  },
  {
    path: '/app/charts',
    icon: 'ChartsIcon',
    name: 'Análise Gráfica',
  },
  {
    path: '/example/charts',
    icon: 'ChartsIcon',
    name: 'Charts',
  },  
  {
    path: '/example/buttons',
    icon: 'ButtonsIcon',
    name: 'Buttons',
  },
  {
    path: '/example/modals',
    icon: 'ModalsIcon',
    name: 'Modals',
  },
  {
    path: '/example/tables',
    icon: 'TablesIcon',
    name: 'Tables',
  },
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
  // // {
  // //   icon: 'PagesIcon',
  // //   name: 'Examples',
  // //   routes: [
  // //     // submenu    
  // //     {
  // //       path: '/example/login',
  // //       name: 'Login',
  // //     },
  // //     {
  // //       path: '/example/create-account',
  // //       name: 'Create account',
  // //     },
  // //     {
  // //       path: '/example/forgot-password',
  // //       name: 'Forgot password',
  // //     },
  // //     {
  // //       path: '/example/404',
  // //       name: '404',
  // //     },
  // //     {
  // //       path: '/example/blank',
  // //       name: 'Blank',
  // //     },
  // //   ],
  // },  
]

export type {IRoute}
export default routes
