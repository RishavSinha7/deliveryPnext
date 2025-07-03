import React from "react";
import { RateCard } from "./RateCards";

export function IntercityCourierCards() {
  return (
    <div className="my-16">
      <div className="text-center font-bold text-2xl mb-8">Why is Porter your go-to for Intercity Courier Services?</div>
      <div className="text-center text-gray-600 mb-8">
        Your reliable intercity courier partner to ship all your parcels to 19000+ Indian pincodes. Hassle-free & easy to send couriers for all individuals and businesses.
      </div>
      <div className="flex justify-center flex-wrap gap-12">
        <div className="text-center">
          <div className="mb-4 flex justify-center flex-wrap"><img src="/pm.jpeg" alt="Door-to-Door Delivery" style={{ height: 64 }} /></div>
          <div className="font-bold">Door-to-Door Delivery</div>
          <div className="text-gray-600">Enjoy doorstep pick-up & delivery with Porter Intercity Courier Services</div>
        </div>
        <div className="text-center">
          <div className="mb-4 flex justify-center flex-wrap"><img src="/pm.jpeg" alt="Door-to-Door Delivery" style={{ height: 64 }} /></div>
          <div className="font-bold">Timely Deliveries</div>
          <div className="text-gray-600">Choose the mode of intercity courier delivery, via air or surface, for reliable and on-time parcel deliveries</div>
        </div>
        <div className="text-center">
          <div className="mb-4 flex justify-center flex-wrap"><img src="/pm.jpeg" alt="Door-to-Door Delivery" style={{ height: 64 }} /></div>
          <div className="font-bold">Shipping Label Printing On Us</div>
          <div className="text-gray-600">Just mention your CR number and we take care of printing shipping labels for you</div>
        </div>
      </div>
    </div>
  );
}