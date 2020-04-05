import React from 'react';

export const scaleToNatural = (naturalDim, pageDim, x) => {
    return Math.floor((naturalDim/pageDim)*x, 2);
}


export const displayMouseCoords = (event, offsets, natural) => {
    let offsetHeight = offsets.height;
    let offsetWidth = offsets.width;
    let offsetTop = offsets.top;
    let offsetLeft = offsets.left;
    let imageY = event.clientY - offsetTop;
    let imageX = event.clientX - offsetLeft;
    let naturalHeight = natural.height;
    let naturalWidth = natural.width;
    console.clear();
    console.log('Original image size: Height: ' + naturalHeight + ' Width: ' + naturalWidth);
    console.log('Webpage image size: Height: ' + offsetHeight + ' Width: ' + offsetWidth);
    console.log('Coordinates relative to page, X: ' + event.clientX + ' Y: ' + event.clientY);
    console.log('Coordinates relative to webpage image X: ' + imageX + ' Y: ' + imageY);
    console.log('Coordinates relative to natural image X: ' + scaleToNatural(naturalWidth, offsetWidth, imageX) + ' Y: ' + scaleToNatural(naturalHeight, offsetHeight, imageY));
};


export class Label {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }

    changeColor(color) {
        this.color = color;
    }
}