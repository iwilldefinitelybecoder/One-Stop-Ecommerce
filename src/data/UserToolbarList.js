export const UserToolbarList = [
    {   name:'orders',
        subList:[
            {name:'Orders List',link:'/user/orders'},
            {name:'order Details',link:'/user/order'},
        ],

    },
    {   name:'Profile',
    subList:[
        {name:'View Profile',link:'/user/profile'},
        {name:'Edit Profile',link:'/user/edit-profile'},
    ],
},
{   name:'Wishlist',
    link:'/user/wishlist',
},

{   name:'Payments',
    // subList:[
    //     {name:'Payment-Methods',link:'/user/payment-methods'},
    //     {name:'Edit Payment-methods',link:'/user/edit-payment-methods'},
    // ],
    link:'/user/payment-methods',
},

{   name:'Address',
    // subList:[
    //     {name:'View Address',link:'/user/address'},
    //     {name:'Edit Address',link:'/user/edit-address'},
    // ],
    link:'/user/address',
},


]