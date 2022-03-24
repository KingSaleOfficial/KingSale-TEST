import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    "&:hover, &:focus": {
      // backgroundColor: "#f8b900",
      background: " linear-gradient( 180deg, #222222 0%, #222222 100%)",
    },
  },
  externalLink: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
  },
  // linkActive: {
  //   background:" linear-gradient( 180deg, #F8B900 0%, #8F5409 100%)",
  // },
  linkNested: {
    paddingLeft: 0,
    "&:hover, &:focus": {
      backgroundColor: "#f8b900",
    },
  },
  linkIcon: {
    marginRight: "25px",
    color: "#F6A52D",
    transition: theme.transitions.create("color"),
    width: 24,
    display: "flex",
    fontSize: "20px",
    justifyContent: "center",
    background: "#23252E",
    borderRadius: "5px",
    padding: "7px",
    minWidth: "35px",
  },
  linkIconActive: {
    color: "#F6A52D",
    background: "#000",
  },
  linkText: {
    padding: 0,
    color: "#9F9F9F",
    transition: theme.transitions.create(["opacity", "color"]),
    fontSize: 14,
  },
  linkTextActive: {
    color: "#F6A52D",
  },
  linkTextHidden: {
    opacity: 0,
  },
  nestedList: {
    paddingLeft: theme.spacing(2) + 30,
  },
  sectionTitle: {
    marginLeft: theme.spacing(4.5),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    height: 1,
    backgroundColor: "#D8D8D880",
  },
}));
