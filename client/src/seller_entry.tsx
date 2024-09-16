import React, { useState } from 'react';
import { FC } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
interface Props {
  fstate: string[];
  fsetState: (value: string[]) => void;
}

const CustomerEntry: FC<Props> = ({ fstate, fsetState }) => {
  const {user} = useUser();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [gst, setGst] = useState('');
  const [stat, setStat] = useState('');
  const [stateCode, setStateCode] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/insert', {
        customer_name: name,
        customer_address: address,
        customer_gst: gst,
        customer_state: stat,
        customer_state_code: stateCode,
        userId : user?.id,
      });
      const response = await axios.get('http://localhost:4000/insert');
      fsetState(response.data);
      // Clear form fields after successful submission
      setName('');
      setAddress('');
      setGst('');
      setStat('');
      setStateCode('');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Customer Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Customer Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0A3A2A] focus:border-[#0A3A2A]"
            placeholder="Enter customer name"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Customer Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0A3A2A] focus:border-[#0A3A2A]"
            placeholder="Enter customer address"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="gst" className="block text-sm font-medium text-gray-700">Customer GST/UID</label>
          <input
            type="text"
            id="gst"
            value={gst}
            onChange={(e) => setGst(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0A3A2A] focus:border-[#0A3A2A]"
            placeholder="Enter GST/UID"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">Customer State</label>
          <input
            type="text"
            id="state"
            value={stat}
            onChange={(e) => setStat(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0A3A2A] focus:border-[#0A3A2A]"
            placeholder="Enter customer state"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="stateCode" className="block text-sm font-medium text-gray-700">State Code</label>
          <input
            type="text"
            id="stateCode"
            value={stateCode}
            onChange={(e) => setStateCode(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0A3A2A] focus:border-[#0A3A2A]"
            placeholder="Enter customer state code"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0D4D36] hover:bg-[#0A3A2A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A3A2A] transition duration-150 ease-in-out"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerEntry;