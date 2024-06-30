'use client';
import { IconUser, IconSettings, IconHome2, IconNotes } from '@/helper/imports/Imports';
import { IconAccessPoint, IconActivity } from '@tabler/icons-react';

export let route = [
  {
    id: 0,
    name: "Dashboard", path: "/images", icon: <IconHome2 />
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
    name: "Suggestion", path: "/suggestion", icon: <IconAccessPoint />
  },
  {
    id: 5,
    name: "Ads", path: "/ads", icon: <IconActivity />
  }
];
