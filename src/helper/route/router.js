'use client';
import { IconUser, IconSettings, IconHome2, IconNotes } from '@/helper/imports/Imports';

export let route = [
  {
    id: 0,
    name: "Dashboard", path: "/dashboard", icon: <IconHome2 />
  },
  {
    id: 1,
    name: "Images", path: "/images  ", icon: <IconNotes />
  },
  {
    id: 2,
    name: "Category", path: "/category", icon: <IconUser />
  },
  {
    id: 3,
    name: "Sub Category", path: "/sub-category", icon: <IconSettings />
  },
  {
    id: 4,
    name: "Suggestion", path: "/suggestion", icon: <IconSettings />
  },
  {
    id: 5,
    name: "Ads", path: "/ads", icon: <IconSettings />
  }
];
