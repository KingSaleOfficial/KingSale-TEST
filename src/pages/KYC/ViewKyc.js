import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Box,
  Typography,
  TextField,
  Grid,
  Container,
  Link,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from "@material-ui/core";
import { useLocation } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";
import apiConfig, { socketURL } from "src/config/apiConfig";
// import ViewKycList from "./View-KycList";
import PageLoading from "src/components/PageLoading/PageLoading";
import DataLoading from "src/components/Loaders/DataLoading";
import { UserContext } from "src/context/User";
import ButtonCircularProgress from "src/components/Loaders/ButtonCircularProgress";

const ViewKyc = (props) => {
  const location = useLocation();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdating1, setIsUpdating1] = useState(false);
  const user = useContext(UserContext);
  const [list, setList] = useState();
  const AcceptKyc = async () => {
    setIsUpdating(true);

    const formData = new FormData();
    formData.append("_id", "61c596ce5f87715bd5aeb68f");

    const response = await axios({
      method: "PUT",
      url: apiConfig.approveKyc,

      headers: {
        token: sessionStorage.getItem("token"),
      },
      data: {
        kycId: data._id,
      },
    }).then(async (response) => {
      if (response.data.statusCode === 200) {
        toast.success(response.data.responseMessage);
        setIsUpdating(false);
        setList(response.data.result);
        ViewKycList();
        // listRuleEventfun();
      } else if (response.data.statusCode === 403) {
        toast.error(response.data.responseMessage);
        setIsUpdating(false);
      } else {
        toast.error(response.data.responseMessage);
        setIsUpdating(false);
      }
    });
  };

  const RejectKyc = async () => {
    setIsUpdating1(true);

    const formData = new FormData();
    formData.append("_id", "61c596ce5f87715bd5aeb68f");

    const response = await axios({
      method: "PUT",
      url: apiConfig.rejectKyc,

      headers: {
        token: sessionStorage.getItem("token"),
      },
      data: {
        kycId: data._id,
      },
    }).then(async (response) => {
      if (response.data.statusCode === 200) {
        toast.success(response.data.responseMessage);
        setIsUpdating1(false);
        setList(response.data.result);
        ViewKycList();
        // listRuleEventfun();
      } else if (response.data.statusCode === 403) {
        setIsUpdating1(false);
        toast.error(response.data.responseMessage);
      } else {
        toast.error(response.data.responseMessage);
        setIsUpdating1(false);
      }
    });
  };
  const [data, setListData] = useState("");
  const [isUpdating2, setIsUpdating2] = useState(false);
  const ViewKycList = async (id) => {
    const response = await axios({
      method: "GET",
      url: `${apiConfig.viewKyc}/${location.search.substring(
        1,
        location.search.length
      )}`,

      // params: {
      //  _id: location.search.substring(1, location.search.length),
      // },
    }).then(async (response) => {
      if (response.data.statusCode === 200) {
        // toast.success(response.data.responseMessage);
        setIsUpdating2(false);
        setListData(response.data.result);
        // listRuleEventfun();
      } else if (response.data.statusCode === 403) {
        setIsUpdating2(false);
        // toast.error(response.data.responseMessage);
      } else {
        // toast.error(response.data.responseMessage);
        setIsUpdating2(false);
      }
    });
  };
  useEffect(() => {
    if (location.search) {
      const ids = location.search.split();
      ViewKycList(ids);

      setIsUpdating2(true);
    }
  }, [location]);

  return (
    <Box>
      {!isUpdating2 ? (
        <Container maxWidth='md'>
          <Box my={3} className='mainBox'>
            <Box mb={3}>
              <Typography variant='h5'> KYC Details</Typography>
            </Box>
            <Container maxWidth='md'>
              <Grid container spacing={1}>
                {/* <Grid item xs={4} sm={4}>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <Typography variant="h5">KYC Status :</Typography>{" "}
                      </td>
                      {"  "}
                      <td class="has-text-right">
                        {data.kycStatus === "PENDING" ? (
                          <Typography variant="h5">
                            <span style={{ color: "red" }}>
                              {data.kycStatus}
                            </span>
                          </Typography>
                        ) : (
                          <Typography variant="h5">
                            <span style={{ color: "green" }}>
                              {data.kycStatus}
                            </span>
                          </Typography>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Grid> */}
                <Grid item xs={12} sm={10}>
                  <Box>
                    <Typography variant='h2'></Typography>
                  </Box>
                </Grid>
              </Grid>
            </Container>
            <table>
              <tbody>
                <tr>
                  <td>KYC Status : </td>
                  {"  "}
                  <td class='has-text-right'>
                    {data.kycStatus === "PENDING" ? (
                      <span style={{ color: "red" }}>{data.kycStatus}</span>
                    ) : (
                      <span style={{ color: "green" }}>{data.kycStatus}</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td> Name</td>
                  <td class='has-text-right'>{`${data.firstName} ${data.lastName}`}</td>
                </tr>
                <tr>
                  <td>Email Address</td>
                  <td class='has-text-right'>{data.emailAddress}</td>
                </tr>
                <tr>
                  <td>Wallet Address</td>
                  <td class='has-text-right'>{data.walletAddress}</td>
                </tr>
                <tr>
                  <td>Fraud Check Id</td>
                  <td class='has-text-right'>{data.fraudCheckId}</td>
                </tr>

                <tr>
                  <td>Address</td>
                  <td class='has-text-right'>{`${data.streetAddress}, ${data.city}, ${data.state}, ${data.country}, ${data.zip}`}</td>
                </tr>
                <tr>
                  <td>Nationality</td>
                  <td class='has-text-right'>{data.nationality}</td>
                </tr>
                <tr>
                  <td>Address Attachment Type</td>
                  <td class='has-text-right'>{data.addressAttachmentType}</td>
                </tr>
                <tr>
                  <td>Address Attachment</td>
                  <td class='has-text-right'>
                    <img
                      src={data.addressAttachment}
                      style={{ width: "300px", height: "300px" }}
                      alt={data.addressAttachmentType}
                    />
                  </td>
                </tr>

                <tr>
                  <td>Identity Attachment Type</td>
                  <td class='has-text-right'>
                    {" "}
                    {data.identityAttachmentType}{" "}
                  </td>
                </tr>
                <tr>
                  <td>Identity Document Issue Date</td>
                  <td class='has-text-right'>
                    {moment(data.identityDocumentIssueDate).format("ll")}
                    {/* {Number(tokenForLiquidity).toFixed(2)} */}
                  </td>
                </tr>
                <tr>
                  <td>Identity Document Expiry Date</td>
                  <td class='has-text-right'>
                    {moment(data.identityDocumentExpiryDate).format("ll")}
                    {/* 1 {formData.investmentToken} = {formData.salePrice} &nbsp; ($
                  {Number(user.usdPrice * formData.listingPrice).toFixed(2)}) */}
                  </td>
                </tr>
                <tr>
                  <td>Identity Document Number</td>
                  <td class='has-text-right'>
                    {data.identityDocumentNumber}
                    {/* 1 {formData.investmentToken} = {formData.salePrice} &nbsp; ($
                  {Number(user.usdPrice * formData.listingPrice).toFixed(2)}) */}
                  </td>
                </tr>

                <tr>
                  <td>Identity Attachment</td>
                  <td class='has-text-right'>
                    <img
                      src={data.identityAttachment}
                      style={{ width: "300px", height: "300px" }}
                      alt={data.identityAttachmentType}
                    />
                  </td>
                </tr>
                {/* <tr>
                <td>Identity Attachment</td>
                <td class="has-text-right">
                  <img
                    src={data.identityAttachment}
                    style={{ width: "300px", height: "300px" }}
                    alt="identityAttachment"
                  />
                </td>
              </tr> */}
                <tr>
                  <td>Face Attachment</td>
                  <td class='has-text-right'>
                    <img
                      src={data.faceAttachment}
                      style={{ width: "300px", height: "300px" }}
                      alt='faceAttachment'
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </Box>
          {user?.userData?.userType == "Admin" && (
            <Box>
              {data.kycStatus === "PENDING" && (
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={AcceptKyc}
                      fullWidth
                      disabled={isUpdating}
                    >
                      Accept{isUpdating && <ButtonCircularProgress />}
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={RejectKyc}
                      fullWidth
                      disabled={isUpdating1}
                    >
                      {" "}
                      Reject{isUpdating1 && <ButtonCircularProgress />}
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Box>
          )}
        </Container>
      ) : (
        <DataLoading style={{ color: "#f4e388" }} />
      )}
    </Box>
  );
};

export default ViewKyc;
