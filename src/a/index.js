import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash/core';
import './index.css';

ReactDOM.render(
    <div>
        { (_.concat(['Hello', 'webpack'], [' 4'])).join(' ') }
        <p>Updated!</p>
        <p>Updated 2!</p>
    </div>,
    document.getElementById('root')
);
