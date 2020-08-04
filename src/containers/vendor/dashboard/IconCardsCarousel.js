/* eslint-disable react/no-array-index-key */
import React from 'react';
import IconCard from '../../../components/cards/IconCard';
import GlideComponent from '../../../components/carousel/GlideComponent';

const IconCardsCarousel = ({ className = 'icon-cards-row' }) => {
  const senddata = [
    {
      icon: "iconsminds-clock",
      title: "Pending Orders",
      value: 14
    },{
      icon: "iconsminds-basket-coins",
      title: "Completed Orders",
      value: 32
    },{
      icon: "iconsminds-arrow-refresh",
      title: "Order In Progress",
      value: 2
    }
  ]
  return (
    <div className={className}>
      <GlideComponent
        settings={{
          gap: 5,
          perView: 3,
          type: 'carousel',
          breakpoints: {
            320: { perView: 1 },
            576: { perView: 2 },
            1600: { perView: 3 }
          },
          hideNav: true,
        }}
      >
        {senddata.map((item, index) => {
          return (
            <div key={`icon_card_${index}`}>
              <IconCard {...item} className="mb-4" />
            </div>
          );
        })}
      </GlideComponent>
    </div>
  );
};
export default IconCardsCarousel;
