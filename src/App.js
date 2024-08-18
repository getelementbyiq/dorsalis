import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import Mainlayout from "./Components/Pages/Mainlayout/Mainlayout";
import MainPage from "./Components/Pages/MainPage/MainPage";
import Dashboard from "./Components/Pages/Dashboard/DashBoard";
import store from "./app/store";
import SignUp from "./app/Auth/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import SignIn from "./app/Auth/SignIn";
import ImageSearch from "./Components/Functions/Pixels";
import MainDirection from "./Components/Pages/MainDirection/MainDirection";
import ResearchComponent from "./Components/Components/ResearchComponent";
import DatasetComponent from "./Components/Components/Functions/Dataset";
import ELearningComponent from "./Components/Components/Functions/Words";
import Research from "./Components/Pages/Research/Research";

const Root = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Mainlayout />}>
      <Route index element={<MainPage />} />

      <Route path="/:locals" element={<Dashboard />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/search" element={<ImageSearch />} />
      <Route path="/research" element={<Research />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainDirection />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/dataset"
        element={
          <ProtectedRoute>
            <DatasetComponent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/api"
        element={
          <ProtectedRoute>
            <DatasetComponent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/e-learning"
        element={
          <ProtectedRoute>
            <ELearningComponent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doc/:category/:id"
        element={
          <ProtectedRoute>
            <ResearchComponent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mainComp/:category/:id/:titleId"
        element={
          <ProtectedRoute>
            <ResearchComponent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/subComp/:category/:id/:titleId/:subId"
        element={
          <ProtectedRoute>
            <ResearchComponent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/:category"
        element={
          <ProtectedRoute>
            <MainDirection />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={Root} />
    </Provider>
  );
}

export default App;
