// import React, { useEffect, useState } from "react";
// import { FC } from "react";
// import Axios from "axios";
// import axios from "axios";
// // import { useCommonContext } from "./context_common/context"; // Adjust the import path accordingly
// // import state_list from "./data/dropdown_data/state_list";

// interface Props {
//   fstate: string[];
//   fsetState: (value: string[]) => void;
// }

// const Seller_entry: FC<Props> = ({ fstate, fsetState }) => {
//   // const { full_detail, setFull_detail } = useCommonContext(); // Accessing sname and setSname from CommonContext

//   const [name, setName] = useState("");
//   const [address, setAddress] = useState("");
//   const [gst, setGst] = useState("");
//   const [stat, setStat] = useState("");

//   // NO NEED OF THIS BECAUSE FETCHING DATA IN APP.TSX
//   // useEffect(() => {
//   //   axios
//   //     .get("http://localhost:4000/insert")
//   //     .then((seller_name) => fsetState(seller_name.data))
//   //     .catch((err) => {
//   //       console.log(err);
//   //     });
//   // }, []);

//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     Axios.post("http://localhost:4000/insert", {
//       seller_name: name,
//       seller_address: address,
//       seller_gst: gst,
//       seller_state: stat,
//     }).then((data) => {
//       console.log(data);
//       axios
//         .get("http://localhost:4000/insert")
//         .then((seller_name) => fsetState(seller_name.data))
//         .catch((err) => {
//           console.log(err);
//         });
//     });
//   };

//   console.log(fstate);

//   return (
//     <>
//       <div className="seller-entry-main">
//         <div className="seller-entry-box bold">
//           <form
//             onSubmit={(e) => {
//               handleSubmit(e);
//             }}
//           >
//             <label className="input input-bordered flex items-center gap-2">
//               Seller Name
//               <input
//                 className="grow"
//                 type="text"
//                 placeholder="Seller Name ..."
//                 onChange={(e) => {
//                   setName(e.target.value);
//                 }}
//               />
//             </label>
//             <br />
//             <label className="input input-bordered flex items-center gap-2">
//               Seller Address
//               <input
//                 className="grow"
//                 type="text"
//                 placeholder="Seller Address...."
//                 onChange={(e) => {
//                   setAddress(e.target.value);
//                 }}
//               />
//             </label>
//             <br />
//             <label className="input input-bordered flex items-center gap-2">
//               Seller GST/UID
//               <input
//                 className="grow"
//                 type="text"
//                 placeholder="Seller GST/UID...."
//                 onChange={(e) => {
//                   setGst(e.target.value);
//                 }}
//               />
//             </label>
//             <br />
//             <label className="input input-bordered flex items-center gap-2">
//               Seller State
//               <input
//                 className="grow"
//                 type="text"
//                 placeholder="Seller State...."
//                 onChange={(e) => {
//                   setStat(e.target.value);
//                 }}
//               />
//               {/* Optional dropdown if needed */}
//               {/* 
//     <select
//       autoFocus={true}
//       className="grow"
//       onChange={(e) => {
//         setStat(e.target.value);
//       }}
//     >
//       {state_list?.map((option) => (
//         <option key={option.text} value={option.value}>
//           {option.text}
//         </option>
//       ))}
//     </select>
//     */}
//             </label>
//             <br />
//             <button type="submit" className="btn btn-primary">
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Seller_entry;
import React, { useState } from 'react';
import { FC } from 'react';
import axios from 'axios';

interface Props {
  fstate: string[];
  fsetState: (value: string[]) => void;
}

const SellerEntry: FC<Props> = ({ fstate, fsetState }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [gst, setGst] = useState('');
  const [stat, setStat] = useState('');
  const [stateCode, setStateCode] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/insert', {
        seller_name: name,
        seller_address: address,
        seller_gst: gst,
        seller_state: stat,
        seller_state_code: stateCode
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
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Seller Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Seller Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter seller name"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Seller Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter seller address"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="gst" className="block text-sm font-medium text-gray-700">Seller GST/UID</label>
          <input
            type="text"
            id="gst"
            value={gst}
            onChange={(e) => setGst(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter GST/UID"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">Seller State</label>
          <input
            type="text"
            id="state"
            value={stat}
            onChange={(e) => setStat(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter seller state"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter seller state code"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellerEntry;