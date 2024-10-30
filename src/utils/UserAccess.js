import { faHome, faClipboardList, faChartLine, faGraduationCap, faUserCircle, faSignOutAlt, faUsers } from '@fortawesome/free-solid-svg-icons';

const userAccess = {
    'Student': [
        '/home',
        '/exam',
        '/assigned-exams',
        '/results',
        '/profile'
    ],
    'Instructor': [
        '/home',
        '/exam',
        '/created-exams',
        '/create-exam',
        '/update-exam',
        '/delete-exam',
        '/students',
        '/grades',
        '/create-question',
        '/update-question',
        '/delete-question',
        '/create-option',
        '/update-option',
        '/delete-option',
        '/analysis',
        '/assign',
        '/profile'
    ],
    'Admin': [
        '/home',
        '/exam',
        '/created-exams',
        '/create-exam',
        '/update-exam',
        '/delete-exam',
        '/students',
        '/assign',
        '/profile',
        '/all-profiles'
    ]
}

export const NavMiddleMenu = {
    INSTRUCTOR: [
        {
            path: '/home',
            icon: faHome,
            label: 'Home'
        },
        {
            path: '/exams',
            icon: faClipboardList,
            label: 'Exams'
        },
        {    
            path: '/grades',
            icon: faGraduationCap,
            label: 'Grades'
        },
        {
            path: '/analysis',
            icon: faChartLine,
            label: 'Profile'
        }
    ],
    STUDENT: [
        {
            path: '/home',
            icon: faHome,
            label: 'Home'
        },
        {
            path: '/exams',
            icon: faClipboardList,
            label: 'Exams'
        },
        {
            path: '/results',
            icon: faGraduationCap,
            label: 'Results'
        }
    ],
    ADMIN: [
        {
            path: '/home',
            icon: faHome,
            label: 'Home'
        },
        {
            path: '/exams',
            icon: faClipboardList,
            label: 'Exams'
        },
        {
            path: '/analysis',
            icon: faChartLine,
            label: 'Profile'
        },
        {
            path: '/all-user',
            icon: faUsers,
            label: 'All Users'
        }
    ]
}