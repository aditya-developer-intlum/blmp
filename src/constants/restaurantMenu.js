function data(){
  return [{
      id: 'goback',
      icon: 'iconsminds-left',
      label: 'Go Back',
      to: `/${localStorage.getItem('user_type')}/dashboard/home`,
    },
    {
      id: 'dashboard',
      icon: 'iconsminds-dashboard',
      label: 'Dashboard',
      to: `/${localStorage.getItem('user_type')}/restaurant/dashboard`,
    },
    {
      id: 'menu',
      icon: 'iconsminds-open-book',
      label: 'Menu',
      to: `/${localStorage.getItem('user_type')}/restaurant/menu`,
      subs: [{
          icon: 'iconsminds-align-justify-all',
          label: 'Menu Group',
          to: `/${localStorage.getItem('user_type')}/restaurant/menu/menu_group`,
          subs: [{
              icon: 'iconsminds-align-justify-all',
              label: 'List',
              to: `/${localStorage.getItem('user_type')}/restaurant/menu/menu_group/list`,
            },{
              icon: 'iconsminds-add',
              label: 'Create',
              to: `/${localStorage.getItem('user_type')}/restaurant/menu/menu_group/create`,
            }
          ]
        },
        {
          icon: 'iconsminds-add-user',
          label: 'Quantity Group',
          to: `/${localStorage.getItem('user_type')}/restaurant/menu/quantity_group`,
          subs: [{
              icon: 'iconsminds-align-justify-all',
              label: 'List',
              to: `/${localStorage.getItem('user_type')}/restaurant/menu/quantity_group/list`,
            },{
              icon: 'iconsminds-add',
              label: 'Create',
              to: `/${localStorage.getItem('user_type')}/restaurant/menu/quantity_group/create`,
            }
          ]
        },
        {
          icon: 'iconsminds-add-user',
          label: 'Toppings Group',
          to: `/${localStorage.getItem('user_type')}/restaurant/menu/toppings_group`,
          subs: [{
            icon: 'iconsminds-align-justify-all',
            label: 'List',
            to: `/${localStorage.getItem('user_type')}/restaurant/menu/toppings_group/list`,
          },{
            icon: 'iconsminds-add',
            label: 'Create',
            to: `/${localStorage.getItem('user_type')}/restaurant/menu/toppings_group/create`,
          }]
        },
        {
          icon: 'iconsminds-add-user',
          label: 'Extra Items',
          to: `/${localStorage.getItem('user_type')}/restaurant/menu/extra_items`,
          subs: [{
            icon: 'iconsminds-align-justify-all',
            label: 'List',
            to: `/${localStorage.getItem('user_type')}/restaurant/menu/extra_items/list`,
          },{
            icon: 'iconsminds-add',
            label: 'Create',
            to: `/${localStorage.getItem('user_type')}/restaurant/menu/extra_items/create`,
          }]
        },
        {
          icon: 'iconsminds-add-user',
          label: 'Menu Item',
          to: `/${localStorage.getItem('user_type')}/restaurant/menu/menu_item`,
          subs: [{
            icon: 'iconsminds-align-justify-all',
            label: 'List',
            to: `/${localStorage.getItem('user_type')}/restaurant/menu/menu_item/list`,
          },{
            icon: 'iconsminds-add',
            label: 'Create',
            to: `/${localStorage.getItem('user_type')}/restaurant/menu/menu_item/create`,
          }]
        }
      ],
    },
    {
      id: 'offers',
      icon: 'iconsminds-snow',
      label: 'Offers',
      to: `/${localStorage.getItem('user_type')}/restaurant/offers`,
    },
    {
      id: 'orders',
      icon: 'iconsminds-cap',
      label: 'Orders',
      to: `/${localStorage.getItem('user_type')}/restaurant/orders/list`,
    },
    {
      id: 'reviews',
      icon: 'iconsminds-notepad',
      label: 'Reviews',
      to: `/${localStorage.getItem('user_type')}/restaurant/reviews`,
    },
    {
      id: 'reports',
      icon: 'iconsminds-bar-chart-4',
      label: 'Reports',
      to: `/${localStorage.getItem('user_type')}/restaurant/reports`,
    },
    {
      id: 'wallet',
      icon: 'iconsminds-wallet',
      label: 'Wallet',
      to: `/${localStorage.getItem('user_type')}/restaurant/wallet`,
    },
  ];
}

export default data();
