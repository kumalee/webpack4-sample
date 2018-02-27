import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

ReactDOM.render(
    <div>
        { _.join(['Hello', 'webpack'], ' ') }
    </div>,
    document.getElementById('root')
);
