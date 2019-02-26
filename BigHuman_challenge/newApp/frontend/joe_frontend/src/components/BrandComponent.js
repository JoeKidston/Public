import React from 'react';
import logo from './images/logo.JPG';
import compName from './images/compName.JPG';

export default function PlantsComponent(props) {
      return (
      <div>
        <img className="mb-4 headerImage" src={logo} alt="logo" width="150" height="150" />
        <img className="mb-4 headerImage" src={compName} alt="Big Plant" width="300" height="auto" />
      </div>
    );
  }