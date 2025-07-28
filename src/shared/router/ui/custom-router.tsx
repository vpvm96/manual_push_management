import { Box, CircularProgress } from "@mui/material";
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";

interface CustomRouterProps {
  routes: RouteObject[];
}

export const CustomRouter = ({ routes }: CustomRouterProps) => {
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

CustomRouter.Loader = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};
