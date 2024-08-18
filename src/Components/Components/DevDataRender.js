import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  IconButton,
  InputBase,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import { UserAuth } from "../../app/Auth";
import { useDispatch } from "react-redux";
import { uploadData } from "../../app/Slices/createData";
import { Masonry } from "@mui/lab";
import { deleteData } from "../../app/Slices/recievedData";
import { useNavigate, useParams } from "react-router-dom";
import { setUploaded } from "../../app/Slices/globalStates";

const Item = styled(Paper)(({ theme }) => ({
  background: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body3,
  padding: theme.spacing(0.5),
  textAlign: "start",
  color: theme.palette.text.secondary,
  boxShadow: "0 15px 30px 0 rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
  transition: "150ms",
  paddingBottom: "8px",
  "&&:hover": {
    background: "#EEEEEE",
  },
  position: "relative",
}));

const DevDataRender = ({ dataToRender1 }) => {
  const { id, category, subId, titleId } = useParams();
  const navigate = useNavigate();
  const { user } = UserAuth();
  const dispatch = useDispatch();
  const [datasetName, setDatasetName] = useState("");
  const [dataToRender, setDataToRender] = useState();

  useEffect(() => {
    setDataToRender(dataToRender1);
  }, [dataToRender1]);

  const [hoveredItem, setHoveredItem] = useState(null);
  const handleChangeDataset = (event) => {
    setDatasetName(event.target.value);
  };
  const handleUpload = () => {
    console.log("handle Upload");
    dispatch(
      uploadData({
        docName: datasetName,
        data: dataToRender,
        user: user,
      })
    );
    dispatch(setUploaded(true));
    setDataToRender();
    navigate(`/dashboard/dataset`);
  };
  const handleDelete = (index) => {
    dispatch(deleteData(index));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: "1",
        mt: "16px",
        px: "80px",
        flexDirection: "column",
      }}
    >
      {dataToRender?.length > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            color: "#000",
            // border: "1px solid red",
            mt: "8px",
            alignItems: "center",
            position: "fixed",
            top: "130px",
            zIndex: "2300",
            px: "8px",
            right: "50%",
            transform: "translate(50%)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              //   border: "1px solid red",
              py: "4px",
              px: "16px",
              gap: "8px",
              borderRadius: "32px",
              backgroundColor: "#fff",
              alignItems: "center",
              background: "#F8FAFF",
              backdropFilter: "blur(15px)",
            }}
          >
            <InputBase
              placeholder="Name of Dataset"
              onChange={handleChangeDataset}
            />
            <Box onClick={handleUpload} sx={{ cursor: "pointer" }}>
              <Typography>Create</Typography>
            </Box>
          </Box>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexGrow: "1",
        }}
      >
        <Masonry
          columns={{ xs: 1, sm: 2, md: 4 }}
          spacing={2}
          sx={{ m: "0 auto" }}
        >
          {dataToRender?.map((item, index) => (
            <Item
              key={index}
              // onClick={() => handleClickItem(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {item.imageUrl && (
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    maxHeight: "200px",
                    objectFit: "cover",
                  }}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.model || "Image"}
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              )}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  px: "8px",
                }}
              >
                {Object.keys(item).map(
                  (key) =>
                    key !== "imageUrl" &&
                    key !== "id" &&
                    key !== "promt" && (
                      <Typography
                        sx={{
                          fontSize: "14px",
                        }}
                        key={key}
                      >
                        <strong>{key}:</strong> {item[key]}
                      </Typography>
                    )
                )}
              </Box>
              {hoveredItem === item.id && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    transform: "translateX(-50%, -50%)",
                  }}
                >
                  <IconButton
                    onClick={() => handleDelete(index)}
                    className="delete"
                    sx={{
                      background: "#fff",
                      "&&:hover": {
                        background: "rgba(225,225,225,0.9)",
                      },
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998"
                        stroke="#292D32"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
                        stroke="#292D32"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18.8499 9.13989L18.1999 19.2099C18.0899 20.7799 17.9999 21.9999 15.2099 21.9999H8.7899C5.9999 21.9999 5.9099 20.7799 5.7999 19.2099L5.1499 9.13989"
                        stroke="#292D32"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.3301 16.5H13.6601"
                        stroke="#292D32"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9.5 12.5H14.5"
                        stroke="#292D32"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </IconButton>
                </Box>
              )}
            </Item>
          ))}
        </Masonry>
      </Box>
    </Box>
  );
};

DevDataRender.propTypes = {};

export default DevDataRender;
