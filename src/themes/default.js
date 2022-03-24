import tinycolor from "tinycolor2";
const primary = "#4A4A4A";
const secondary = "#FF5C93";
const warning = "#FFC260";
const success = "#3CD4A0";
const info = "#9013FE";
const lightenRate = 7.5;
const darkenRate = 15;
const defaultTheme = {
  palette: {
    primary: {
      main: primary,
      light: tinycolor(primary).lighten(lightenRate).toHexString(),
      dark: tinycolor(primary).darken(darkenRate).toHexString(),
    },
    secondary: {
      main: secondary,
      light: tinycolor(secondary).lighten(lightenRate).toHexString(),
      dark: tinycolor(secondary).darken(darkenRate).toHexString(),
      contrastText: "#FFFFFF",
    },
    warning: {
      main: warning,
      light: tinycolor(warning).lighten(lightenRate).toHexString(),
      dark: tinycolor(warning).darken(darkenRate).toHexString(),
    },
    success: {
      main: success,
      light: tinycolor(success).lighten(lightenRate).toHexString(),
      dark: tinycolor(success).darken(darkenRate).toHexString(),
    },
    info: {
      main: info,
      light: tinycolor(info).lighten(lightenRate).toHexString(),
      dark: tinycolor(info).darken(darkenRate).toHexString(),
    },
    text: {
      primary: "#4A4A4A",
      secondary: "#6E6E6E",
      hint: "#B9B9B9",
    },
    background: {
      default: "#F6F7FF",
      light: "#F3F5FF",
    },
  },
  overrides: {
    MuiStepIcon: {
      text: {
        fill: "#090b16",
      },
      root: {
        color: "rgb(255 255 255 / 38%)",
        MuiStepIconActive: {
          color: "#fff",
        },
        "&.MuiStepIcon-completed": {
          color: "#fabe25",
        },
        "&.MuiStepIcon-active": {
          color: "#fabe25",
        },
      },
    },
    MuiTableRow: {
      root: {
        color: "inherit",
        display: "table-row",
        outline: "0",
        verticalAlign: "middle",
        background: "#23252e",
      },
    },

    MuiTableCell: {
      body: {
        color: "#fff",
      },
      root: {
        display: "table-cell",
        padding: "13px",
        fontSize: "0.875rem",
        textAlign: "left",
        fontWeight: "400",
        lineHeight: "1.43",
        borderBottom: "1px solid #191822",
        letterSpacing: "0.01071em",
        verticalAlign: "inherit",
      },
    },

    MuiDialog: {
      paperWidthSm: {
        maxWidth: "450px",
      },
    },

    MuiTab: {
      root: {
        padding: "6px 12px",
        overflow: "hidden",
        position: "relative",
        fontSize: "16px",
        fontWeight: "bold",
        maxWidth: "264px",
        minWidth: "72px",
        boxSizing: "border-box",
        minHeight: "48px",
        textAlign: "center",
        lineHeight: "1.75",
        whiteSpace: "normal",
        letterSpacing: "0.02857em",
        textTransform: "uppercase",
        "@media (max-width: 767px)": {
          fontSize: "13px",
        },
      },
    },

    MuiSlider: {
      root: {
        color: "#f6a52d",
        width: "100%",
        cursor: "pointer",
        height: "8px",
        display: "inline-block",
        padding: "13px 0",
        position: "relative",
        boxSizing: "content-box",
        touchAction: "none",
      },
    },
    MuiInputBase: {
      input: {
        font: "inherit",
        color: "#fff",
        border: "1px solid #8a8b8b",
        width: "100%",
        borderRadius: "5px",
        fontSize: "13px",
        height: "0.1876em",
        margin: "0",
        display: "block",
        padding: "6px 0 7px",
        minWidth: "0",
        background: "none",
        boxSizing: "content-box",
        letterSpacing: "inherit",
        "&:focus-visible": {
          outline: "none",
        },
      },
    },

    MuiSvgIcon: {
      root: {
        color: "#F6A52D",
        height: "1em",
        display: "inline-block",
        transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        flexShrink: "0",
        userSelect: "none",
        marginRight: "3px",
      },
    },
    MuiAppBar: {
      root: {
        width: "100%",
        display: "flex",
        boxSizing: "border-box",
        flexShrink: "0",
      },
      colorPrimary: {
        color: "#fff",
        backgroundColor: "#15161C",
      },
    },
    MuiMenuItem: {
      root: { color: "#fff", padding: "6px" },
    },
    MuiPaper: {
      root: { boxShadow: "none !important" },
      rounded: {
        backgroundColor: " #090c16",
        // width: "100%",
        border: "1px solid #f6a52d8f",
        borderRadius: "14px",
      },
    },
    MuiStepper: {
      root: {
        backgroundColor: " #090b16",
        border: "1px solid #443309",
        "@media (max-width: 767px)": {
          display: "block",
        },
      },
    },
    MuiStep: {
      horizontal: {
        width: "25%",
        "@media (max-width: 767px)": {
          width: "100%",
        },
      },
    },
    MuiButton: {
      outlinedSizeLarge: {
        padding: "7px 21px",
        width: "100%",
        maxWidth: "140px",
        height: "45px",
      },
      containedSizeLarge: {
        padding: "8px 22px",
        fontSize: "-4.0625rem",
        "@media (max-width: 767px)": {
          fontSize: "10px",
        },
      },
      containedSecondary: {
        color: "#FFFFFF",
        border: "1px solid #E8424C",
        cursor: "pointer",
        height: "50px",
        fontSize: "14px",
        minWidth: "143px",
        backgroundColor: "#E8424C",
        boxShadow: "none",
        fontWeight: "600",
        borderRadius: "50px",
        "&:hover": {
          borderColor: "#E8424C",
          backgroundColor: "#E8424C",
        },
      },
      outlinedPrimary: {
        color: " #ffffff",
        border: "1px solid rgb(255 255 255)",
        borderRadius: "50px",
        fontSize: "14px !important",
        lineHeight: "16px",
        height: " 50px",
        fontWeight: "600",
        maxWidth: "153px",
        "@media (max-width:767px)": {},
        "&:hover": {
          backgroundColor: " rgb(232 66 76)",
          border: "1px solid #E8424C",
        },
      },
      root: {
        "&:hover": {
          backgroundColor:
            "linear-gradient(180deg, rgba(248,185,0,1) 16%, rgba(143,84,9,1) 79%)",
        },
        "&.Mui-disabled": {
          color: "rgba(255, 255, 255, 0.7) !important",
        },
      },
      contained: {
        "&:hover": {
          backgroundColor: "linear-gradient(180deg, #F8B900 0%, #8F5409 100%)",
        },
        "&.Mui-disabled": {
          color: "rgb(219 219 219 / 48%)",
        },
      },
      containedPrimary: {
        borderRadius: "50px",
        fontSize: "14px",
        fontWeight: 600,
        minWidth: "150px",
        height: "45px",
        color: "#fff",
        transition: "0.5s",
        backgroundImage: "linear-gradient(0deg, #E8424C, #E8424C)",
        "&:hover": {
          backgroundImage: "linear-gradient(0deg, #E8424C, #E8424C)",
        },
        "&.active": {
          background: "linear-gradient( 180deg, #8F5409 0%, #F8B900 100%)",
        },
        "@media (max-width: 1024px)": {
          fontSize: "13px",
        },
        "@media (max-width: 767px)": {
          fontSize: "13px",
          // width: "100%",
          // marginTop:"10px",
        },
      },
    },
    MuiBackdrop: {
      root: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      },
    },
    MuiMenu: {
      paper: {
        boxShadow:
          "0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
      },
    },
    MuiSelect: {
      selectMenu: {
        border: "1px solid #8a8b8b",
        width: "100%",
        borderRadius: "5px",
        fontSize: "13px",
        height: "0.1876em",
        margin: "0",
        display: "block",
        padding: "10px 12px 7px",
        height: "23px",
      },
      select: {
        "&:focus": {
          borderRadius: "5px",
        },
      },
      icon: {
        color: "#B9B9B9",
      },
    },
    PrivateSwitchBase: {
      root: {
        marginLeft: 0,
      },
    },
  },
};

export default defaultTheme;
