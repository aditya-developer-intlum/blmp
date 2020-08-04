function data(){
    return [{
        id: 'dashboard',
        icon: 'iconsminds-dashboard',
        label: 'Dashboard',
        to: `/vendor/dashboard/home`,
      },
      {
        id: 'restaurant',
        icon: 'iconsminds-post-office',
        label: 'Restaurant',
        to: `/vendor/restaurants`,
        subs: [{
            icon: 'iconsminds-align-justify-all',
            label: 'Restaurant List',
            to: `/vendor/restaurants/list`,
          },
          {
            icon: 'iconsminds-add',
            label: 'Create Restaurant',
            to: `/vendor/restaurants/create`,
          }
        ]
      },
      {
        id: 'restaurant_staff',
        icon: 'iconsminds-chef-hat',
        label: 'Restaurant Staff',
        to: `/vendor/restaurant_staff`,
        subs: [{
            icon: 'iconsminds-align-justify-all',
            label: 'Restaurant Staff List',
            to: `/vendor/restaurant_staff/list`,
          },
          {
            icon: 'iconsminds-add',
            label: 'Create Restaurant Staff',
            to: `/vendor/restaurant_staff/create`,
          }
        ]
      },
      // {
      //   id: 'delivery_staff',
      //   icon: 'iconsminds-scooter',
      //   label: 'Delivery Staff',
      //   to: `/vendor/delivery_staff`,
      // },
      {
        id: 'report',
        icon: 'iconsminds-bar-chart-4',
        label: 'Report',
        to: `/vendor/report`,
      },
      {
        id: 'review',
        icon: 'iconsminds-notepad',
        label: 'Review',
        to: `/vendor/review`,
      },
      {
        id: 'order',
        icon: 'iconsminds-cap',
        label: 'Order',
        to: `/vendor/order`,
      },
      {
        id: 'wallet',
        icon: 'iconsminds-wallet',
        label: 'Wallet',
        to: `/vendor/wallet`,
      },
    ];
}

export default data();
