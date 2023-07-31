"use client";

import {
  Box,
  FormGroup,
  Typography,
  Switch,
  FormControlLabel,
  Card,
  CardContent,
  TextField,
  Button,
  Divider,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext } from "@/app/theme";
import { useTheme } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSession, signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
});

export default function SignInPage() {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const searchParams = useSearchParams();
  const error = searchParams.get("error"); // 'error' parametresini yakalıyoruz

  function errorCode(error) {
    // Error kodlarının açıklamasını düzenleme fonksiyonu
    let errorExplain = "";

    if (error === "CredentialsSignin")
      return (errorExplain = "Kullanıcı Girişi Hatası");
  }

  const data = useSession();
  const status = data.status;
  const { data: session } = useSession();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl: "/"
      });
    },
  });

  return (
    <>
      {status === "loading" ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alingItems: "center",
            height: "100vh",
            marginTop: "50px",
          }}
        >
          <h1>Yükleniyor</h1>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alingItems: "center",
              padding: "10px",
            }}
          >
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch defaultChecked onClick={colorMode.toggleColorMode} />
                }
                label={theme.palette.mode === "dark" ? "dark" : "light"}
              />
            </FormGroup>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alingItems: "center",
              height: "90vh",
            }}
          >
            {status === "unauthenticated" && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Box sx={{ m: 1 }}>
                  <Alert severity="info" color="info">
                    Email: <strong>mhmmt_clk@live.com</strong>
                    <br />
                    Password: <strong>123456</strong>
                  </Alert>
                </Box>
                {error && (
                  <Box sx={{ m: 1 }}>
                    <Alert severity="error">{errorCode(error)}</Alert>
                  </Box>
                )}
                <Card sx={{ borderRadius: "15px", width: "25rem" }}>
                  <form onSubmit={formik.handleSubmit}>
                    <CardContent>
                      <Box
                        sx={{
                          marginBottom: 3,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Typography variant="h4">Sign In</Typography>
                      </Box>
                      <TextField
                        label="Email"
                        type="email"
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        error={formik.touched.email && formik.errors.email}
                        helperText={formik.touched.email && formik.errors.email}
                        InputLabelProps={{ shrink: true }}
                        sx={{ marginBottom: 1.5 }}
                        fullWidth
                      />
                      <TextField
                        label="Password"
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        sx={{ marginBottom: 1.5 }}
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <VisibilityOffIcon />
                                ) : (
                                  <VisibilityIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Button
                        variant="contained"
                        sx={{ width: "100%" }}
                        type="submit"
                      >
                        Sign In
                      </Button>
                      <Divider sx={{ margin: "1rem" }}>or</Divider>
                      <Box
                        sx={{
                          display: "flex",
                          rowGap: "0.5rem",
                          flexDirection: "column",
                        }}
                      >
                        <Button
                          variant="contained"
                          sx={{
                            width: "100%",
                            backgroundColor: `${
                              theme.palette.mode === "dark" ? "white" : "black"
                            }`,
                          }}
                          startIcon={<GitHubIcon />}
                          onClick={() => signIn("github")}
                        >
                          GitHub
                        </Button>
                      </Box>
                    </CardContent>
                  </form>
                </Card>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </>
  );
}
