import React from "react";
import { RateCard } from "./RateCards";

export function TruckRateCards() {
  return (
    <div>
      <div className="text-center font-bold text-2xl mb-2">Book Mini Trucks in Patna</div>
      <div className="flex justify-center flex-wrap">
        <RateCard
          vehicle="3 Wheeler"
          image="/truck.png"
          weight="20 kg"
          size="40cm x 40cm"
          price="₹32.5"
          description="Base fare is inclusive of 1.0 km distance & 25 minutes of order time..."
          knowMoreLink="#"
        />
      </div>
    </div>
  );
}