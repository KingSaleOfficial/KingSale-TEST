import React from "react";
import { Typography, Box, makeStyles,  } from "@material-ui/core";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  NftImg: {
    borderRadius: 5,
    boxShadow: "0 11px 24px rgb(0, 0, 0, 0.12)",
    display: "block",
  },
  mianBox: {
    position: "relative",
    border: "1px solid #FFB72C",
    cursor: "pointer",
  },
  nftName: {
    position: "absolute",
    bottom: 10,
    left: 15,
  },
}));

export default function NFTCard({ data, index, setOpen, isChange }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box
      className={classes.mianBox}
      onClick={() => {
        history.push({
          pathname: "/app/NFT-details",
          search: data.id,
        });
      }}
    >
      <img
        className={classes.NftImg}
        src={data.nfdData.image ? data.nfdData.image : "images/no_image.png"}
        width='100%'
        height='300'
        alt=''
      />
      <Box
        className={classes.nftName}
        display='flex'
        justifyContent='space-between'
        mt={2}
      >
        <Typography
          variant='h4'
          title={data.name}
          style={{ marginBottom: "5px" }}
        >
          {data.nfdData.name !== "" && data.nfdData.name !== undefined
            ? data.nfdData.name
            : "Unknown Yet"}
        </Typography>
      </Box>
    </Box>
  );
}
