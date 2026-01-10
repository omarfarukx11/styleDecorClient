import React from 'react';

const Title = ({children}) => {
    return (
        <div className="bg-primary py-8 text-center text-base-200 text-5xl">
        <h1>{children}</h1>
      </div>
    );
};

export default Title;