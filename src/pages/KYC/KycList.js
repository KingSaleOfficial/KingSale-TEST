import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
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
import { UserContext } from "src/context/User";

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

export default function KycList() {
  const classes = useStyles();
  const history = useHistory();
  const { activate, deactivate, account, library, chainId } = useWeb3React();
  const [isLoading, setIsLoading] = useState(false);
  const user = useContext(UserContext);
  const [list, setList] = useState();
  const activeBlockRuleEvent = async (id) => {
    // setIsUpdating(true);

    const formData = new FormData();
    formData.append("_id", "61c596ce5f87715bd5aeb68f");

    const response = await axios({
      method: "GET",
      url: apiConfig[
        user?.userData?.userType == "Admin" ? "kycListAdmin" : "listKYC"
      ],

      headers: {
        token: sessionStorage.getItem("token"),
      },
      params: {
        walletAddress: user?.userData?.userType == "Admin" ? "" : account,
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
  }, [account, user.userData]);

  return (
    <Page title='KYC'>
      <>
        <Box pt={4} textAlign='end' mb={3}>
          <Button
            style={{
              border: "1px dashed #e8424c",
              borderRadius: 10,
              paddingLeft: 15,
              paddingRight: 15,
              marginBottom: 10,
            }}
            onClick={() => history.push("/app/add-kyc")}
          >
            <FaPlus color='#e8424c' />
            &nbsp;&nbsp;<span style={{ color: "#fff" }}>Add KYC</span>
          </Button>
        </Box>
        {!list ? (
          <DataLoading />
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
                              {data.fraudCheckId.substring(0, 4)}
                              {data.fraudCheckId.length >= 4 && ` ...`}
                              {data.fraudCheckId.substring(4, 0)}
                            </TableCell>
                            <TableCell
                              style={{
                                boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                                textAlign: "center",
                              }}
                              className='table-data'
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
                              className='table-data'
                            >
                              {moment(data?.createdAt).format("lll")}
                            </TableCell>

                            <TableCell
                              style={{
                                boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                                textAlign: "center",
                              }}
                              className='table-data'
                            >
                              {data.kycStatus}
                            </TableCell>
                            <TableCell
                              style={{
                                boxShadow: "0 0 8px 0 rgb(99 99 99 / 20%)",
                                textAlign: "center",
                              }}
                              className='table-data'
                            >
                              {console.log(
                                "---------------------_____--1232",
                                data._id
                              )}
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
          </Box>
        )}
      </>
    </Page>
  );
}
