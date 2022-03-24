// VarifiedList
// PromotList
import React, { useState, useEffect, useCallback } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  CircularProgress,
} from "@material-ui/core";
import { FaPlus, FaSearch } from "react-icons/fa";
import { useWeb3React } from "@web3-react/core";
import { makeStyles } from "@material-ui/core";
// import KycCard from "./KycCard";
import { useHistory } from "react-router-dom";
import axios from "axios";
import apiConfig, { socketURL } from "src/config/apiConfig";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Page from "src/components/Page";
import { toast } from "react-toastify";
import moment from "moment";
import DataLoading from "src/components/Loaders/DataLoading";
import NoDataFound from "src/components/NoDataFound/NoDataFound";

const TableHeading = [
  {
    id: "Title",
    label: "Title",
    align: "left",
    minWidth: "80px",
    maxWidth: "150px",
  },
  {
    id: "Pre-Sale Wallet Address",
    label: "Pre-Sale Wallet Address",
    align: "left",
    minWidth: "100px",
  },
  {
    id: "Creator Wallet Address",
    label: "Creator Wallet Address",
    align: "left",
    minWidth: "100px",
  },
  { id: "Start Date", label: "Start Date", align: "left", minWidth: "100px" },
  { id: "End Date", label: "End Date", align: "left", minWidth: "100px" },
  { id: "Status", label: "Status", align: "left", minWidth: "100px" },

  { id: " Action", label: " Action", align: "left", minWidth: "100px" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    paddingRight: 0,
  },
  inputAdornment: {
    backgroundColor: "#f5d5da",
    height: 40,
    maxHeight: 40,
    paddingRight: 10,
    paddingLeft: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
}));

export default function VarifiedList() {
  const classes = useStyles();
  const history = useHistory();
  const { account } = useWeb3React();
  const [isLoading, setIsLoading] = useState(false);

  const [list, setList] = useState([]);
  const activeBlockRuleEvent = async (id) => {
    setIsLoading(true);
    await axios({
      method: "GET",
      url: apiConfig.presaleList,

      headers: {
        token: sessionStorage.getItem("token"),
      },
      params: {
        verifyRequest: true,
        isVerify: false,
      },
    })
      .then(async (response) => {
        if (response.data.statusCode === 200) {
          setList(response.data.result);
        } else if (response.data.statusCode === 403) {
        } else {
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (account) {
      activeBlockRuleEvent(account);
    } else {
    }
  }, [account]);

  return (
    <Page title='KYC'>
      <>
        {/* <Box pt={0} textAlign="center" mb={3} className="mainBox">
          <Box mb={3}>
            <Typography variant="h5"> Verified Pre-sale List</Typography>
          </Box>
        </Box> */}

        {isLoading ? (
          <DataLoading style={{ color: "#f4e388" }} />
        ) : (
          <Box pt={3}>
            <TableContainer className='tableHead'>
              <Table id='exportToExcle' stickyHeader aria-label='sticky table'>
                <TableHead>
                  <TableRow>
                    {TableHeading.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          backgroundColor: "#222",
                          color: "#fff",
                          boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                          textAlign: "center",
                          // border: "1px solid #222",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody className='TableBody'>
                  {list &&
                    list?.map((data, i) => {
                      return (
                        <>
                          <TableRow key={i}>
                            <TableCell
                              style={{
                                boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                                textAlign: "center",
                              }}
                              className='table-data p-l-10'
                            >
                              {data.title}
                            </TableCell>
                            <TableCell
                              style={{
                                boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                                textAlign: "center",
                              }}
                              className='table-data'
                            >
                              {data.presaleAddress.substring(0, 4)}
                              {data.presaleAddress.length >= 4 && ` ...`}
                              {data.presaleAddress.substring(4, 0)}
                            </TableCell>
                            <TableCell
                              style={{
                                boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                                textAlign: "center",
                              }}
                              className='table-data'
                            >
                              {data.presaleCreatorAddress.substring(0, 4)}
                              {data.presaleCreatorAddress.length >= 4 && ` ...`}
                              {data.presaleCreatorAddress.substring(4, 0)}
                            </TableCell>

                            <TableCell
                              style={{
                                boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                                textAlign: "center",
                              }}
                              className='table-data'
                            >
                              {/* {moment(data?.startTime).format("lll")} */}
                              {moment(data?.startTime * 1000).format("lll")}
                            </TableCell>

                            <TableCell
                              style={{
                                boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                                textAlign: "center",
                              }}
                              className='table-data'
                            >
                              {/* {moment(data?.endTime).format("lll")} */}

                              {moment(data?.endTime * 1000).format("lll")}
                            </TableCell>
                            <TableCell
                              style={{
                                boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                                textAlign: "center",
                              }}
                              className='table-data'
                            >
                              {data.status}
                            </TableCell>
                            <TableCell
                              style={{
                                boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                                textAlign: "center",
                              }}
                              className='table-data'
                            >
                              <VisibilityIcon
                                disabled
                                style={{
                                  fontSize: "25px",
                                  color: "#bdb4b4",
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  history.push({
                                    pathname: "/app/launched-detail",
                                    search: data.presaleAddress,
                                    hash: data._id,
                                  })
                                }
                              />
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            {!isLoading && list.length === 0 && <NoDataFound />}
          </Box>
        )}
      </>
    </Page>
  );
}
