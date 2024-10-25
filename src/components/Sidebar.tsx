import React from 'react';
import { FaHome, FaSearch, FaPlus, FaInbox, FaUser } from 'react-icons/fa';

function Sidebar() {
  return (
    <div className="w-16 bg-black border-r border-gray-800 flex flex-col items-center py-4">
      <button className="p-3 text-white hover:bg-gray-800 rounded-full mb-4">
        <FaHome className="text-2xl" />
      </button>
      <button className="p-3 text-white hover:bg-gray-800 rounded-full mb-4">
        <FaSearch className="text-2xl" />
      </button>
      <button className="p-3 text-white hover:bg-gray-800 rounded-full mb-4">
        <FaPlus className="text-2xl" />
      </button>
      <button className="p-3 text-white hover:bg-gray-800 rounded-full mb-4">
        <FaInbox className="text-2xl" />
      </button>
      <button className="p-3 text-white hover:bg-gray-800 rounded-full">
        <FaUser className="text-2xl" />
      </button>
    </div>
  );
}

export default Sidebar;