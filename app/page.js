"use client";

import Link from "next/link";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const data = useSession();
  const status = data.status;
  const { data: session } = useSession();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      {status === "unauthenticated" && (
        <Box>
          <h1>Next Auth Example Home Page</h1>
          <Box m={3}>
            <Link href="/api/auth/signin" style={{color:"white"}}>
              Got to <strong>Sign In</strong> Page
            </Link>
          </Box>
        </Box>
      )}
      {status === "authenticated" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alingItems: "center",
            padding: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alingItems: "center",
              flexDirection: "column",
            }}
          >
            <Card>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: 5,
                }}
              >
                <Typography
                  variant="h4"
                  textAlign="center"
                  mt={1}
                  mb={2}
                  color="primary"
                >
                  Welcome
                </Typography>
                <Typography variant="h5" textAlign="center">
                  {session.user.name}
                </Typography>
                <Typography variant="p" color="grey" textAlign="center">
                  {session.user.email}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => signOut()}
                  sx={{ marginTop: 2 }}
                  color="error"
                >
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
      )}
    </Box>
  );
}
