import React, { useEffect, useState } from "react";
import Axios from "axios";
import axios from "axios";
import { useCommonContext } from "./context_common/context"; // Adjust the import path accordingly
import state_list from "./data/dropdown_data/state_list";

function Seller_entry() {
  const { sname, setSname } = useCommonContext(); // Accessing sname and setSname from CommonContext

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [gst, setGst] = useState("");
  const [stat, setStat] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/insert")
      .then((seller_name) => setSname(seller_name.data))
      .catch((err) => {
        console.log(err);
      });
  }, []); 

  const handleSubmit = (e: any) => {
    e.preventDefault();
    Axios.post("http://localhost:4000/insert", {
      seller_name: name,
      seller_address: address,
      seller_gst: gst,
      seller_state: stat,
    }).then((data) => {
      console.log(data);
      axios
        .get("http://localhost:4000/insert")
        .then((seller_name) => setSname(seller_name.data))
        .catch((err) => {
          console.log(err);
        });
    });
  };

  console.log(sname);

  return (
    <>
      <div className="seller-entry-main">
        <div className="seller-entry-box bold">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <p>Seller Name:</p>
            <input
              className="Name"
              type="text"
              placeholder="Seller Name ..."
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <p>Seller Address:</p>
            <input
              className="Role"
              type="text"
              placeholder="Seller Address...."
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />

            <p>Seller GST/UID:</p>
            <input
              className="Role"
              type="text"
              placeholder="Seller GST/UID...."
              onChange={(e) => {
                setGst(e.target.value);
              }}
            />

            <p>Seller State:</p>
            {/* <input
              className="Role"
              type="text"
              placeholder="Seller State...."
              onChange={(e) => {
                setStat(e.target.value);
              }}
            /> */}
            <select
              autoFocus={true}
              onChange={(e) => {
                setStat(e.target.value);
              }}
            >
              {state_list?.map((option) => (
                <option key={option.text} value={option.value}>
                  {option.text}
                </option>
              ))
              }
              
              
            </select>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Seller_entry;
