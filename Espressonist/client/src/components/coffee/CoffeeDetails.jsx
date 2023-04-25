


import React from 'react';

// CoffeeDetails has a single prop called CoffeeData and returns a div containing all the coffe info for our user , also has image of the coffee bag styled in a circular style
const CoffeeDetails = ({ entry, imageUrl, coffeeData }) => {

  return (
<div>
<h2>{coffeeData.coffee}</h2>
<p><strong>Roaster:</strong> {coffeeData.roaster}</p>
<p><strong>Process:</strong> {coffeeData.process}</p>
<p><strong>Variety:</strong> {coffeeData.variety}</p>
<p><strong>Elevation:</strong> {coffeeData.elevation}f</p>
<p><strong>Roast:</strong> {coffeeData.roast}</p>
<p><strong>In:</strong> {coffeeData.in} s</p>
<p><strong>Out:</strong> {coffeeData.out} s</p>
<p><strong>Time:</strong> {coffeeData.time} s</p>
<p><strong>Grind:</strong> {coffeeData.grind}</p>
<p><strong>Temp:</strong> {coffeeData.temp}°F</p>
<p><strong>Wedge:</strong> {coffeeData.wedge}</p>
<p><strong>WDT:</strong> {coffeeData.wdt ? 'Yes (Weiss Distribution Technique)' : 'No (not using Weiss Distribution Technique)'}</p>
<p><strong>RDT:</strong> {coffeeData.rdt ? 'Yes (Ross Droplet Technique)' : 'No (not using Ross Droplet Technique)'}</p>

<p><strong>Tasting-Notes:</strong> {coffeeData.notes}</p>
<img src={imageUrl} alt="Coffee" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />
</div> );
};


export default CoffeeDetails;