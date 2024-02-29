import { Button, Stack, TextField } from "@mui/material";
import React, { useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { setproductState } from "../redux/features/productStateSlice";
import _ from "lodash";

interface FilterProps {
  sellerName?: boolean;
}

export const FilterBar: React.FC<FilterProps> = ({ sellerName }) => {
  const [filter, setFilter] = useState({ name: undefined, sku: undefined, minPrice: undefined, maxPrice: undefined, sellerName });
  const dispatch = useDispatch();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, [event.target.name]: event.target.value });
  };
  return (
    <Stack direction="row" spacing={2} marginBottom={2} sx={{ m: 1 }}>
      <TextField name="name" label="name" variant="outlined" value={filter.name} onChange={handleChange} />
      <TextField name="sku" label="SKU" type="string" variant="outlined" value={filter.sku} onChange={handleChange} />
      <TextField name="minPrice" label="Min Price" type="number" variant="outlined" value={filter.minPrice} onChange={handleChange} />
      <TextField name="maxPrice" label="Max Price" type="number" variant="outlined" value={filter.maxPrice} onChange={handleChange} />
      {true ? <TextField name="sellerName" label="Seller Name" type="string" variant="outlined" value={filter.sellerName} onChange={handleChange} /> : <></>}
      <Button
        sx={{ backgroundColor: "blueviolet" }}
        variant="contained"
        onClick={() => {
          //   const filteredFilter = _.pickBy(filter, (value: any) => value !== null && value !== undefined && value !== "");
          dispatch(setproductState(filter));
        }}
      >
        Apply
      </Button>
    </Stack>
  );
};
