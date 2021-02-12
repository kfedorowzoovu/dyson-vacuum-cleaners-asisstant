import globals from "../partials/global-variables";

export default {
  container: {
    marginBottom: "30px",
    "& p": {
      textAlign: "center",
      width: "100%",
      fontSize: "32px",
      margin: [0, 0, "10px", 0],
      [`@media (${globals.breakpoints.$xs})`]: {
        margin: ["15px", 0],
        fontSize: "26px",
      },
    },
    "& .input-wrapper": {
      margin: ["5px", "auto", "0"],
      border: `1px solid ${globals.colors.lightGray}`,
      width: "100%",
      padding: ["5px", "10px", "5px", 0],
      backgroundColor: globals.colors.white,
    },
    "& input": {
      width: "100%",
      background: "transparent",
      border: 0,
      fontSize: "14px",
      height: "29px",
      padding: "5px",
      outline: 0,
    },
  },
};
