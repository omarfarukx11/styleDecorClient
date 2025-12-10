import React from 'react';

const ManageDecorators = () => {
  return (
   <div>
      <h2 className="text-2xl font-bold mb-8">Manage Decorators</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="card bg-base-100 shadow-xl border border-neutral/10">
            <div className="card-body">
              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className="w-20 rounded-full">
                    <img src="https://i.ibb.co.com/5Yj57jB/admin-avatar.jpg" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold">Karim Rahman</h3>
                  <p className="text-sm opacity-70">Specialty: Wedding & Home</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-500">★</span>
                    ))}
                    <span className="text-sm ml-2">(4.8)</span>
                  </div>
                </div>
              </div>
              <div className="card-actions justify-between items-center mt-4">
                <span className="badge badge-primary">12 Projects</span>
                <div className="flex gap-2">
                  <button className="btn btn-sm btn-success">Approve</button>
                  <button className="btn btn-sm btn-warning">Disable</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageDecorators;
