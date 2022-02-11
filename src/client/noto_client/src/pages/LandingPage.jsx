import Stack from "@mui/material/Stack";
import NavButton from "../components/NavButton";
import Typography from "@mui/material/Typography";
import "../styles/landing.css";

const LandingPage = () => {
  return (
    <>
      <div id="landingBackground"></div>
      <Stack direction="column" alignItems="center" spacing={4} sx={{ mt: 30 }}>
        <img src="../docs/img/logo_t.png" width="350" />
        <Typography sx={{ color: "#858585", fontSize: 28 }}>
          Create, Collaborate, Share
        </Typography>
        <Stack direction="row">
          <NavButton
            path="/login"
            text="Login"
            variant="outlined"
            size="large"
          />
          <NavButton
            path="/register"
            text="Register"
            variant="contained"
            size="large"
          />
        </Stack>
      </Stack>
    </>
  );
};

export default LandingPage;
