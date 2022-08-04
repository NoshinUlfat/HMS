import React from 'react'
import DashboardCustomizeTwoToneIcon from '@mui/icons-material/DashboardCustomizeTwoTone';
import DiningIcon from '@mui/icons-material/Dining';
import BedroomChildIcon from '@mui/icons-material/BedroomChild';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import NoteAltIcon from '@mui/icons-material/NoteAlt';

export const SideBarDataStd = [
    {
        id : 1,
        title: 'Dashboard',
        sideBarInfo: [
            {
                id : 1,
                name: 'Profile',
                path: '/student/dashboard',
                icon: <DashboardCustomizeTwoToneIcon className='icon'/>,
            }
        ],
    },
    {
        id : 2,
        title: 'Dining Info',
        sideBarInfo: [
            {
                id : 1,
                name: 'Menus',
                path: '/student/dining',
                icon: <DiningIcon className='icon'/>,
            }
        ],
    },
    {
        id : 3,
        title: 'Application',
        sideBarInfo: [
            {
                id : 1,
                name: 'Room Change',
                path: '/student/roomrequest',
                icon: <BedroomChildIcon className='icon'/>,
            },
            {
                id : 2,
                name: 'Certificate',
                path: '/student/certificate',
                icon: <CardMembershipIcon className='icon'/>,
            }
        ],
    },
    {
        id : 4,
        title: 'Services',
        sideBarInfo: [
            {
                id : 1,
                name: 'Request Service',
                path: '/student/service',
                icon: <BedroomChildIcon className='icon'/>,
            },
        ],
    },
    {
        id : 5,
        title: 'Notice',
        sideBarInfo: [
            {
                id : 1,
                name: 'General',
                path: '/student/notice',
                icon: <ContentPasteIcon className='icon'/>,
            }
        ],
    },
]

export const SideBarDataProvost = [
    {
        id : 1,
        title: 'Dashboard',
        sideBarInfo: [
            {
                id : 1,
                name: 'Profile',
                path: '/provost/dashboard',
                icon: <DashboardCustomizeTwoToneIcon className='icon'/>,
            }
        ],
    },
    {
        id : 2,
        title: 'Dining Info',
        sideBarInfo: [
            {
                id : 1,
                name: 'Menus',
                path: '/',
                icon: <DiningIcon className='icon'/>,
            },
            {
                id : 2,
                name: 'Fund Requests',
                path: '/',
                icon: <AttachMoneyIcon className='icon'/>,
            }
        ],
    },
    {
        id : 3,
        title: 'See Current Applications',
        sideBarInfo: [
            {
                id : 1,
                name: 'Room Change',
                path: '/provost/roomRequests',
                icon: <BedroomChildIcon className='icon'/>,
            },
            {
                id : 2,
                name: 'Certificate',
                path: '/',
                icon: <CardMembershipIcon className='icon'/>,
            }
        ],
    },
    {
        id : 4,
        title: 'Notice',
        sideBarInfo: [
            {
                id : 1,
                name: 'Assign Notice',
                path: '/provost/assignNotice',
                icon: <NoteAltIcon className='icon'/>,
            },
            {
                id : 2,
                name: 'See Notice',
                path: '/',
                icon: <ContentPasteIcon className='icon'/>,
            }
        ],
    },
]