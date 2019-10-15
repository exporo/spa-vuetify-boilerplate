/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
    {
        path: '',
        // Relative to /src/views
        view: 'Dashboard',
    },

    {
        path: '/team',
        name: 'Add Team',
        view: 'Team/Create',
    },
    {
        path: '/team/:id',
        name: 'Update Team',
        view: 'Team/Update',
    },
    {
        path: '/team/:id',
        name: 'Delete Team',
        view: 'Team/Delete',
    },

    {
        path: '/project/:id',
        name: 'Update Project',
        view: 'Project/Update',
    },
    {
        path: '/project',
        name: 'Add Project',
        view: 'Project/Create',
    },

    {
        path: '/email/:id',
        name: 'Show E-Mail',
        view: 'Email/Show',
    },
    {
        path: '/email/',
        name: 'Add E-Mail',
        view: 'Email/Create',
    },


    {
        path: '/user',
        name: 'User',
        view: 'User/Show',
    },
    {
        path: '/company',
        view: 'Company.edit',
    },
    {
        path: '/icons',
        view: 'Icons',
    },
    {
        path: '/maps',
        view: 'Maps',
    },
    {
        path: '/notifications',
        view: 'Notifications',
    },
    {
        path: '/upgrade',
        name: 'Upgrade to PRO',
        view: 'Upgrade',
    },
]
