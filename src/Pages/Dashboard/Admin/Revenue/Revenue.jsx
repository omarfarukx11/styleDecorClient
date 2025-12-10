import React from 'react';

const Revenue = () => {
    return (
       <div>
      <h2 className="text-2xl font-bold mb-8">Revenue & Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-base-100 p-8 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-6">Monthly Revenue</h3>
          <div className="h-64 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center text-white text-4xl font-bold">
            ৳ 4,85,000
          </div>
        </div>

        <div className="bg-base-100 p-8 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-6">Top Performing Services</h3>
          <div className="space-y-4">
            {["Wedding Full Package", "Home Interior", "Birthday Theme", "Corporate Event"].map((s, i) => (
              <div key={i} className="flex justify-between items-center">
                <span>{s}</span>
                <progress className="progress progress-primary w-56" value={80 - i*10} max="100"></progress>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    );
};

export default Revenue;