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

const TableHeading = [
  {
    id: "KYC Check Id",
    label: "KYC Check Id",
    align: "left",
    minWidth: "80px",
    maxWidth: "150px",
  },
  {
    id: "Wallet Address",
    label: "Wallet Address",
    align: "left",
    minWidth: "100px",
  },
  { id: "Created At", label: "Created At", align: "left", minWidth: "100px" },
  { id: "KYC Status", label: "KYC Status", align: "left", minWidth: "100px" },

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

export default function () {
  const history = useHistory();
  const { activate, deactivate, account, library, chainId } = useWeb3React();
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState();
  const activeBlockRuleEvent = async (id) => {
    // setIsUpdating(true);

    const formData = new FormData();
    formData.append("_id", "61c596ce5f87715bd5aeb68f");

    const response = await axios({
      method: "GET",
      url: apiConfig.kycListAdmin,

      headers: {
        token: sessionStorage.getItem("token"),
      },
    }).then(async (response) => {
      if (response.data.statusCode === 200) {
        // toast.success(response.data.responseMessage);

        setList(response.data.result);
        // listRuleEventfun();
      } else if (response.data.statusCode === 403) {
      } else {
      }
    });
  };

  useEffect(() => {
    if (account) {
      // connectWalletAPICall();
      activeBlockRuleEvent(account);
    } else {
      // setIsLogin(false);
      // setTokenSession(null);
    }
  }, [account]);

  return (
    <Page title="KYC">
      <>
        {/* 
        <Box width="100%" textAlign="end" mb={3} pt={3} className="mainBox">
          <Typography variant="h5"> View KYC Details</Typography>
        </Box> */}
        <Box pt={3}>
          {!list ? (
            <DataLoading style={{ color: "#f4e388" }} />
          ) : (
            <TableContainer className="tableHead">
              <Table id="exportToExcle" stickyHeader aria-label="sticky table">
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
                <TableBody className="TableBody">
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
                              className="table-data p-l-10"
                            >
                              <span style={{ fontSize: "23px" }}>
                                {data.fraudCheckId.substring(0, 4)}
                                {data.fraudCheckId.length >= 4 && ` ...`}
                                {data.fraudCheckId.substring(4, 0)}
                              </span>
                            </TableCell>
                            <TableCell
                              style={{
                                boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                                textAlign: "center",
                              }}
                              className="table-data"
                            >
                              {data.walletAddress.substring(0, 4)}
                              {data.walletAddress.length >= 4 && ` ...`}
                              {data.walletAddress.substring(4, 0)}
                              {/* {data?.walletAddress} */}
                            </TableCell>

                            <TableCell
                              style={{
                                boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                                textAlign: "center",
                              }}
                              className="table-data"
                            >
                              {moment(data?.createdAt).format("lll")}
                            </TableCell>

                            <TableCell
                              style={{
                                boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                                textAlign: "center",
                              }}
                              className="table-data"
                            >
                              {data.status}
                            </TableCell>
                            <TableCell
                              style={{
                                boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                                textAlign: "center",
                              }}
                              className="table-data"
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
                                    pathname: "/app/view-kyc",
                                    state: { data12: data },
                                    search: data._id,
                                  })
                                }
                              />
                              {/* {data.status} */}
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </>
    </Page>
  );
}
