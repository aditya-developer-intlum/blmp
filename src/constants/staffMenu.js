function data(){
  return [{
      id: 'dashboard',
      icon: 'iconsminds-dashboard',
      label: 'Dashboard',
      to: `/staff/dashboard`,
      ref: 'Dashboard',
      pindex: 0,
    },
    {
      id: 'menu',
      icon: 'iconsminds-open-book',
      label: 'Menu',
      to: `/staff/menu`,
      ref: 'Menu',
      pindex: 0,
      subs: [{
          icon: 'iconsminds-align-justify-all',
          label: 'Menu Group',
          to: `/staff/menu/menu_group`,
          type: 'all',
          subs: [{
              icon: 'iconsminds-align-justify-all',
              label: 'List',
              to: `/staff/menu/menu_group/list`,
              type: 'read'
            },{
              icon: 'iconsminds-add',
              label: 'Create',
              to: `/staff/menu/menu_group/create`,
              type: 'write'
            }
          ]
        },
        {
          icon: 'iconsminds-add-user',
          label: 'Quantity Group',
          to: `/staff/menu/quantity_group`,
          type: 'all',
          subs: [{
              icon: 'iconsminds-align-justify-all',
              label: 'List',
              to: `/staff/menu/quantity_group/list`,
              type: 'read'
            },{
              icon: 'iconsminds-add',
              label: 'Create',
              to: `/staff/menu/quantity_group/create`,
              type: 'write'
            }
          ]
        },
        {
          icon: 'iconsminds-add-user',
          label: 'Toppings Group',
          to: `/staff/menu/toppings_group`,
          type: 'all',
          subs: [{
            icon: 'iconsminds-align-justify-all',
            label: 'List',
            to: `/staff/menu/toppings_group/list`,
            type: 'read'
          },{
            icon: 'iconsminds-add',
            label: 'Create',
            to: `/staff/menu/toppings_group/create`,
            type: 'write'
          }]
        },
        {
          icon: 'iconsminds-add-user',
          label: 'Extra Items',
          to: `/staff/menu/extra_items`,
          type: 'all',
          subs: [{
            icon: 'iconsminds-align-justify-all',
            label: 'List',
            to: `/staff/menu/extra_items/list`,
            type: 'read'
          },{
            icon: 'iconsminds-add',
            label: 'Create',
            to: `/staff/menu/extra_items/create`,
            type: 'write'
          }]
        },
        {
          icon: 'iconsminds-add-user',
          label: 'Menu Item',
          to: `/staff/menu/menu_item`,
          type: 'all',
          subs: [{
            icon: 'iconsminds-align-justify-all',
            label: 'List',
            to: `/staff/menu/menu_item/list`,
            type: 'read'
          },{
            icon: 'iconsminds-add',
            label: 'Create',
            to: `/staff/menu/menu_item/create`,
            type: 'write'
          }]
        }
      ],
    },
    {
      id: 'offers',
      icon: 'iconsminds-snow',
      label: 'Offers',
      to: `/staff/offers`,
      ref: 'Offer',
      pindex: 1,
    },
    {
      id: 'orders',
      icon: 'iconsminds-cap',
      label: 'Orders',
      to: `/staff/orders`,
      ref: 'Order',
      pindex: 2,
    },
    {
      id: 'reviews',
      icon: 'iconsminds-notepad',
      label: 'Reviews',
      to: `/staff/reviews`,
      ref: 'Restaurant Review',
      pindex: 5,
    },
    {
      id: 'reports',
      icon: 'iconsminds-bar-chart-4',
      label: 'Reports',
      to: `/staff/reports`,
      ref: 'Report',
      pindex: 3,
    },
    {
      id: 'wallet',
      icon: 'iconsminds-wallet',
      label: 'Wallet',
      to: `/staff/wallet`,
      ref: 'Restaurant Wallet',
      pindex: 6,
    },
  ];
}

export default data();
