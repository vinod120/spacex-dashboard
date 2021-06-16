import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import earth from "./img/earth.png";
import wiki from "./img/wiki.png";
import youtube from "./img/youtube.png";
import Button from "@material-ui/core/Button";
import noimg from "./img/no-img.png";


const useStyles = makeStyles({
  table: {
    minWidth: 300,

  },
  logo: {
    maxWidth: 60,
  },
  img: {
    margin: "2px",
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
});
const data = "Space is the boundless three-dimensional extent in which objects and events have relative position and direction.[1] In classical physics, physical space is often conceived in three linear dimensions, although modern physicists usually consider it, with time, to be part of a boundless four-dimensional continuum known as spacetime. The concept of space is considered to be of fundamental importance to an understanding of the physical universe. However, disagreement continues between philosophers over whether it is itself an entity, a relationship between entities, or part of a conceptual framework."
function PopUp(props) {
  console.log(props.data, "props");
  const classes = useStyles();
  function createData(name, data) {
    return { name, data };
  }
  let date = props?.data?.launch_date_utc?.slice(0, 10) + " at " + props?.data?.launch_date_utc?.slice(12, 16)
  const rows = [
    createData("Flight Number", props?.data?.flight_number),
    createData("Mission Name", props?.data?.mission_name),
    createData("Rocket Type", props?.data?.rocket?.rocket_type),
    createData("Rocket Name", props?.data?.rocket?.rocket_name),
    createData("Manufacturer", props?.data?.rocket?.second_stage?.payloads[0]?.manufacturer),
    createData("Nationality", props?.data?.rocket?.second_stage?.payloads[0]?.nationality),
    createData("Launch Date", date),
    createData("Payload Type", props?.data?.rocket?.second_stage?.payloads[0]?.payload_type),
    createData("Orbit", props?.data?.rocket?.second_stage?.payloads[0]?.orbit),
    createData("Launch Site", props?.data?.launch_site?.site_name),
  ];


  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex" }}>
                {/* http://images2.imgbox.com/e0/a7/FNjvKlXW_o.png image is not avilable showing result as
                The URL has been blocked as per the instructions of the Competent 
                Government Authority in compliance to the orders of Court of Law.*/}
                <img src={noimg} alt="" className={classes.logo} />
              </div>
              <div >
                <h5 style={{ margin: "5px" }} >CRS-1</h5>
                <h5 style={{ margin: "5px" }} > Falcon-9</h5>
                <div style={{ display: "flex" }}>
                  <a href={props?.data?.links?.article_link}>
                    <img src={earth} alt="" width="15px" style={{ margin: "2px" }} />
                  </a>
                  <a href={props?.data?.links?.wikipedia}>
                    <img src={wiki} alt="" width="15px" style={{ margin: "2px" }} />
                  </a>
                  <a href={props?.data?.links?.video_link}>
                    <img src={youtube} alt="" width="15px" style={{ margin: "2px" }} />
                  </a>
                </div>

              </div>
              <div>
                {props?.data?.launch_success === null ? (
                  <Button size="small" className={classes.upcoming}>
                    Upcoming
                  </Button>
                ) : props?.data?.launch_success ? (
                  <Button size="small" className={classes.success}>
                    Success
                  </Button>
                ) : (
                  <Button size="small" className={classes.failed}>
                    Failed
                  </Button>
                )}
              </div>
            </div>
            <div style={{ textAlign: "justify", width: "120%" }} > {data}</div>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.data}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default PopUp;
