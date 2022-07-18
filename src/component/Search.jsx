import React, { useState } from "react";
import "./Search.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SearchAPI from "../API/SearchAPI";
let userTypeData= [];
function Search() {
  const [optionsData, setOptionsData] = useState([]);
  const [userSearchData, setUserSearchData] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const searchOnchage = (data) => {
    userTypeData.push(data);
    console.log(userTypeData);
    SearchAPI.locationSearch(data)
      .then((response) => {
        if(response.status === 200){
          setOptionsData(response.data);
        }
      })
      .catch((error) => {});
  };

  const searchOnclick = (data) => {
    if (data && data.label) {
      const dataArray = data.label.split(",");
      userTypeData.push(dataArray[0]);
      setUserSearchData((current) => [...current, dataArray[0]]);
      SearchAPI.saveSearchData(userTypeData)
        .then((response) => {
          userTypeData = [];
        })
        .catch((error) => {});
    }
  };

  return (
    <div className="Search">
      <div className="vertical-center">
        <div className="w-50 m-auto">
          <div className="row">
            <div className="col">
              <Autocomplete
                className="w-100"
                freeSolo
                disablePortal
                onChange={(event, newValue) => {
                  searchOnclick(newValue);
                }}
                id="combo-box-demo"
                options={optionsData}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Location"
                    onChange={(e) => searchOnchage(e.target.value)}
                  />
                )}
              />
            </div>
          </div>
          <div className="row mt-3 justify-content-end">
            {userSearchData.length - 1 >= 0 && (
              <div className="col-4">
                <div className="btn btn-secondary w-100">
                  {userSearchData[userSearchData.length - 1]}
                </div>
              </div>
            )}
            {userSearchData.length - 2 >= 0 && (
              <div className="col-4">
                <div className="btn btn-secondary w-100">
                  {userSearchData[userSearchData.length - 2]}
                </div>
              </div>
            )}
            {userSearchData.length - 3 >= 0 && (
              <div className="col-4">
                <Button
                  id="basic-button"
                  className="btn btn-secondary w-100"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <span className="badge bg-danger rounded-circle">
                    {userSearchData.length - 2}
                  </span>{" "}
                  More
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {userSearchData.map((e, index) => {
                    return (
                      index < userSearchData.length - 2 && (
                        <MenuItem key={index} onClick={handleClose}>
                          {e}
                        </MenuItem>
                      )
                    );
                  })}
                </Menu>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
