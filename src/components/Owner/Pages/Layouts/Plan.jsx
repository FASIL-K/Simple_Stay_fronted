// Plan.jsx
import React from 'react';
import classNames from 'classnames';

const Plan = ({ name, price, features, className, ...props }) => (
  <div className={classNames('bg-white dark:bg-gray-900 rounded-xl p-6 shadow-xl', className)} {...props}>
    <div className="space-y-2">
      <h4 className="text-2xl font-bold">{name} </h4>
      <span className="text-6xl font-bold">{price}</span>
    </div>
    <ul className="space-y-2 mt-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 dark:text-violet-400">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
          </svg>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <button type="button" className="inline-block px-5 py-3 font-semibold tracki text-center rounded dark:bg-violet-400 dark:text-gray-900 mt-6">Get Started</button>
  </div>
);

export default Plan;