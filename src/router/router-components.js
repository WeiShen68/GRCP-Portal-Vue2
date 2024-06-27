const Layout = () => import('@/layouts/default/Index');

const Login = () => import('@/views/Login');

const Dashboard = () => import('@/views/Dashboard/index.vue');

const Transaction = () => import('@/views/Transaction');
const AllTransaction = () => import('@/views/Transaction/AllTransaction/index.vue');
const SaleTransaction = () => import('@/views/Transaction/SalesTransaction/index.vue');

const Reports = () => import('@/views/Reports/index.vue');

const Devices = () => import('@/views/Devices/index.vue');

const ResetPassword = () => import('@/views/ResetPassword');

// const ChangePassword = () => import('@/views/ChangePassword');

export const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  // {
  //   path: '/changepassword',
  //   name: 'ChangePassword',
  //   component: ChangePassword,
  // },
  {
    path: '/resetpassword',
    name: 'ResetPassword',
    meta: { requireAuth: true },
    component: ResetPassword,
  },
  {
    path: '',
    component: Layout,
    redirect: { name: 'Dashboard' },
    children: [
      //dashboard
      {
        path: 'dashboard',
        name: 'Dashboard',
        meta: { requireAuth: true },
        component: Dashboard,
      },
      //transaction
      {
        path: 'transaction',
        name: 'Transaction',
        component: Transaction,
        children: [
          {
            path: 'all',
            name: 'AllTransactions',
            meta: { requireAuth: true },
            component: AllTransaction,
          },
          {
            path: 'sales',
            name: 'SaleTransactions',
            meta: { requireAuth: true },
            component: SaleTransaction,
          },
        ],
      },
      //report
      {
        path: 'reports',
        name: 'Reports',
        meta: { requireAuth: true },
        component: Reports,
      },
      //device
      {
        path: 'devices',
        name: 'Devices',
        meta: { requireAuth: true },
        component: Devices,
        // children: [
        //   {
        //     path: 'device1',
        //     name: 'Device1',
        //     meta: { requireAuth: true },
        //     component: Device1,
        //   },
        //   {
        //     path: 'device2',
        //     name: 'Device2',
        //     meta: { requireAuth: true },
        //     component: Device2,
        //   },
        // ],
      },
    ],
  },
];
