import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Pagination from "@material-ui/lab/Pagination";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { Modal, Spin } from "antd";
import PopUp from "./model";
import "./styles.css";
import filter from "./img/filter.png"
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    // "&:nth-of-type(odd)": {
    //   backgroundColor: theme.palette.action.hover,
    // },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  upcoming: {
    color: "#a55f2f !important",
    backgroundColor: "#fef3c7 !important",
    textTransform: "capitalize !important",
    fontWeight: "bold",
    borderRadius: "50px",
    padding: "0px 10px",
  },
  success: {
    color: "#1b6652 !important",
    backgroundColor: "#def7ec !important",
    textTransform: "capitalize !important",
    fontWeight: "bold",
    borderRadius: "50px",
    padding: "0px 10px",
  },
  failed: {
    color: "#9e2728 !important",
    backgroundColor: "#fde2e1 !important",
    textTransform: "capitalize !important",
    fontWeight: "bold",
    borderRadius: "50px",
    padding: "0px 10px",
  },
  pointing: {
    cursor: "pointer"
  },
});

export default function Dashboard() {
  const classes = useStyles();
  const [data, setData] = useState("");
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [popUpData, setPopUpData] = useState("");
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.spacexdata.com/v3/launches")
      .then((res) => {
        setLoading(false);
        setData(res.data);
        // res.data.map((item)=>(
        //     console.log(item.rocket.second_stage.payloads[0].orbit)
        // ))
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);
  //   console.log(data.length, 'length')
  const [activePage, setActivePage] = useState(1);
  let totalPages = Math.ceil(data?.length % 2 === 0)
    ? Math.ceil(data.length / 10)
    : Math.ceil(data.length / 10) - 1;
  // console.log(totalPages)
  let offset = (activePage - 1) * 10;
  const handlePageChange = (e, value) => {
    setActivePage(value);
  };

  const handlePopUp = (e, item) => {
    console.log(item, "item");
    setPopUpData(item);
    showModal();
  };
  const handleFilter = (e, launch) => {
    //   alert(launch)
    setLoading(true);
    if (launch === "Upcoming Launches") {
      axios
        .get("https://api.spacexdata.com/v3/launches/upcoming")
        .then((res) => {
          setLoading(false);
          setData(res.data);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else if (launch === "Successful Launches") {
      axios
        .get("https://api.spacexdata.com/v3/launches")
        .then((res) => {
          setLoading(false);
          let temp = res.data.filter((item) => item.launch_success);
          // console.log(temp);
          setData(temp);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else if (launch === "Failed Lanuches") {
      axios
        .get("https://api.spacexdata.com/v3/launches")
        .then((res) => {
          setLoading(false);
          let temp = res.data.filter((item) => item.launch_success === false);
          // console.log(temp);
          setData(temp);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else {
      axios
        .get("https://api.spacexdata.com/v3/launches")
        .then((res) => {
          setLoading(false);
          setData(res.data);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
    handleClose(e);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          padding: "10px",
          margin: "10px",
          alignItems: "center",
        }}
        onClick={handleToggle}
      >
        <div>
          <ArrowDropDownIcon className={classes.pointing} />
        </div>

        <Button

          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
        >
          All Launches
        </Button>
        <img src={filter} width="15px" alt="" className={classes.pointing} />
      </div>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={(e) => handleFilter(e, "All Launches")}>
                    All Launches
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => handleFilter(e, "Upcoming Launches")}
                  >
                    Upcoming Launches
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => handleFilter(e, "Successful Launches")}
                  >
                    Successful Launches
                  </MenuItem>
                  <MenuItem onClick={(e) => handleFilter(e, "Failed Lanuches")}>
                    Failed Lanuches
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <TableContainer component={Paper}>
        <Table className="table_head" aria-label="customized table">
          <TableHead>
            <TableRow className="table">
              <StyledTableCell>No </StyledTableCell>
              <StyledTableCell align="right">
                Launched&nbsp;(UTC)
              </StyledTableCell>
              <StyledTableCell align="right">Location</StyledTableCell>
              <StyledTableCell align="right">Mission</StyledTableCell>
              <StyledTableCell align="right">Orbit</StyledTableCell>
              <StyledTableCell align="right">Launch Status</StyledTableCell>
              <StyledTableCell align="right">Rocket</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data
                .filter((item, index) => {
                  const pageCondition =
                    index + 1 > offset && index + 1 < offset + 11;
                  return pageCondition;
                })
                .map((item, index) => (
                  <StyledTableRow key={item?.mission_name}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item?.launch_date_local?.slice(0, 10)} at  {item?.launch_date_local?.slice(11, 16)}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item?.launch_site?.site_name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item?.mission_name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item?.rocket?.second_stage?.payloads[0]?.orbit}
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      onClick={(e) => handlePopUp(e, item)}
                    >
                      {item?.launch_success === null ? (
                        <Button size="small" className={classes.upcoming}>
                          Upcoming
                        </Button>
                      ) : item?.launch_success ? (
                        <Button size="small" className={classes.success}>
                          Success
                        </Button>
                      ) : (
                        <Button size="small" className={classes.failed}>
                          Failed
                        </Button>
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item?.rocket?.rocket_name}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <Modal

          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <PopUp data={popUpData} />
        </Modal>
      </div>
      <div style={{ display: "flex", flexDirection: "row-reverse" }}>
        {data && data?.length > 10 && (
          <Pagination
            count={totalPages}
            page={activePage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            color="secondary"
          />
        )}
      </div>
      <div style={{ width: "20%", margin: "auto" }}>
        {loading && <Spin size="large" tip="Loading..." />}
      </div>
    </>
  );
}
