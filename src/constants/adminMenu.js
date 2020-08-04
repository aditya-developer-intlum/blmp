function data(){
  return [{
      id: 'dashboard',
      icon: 'iconsminds-dashboard',
      label: 'Dashboard',
      to: `/${localStorage.getItem('user_type')}/dashboard/home`,
    },
    {
      id: 'users',
      icon: 'iconsminds-business-man',
      label: 'Users',
      to: `#`,
      subs: [{
          icon: 'iconsminds-align-justify-all',
          label: 'Manage Vendor',
          to: `/${localStorage.getItem('user_type')}/vendor/list`,
        },
        {
          icon: 'iconsminds-align-justify-all',
          label: 'Manage Users',
          to: `/${localStorage.getItem('user_type')}/users/list`,
        },
        {
          icon: 'iconsminds-align-justify-all',
          label: 'Manage Delivery Staff',
          to: `/${localStorage.getItem('user_type')}/delivery-staff/list`,
        }
      ],
    },
    {
      id: 'manage_restaurant',
      icon: 'glyph-icon iconsminds-hotel',
      label: 'Restaurants',
      to: `#`,
      subs: [{
          icon: 'iconsminds-align-justify-all',
          label: 'Restaurants',
          to: `/${localStorage.getItem('user_type')}/restaurant`,
        },
        {
          icon: 'iconsminds-align-justify-all',
          label: 'Restaurant Packages',
          to: `/${localStorage.getItem('user_type')}/package`,
        },
        {
          icon: 'iconsminds-align-justify-all',
          label: 'Cuisines',
          to: `/${localStorage.getItem('user_type')}/cuisines`,
        },
        {
          icon: 'iconsminds-align-justify-all',
          label: 'Token Amount',
          to: `/${localStorage.getItem('user_type')}/token-amount`,
        }
      ]
    },
    {
      id: 'manage_order',
      icon: 'iconsminds-hamburger',
      label: 'Orders',
      to: `#`,
      subs: [{
          icon: 'iconsminds-align-justify-all',
          label: 'Orders',
          to: `/${localStorage.getItem('user_type')}/order`,
        }
      ]
    },
    {
      id: 'manage_offer',
      icon: 'iconsminds-gift-box',
      label: 'Offers',
      to: `/${localStorage.getItem('user_type')}/manage-offer`
    },
    {
      id: 'manage_cms',
      icon: 'simple-icon-globe',
      label: 'CMS',
      to: `#`,
      subs: [{
          icon: 'iconsminds-align-justify-all',
          label: 'CMS',
          to: `/${localStorage.getItem('user_type')}/cms`,
        },
        {
          icon: 'iconsminds-align-justify-all',
          label: 'FAQ',
          to: `/${localStorage.getItem('user_type')}/faq`,
        },
        {
          icon: 'iconsminds-align-justify-all',
          label: 'Home Page Banner',
          to: `/${localStorage.getItem('user_type')}/home-page-banner`,
        },
        {
          icon: 'iconsminds-align-justify-all',
          label: 'Navigation',
          to: `/${localStorage.getItem('user_type')}/navigation`,
        }
      ]
    },
    {
      id: 'manage_template',
      icon: 'simple-icon-screen-smartphone',
      label: 'Template',
      to: `#`,
      subs: [{
          icon: 'iconsminds-align-justify-all',
          label: 'Email Templates',
          to: `/${localStorage.getItem('user_type')}/email-template`,
        },
        {
          icon: 'iconsminds-align-justify-all',
          label: 'Sms Templates',
          to: `/${localStorage.getItem('user_type')}/sms-template`,
        },
        {
          icon: 'iconsminds-align-justify-all',
          label: 'Notification Templates',
          to: `/${localStorage.getItem('user_type')}/notification-template`,
        },
        {
          icon: 'iconsminds-align-justify-all',
          label: 'System Template',
          to: `/${localStorage.getItem('user_type')}/system-template`,
        }
      ]
    },
    {
      id: 'manage_blog',
      icon: 'iconsminds-newspaper',
      label: 'Blog',
      to: `#`,
      subs: [{
          icon: 'iconsminds-align-justify-all',
          label: 'Categories',
          to: `/${localStorage.getItem('user_type')}/mange-category`,
        },
        {
          icon: 'iconsminds-align-justify-all',
          label: 'Posts',
          to: `/${localStorage.getItem('user_type')}/posts`,
        },
        {
          icon: 'iconsminds-align-justify-all',
          label: 'Contributions',
          to: `/${localStorage.getItem('user_type')}/contribution`,
        },
        {
          icon: 'iconsminds-align-justify-all',
          label: 'Comments',
          to: `/${localStorage.getItem('user_type')}/comments`,
        }
      ]
    },
    {
      id: 'manage_advertisement',
      icon: 'iconsminds-megaphone',
      label: 'Advertisement',
      to: `#`,
      subs: [{
          icon: 'iconsminds-align-justify-all',
          label: 'Advertisement',
          to: `/${localStorage.getItem('user_type')}/advertisement`,
        },
        {
          icon: 'iconsminds-align-justify-all',
          label: 'Advertisement Requests',
          to: `/${localStorage.getItem('user_type')}/advertisement-request`,
        }
      ]
    },
    {
      id: 'manage_setting',
      icon: 'simple-icon-settings',
      label: 'Setting',
      to: `#`,
      subs: [{
          icon: 'iconsminds-align-justify-all',
          label: 'Setting',
          to: `/${localStorage.getItem('user_type')}/setting`,
        },
        {
          icon: 'iconsminds-align-justify-all',
          label: 'Maintenance Mode Setting',
          to: `/${localStorage.getItem('user_type')}/maintenance-mode-setting`,
        },
        {
          icon: 'iconsminds-align-justify-all',
          label: 'Payment Methods',
          to: `/${localStorage.getItem('user_type')}/payment-methods`,
        },
        {
          icon: 'iconsminds-align-justify-all',
          label: 'Manage Translation',
          to: `/${localStorage.getItem('user_type')}/manage-translation`,
        },
        {
          icon: 'iconsminds-align-justify-all',
          label: 'Manage Phone Code',
          to: `/${localStorage.getItem('user_type')}/phone-code`,
        },
        {
          icon: 'iconsminds-align-justify-all',
          label: 'Location',
          to: `/${localStorage.getItem('user_type')}/location`,
        }
      ]
    },
    {
      id: 'manage_withdrawal_request',
      icon: 'iconsminds-handshake',
      label: 'With Requests',
      to: `#`,
      subs: [{
          icon: 'iconsminds-align-justify-all',
          label: 'Fund Withdrawal Requests',
          to: `/${localStorage.getItem('user_type')}/fund-withdrawal-requests`,
        }
      ]
    },
    {
      id: 'manage_reviews',
      icon: 'simple-icon-star',
      label: 'Reviews',
      to: `/${localStorage.getItem('user_type')}/reviews`
    },
    {
      id: 'reports',
      icon: 'iconsminds-files',
      label: 'Reports',
      to: `#`,
      subs: [{
          icon: 'iconsminds-align-justify-all',
          label: 'Reports',
          to: `/${localStorage.getItem('user_type')}/reports`,
        },
        {
          icon: 'iconsminds-align-justify-all',
          label: 'Visitors',
          to: `/${localStorage.getItem('user_type')}/visitors`,
        },
        {
          icon: 'iconsminds-align-justify-all',
          label: 'Order',
          to: `/${localStorage.getItem('user_type')}/orders`,
        },
        {
          icon: 'iconsminds-align-justify-all',
          label: 'Signup',
          to: `/${localStorage.getItem('user_type')}/signup`,
        }
      ]
    },
    {
      id: 'manage_admin',
      icon: 'iconsminds-user',
      label: 'Admin',
      to: `#`,
      subs: [{
          icon: 'iconsminds-align-justify-all',
          label: 'Admin',
          to: `/${localStorage.getItem('user_type')}/admin`,
        },
        {
          icon: 'iconsminds-align-justify-all',
          label: 'Password',
          to: `/${localStorage.getItem('user_type')}/password`,
        }
      ]
    },
    {
      id: 'backup',
      icon: 'iconsminds-data-download',
      label: 'Backup',
      to: `#`,
      subs: [{
          icon: 'iconsminds-data-center',
          label: 'Database Backup',
          to: `/${localStorage.getItem('user_type')}/database-backup`,
        },
        {
          icon: 'iconsminds-photo',
          label: 'Images Backup',
          to: `/${localStorage.getItem('user_type')}/image-backup`,
        }
      ]
    },

 /*   {
      id: 'category',
      icon: 'iconsminds-tag',
      label: 'Category',
      to: `/${localStorage.getItem('user_type')}/category`,
    },
    {
      id: 'product-attribute',
      icon: 'iconsminds-tag',
      label: 'Product Attribute',
      to: `/${localStorage.getItem('user_type')}/product-attribute`,
    },
    {
      id: 'product',
      icon: 'iconsminds-shopping-bag',
      label: 'Product',
      to: `/${localStorage.getItem('user_type')}/product`,
    }*/
    {
      id: 'delivery_staff',
      icon: 'iconsminds-scooter',
      label: 'Delivery Staff',
      to: `/${localStorage.getItem('user_type')}/delivery_staff`,
      subs: [{
          icon: 'iconsminds-align-justify-all',
          label: 'Delivery Staff List',
          to: `/${localStorage.getItem('user_type')}/delivery_staff/list`,
        },
        {
          icon: 'iconsminds-add',
          label: 'Create Delivery Staff',
          to: `/${localStorage.getItem('user_type')}/delivery_staff/create`,
        }
      ]
    },
  ];

}
export default data();
