import React, { useEffect, useState } from "react";
import { FC } from "react";
import Axios from "axios";
import axios from "axios";
// import { useCommonContext } from "./context_common/context"; // Adjust the import path accordingly
import state_list from "./data/dropdown_data/state_list";

interface Props {
  fstate: string[];
  fsetState: (value: string[]) => void;
}

const Seller_entry: FC<Props> = ({ fstate, fsetState }) => {
  // const { full_detail, setFull_detail } = useCommonContext(); // Accessing sname and setSname from CommonContext

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [gst, setGst] = useState("");
  const [stat, setStat] = useState("");

  // NO NEED OF THIS BECAUSE FETCHING DATA IN APP.TSX
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:4000/insert")
  //     .then((seller_name) => fsetState(seller_name.data))
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

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
        .then((seller_name) => fsetState(seller_name.data))
        .catch((err) => {
          console.log(err);
        });
    });
  };

  console.log(fstate);

  return (
    <>
      <div className="seller-entry-main">
        <div className="seller-entry-box bold">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <label className="input input-bordered flex items-center gap-2">
              Seller Name
              <input
                className="grow"
                type="text"
                placeholder="Seller Name ..."
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>
            <br />
            <label className="input input-bordered flex items-center gap-2">
              Seller Address
              <input
                className="grow"
                type="text"
                placeholder="Seller Address...."
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </label>
            <br />
            <label className="input input-bordered flex items-center gap-2">
              Seller GST/UID
              <input
                className="grow"
                type="text"
                placeholder="Seller GST/UID...."
                onChange={(e) => {
                  setGst(e.target.value);
                }}
              />
            </label>
            <br />
            <label className="input input-bordered flex items-center gap-2">
              Seller State
              <input
                className="grow"
                type="text"
                placeholder="Seller State...."
                onChange={(e) => {
                  setStat(e.target.value);
                }}
              />
              {/* Optional dropdown if needed */}
              {/* 
    <select
      autoFocus={true}
      className="grow"
      onChange={(e) => {
        setStat(e.target.value);
      }}
    >
      {state_list?.map((option) => (
        <option key={option.text} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
    */}
            </label>
            <br />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Seller_entry;
