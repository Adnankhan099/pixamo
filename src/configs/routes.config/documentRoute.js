import React from 'react'
// import { APP_PREFIX_PATH } from 'constants/route.constant'
import { ADMIN, USER } from 'constants/roles.constant'

const appsRoute = [
    {
        key: 'appsProject.document',
        path: `/document`,
        component: React.lazy(() => import('views/document')),
        authority: [ADMIN, USER],
    },
    {
        key: 'appsProject.folder',
        path: `/folder`,
        component: React.lazy(() => import('views/folder')),
        authority: [ADMIN, USER],
    },
    {
        key: 'appsProject.analyze',
        path: `/analyze`,
        component: React.lazy(() => import('views/analyze')),
        authority: [ADMIN, USER],
    },
    {
        key: 'appsAccount.settings',
        path: `setting/:tab`,
        component: React.lazy(() => import('views/account/Settings')),
        authority: [ADMIN, USER],
        meta: {
            header: 'Settings',
            headerContainer: true,
        },
    },
    {
        key: 'appsAccount.email',
        path: `/email`,
        component: React.lazy(() => import('views/email')),
        authority: [ADMIN, USER],
    },
]

export default appsRoute
