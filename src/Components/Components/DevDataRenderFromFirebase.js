import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  IconButton,
  InputBase,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import { UserAuth } from "../../app/Auth";
import { useDispatch, useSelector } from "react-redux";
import { uploadData } from "../../app/Slices/createData";
import { Masonry } from "@mui/lab";
import { deleteData } from "../../app/Slices/recievedData";
import { useLocation, useParams } from "react-router-dom";
import { setUploaded } from "../../app/Slices/globalStates";

const Item = styled(Paper)(({ theme }) => ({
  background: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body3,
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

const DevDataRenderFromFirebase = ({ dataToRender }) => {
  const { id, category, subId, titleId } = useParams();
  const location = useLocation();
  const { user } = UserAuth();
  const dispatch = useDispatch();
  const { dataset, uploaded } = useSelector((state) => state.globalStates);
  const [datasetName, setDatasetName] = useState("");
  const [jSon, setJson] = useState(false);
  console.log("dataToRender", dataToRender);

  useEffect(() => {
    if (uploaded) {
      dispatch(setUploaded(false));
    }
  }, [uploaded, dispatch]);

  const [hoveredItem, setHoveredItem] = useState(null);
  const handleChangeDataset = (event) => {
    setDatasetName(event.target.value);
  };
  const handleShowJson = () => {
    setJson((open) => !open);
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
  };
  const handleDelete = (index) => {
    dispatch(deleteData(index));
  };

  return (
    <Box
      sx={{
        mt: "16px",
        px: "80px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexGrow: "1",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexGrow: "1",
            height: "200px",
          }}
        >
          {location.pathname.includes("mainComp") &&
            dataToRender?.map(
              (item) =>
                item.docName === subId && (
                  <Box>
                    <Typography>{item.name}</Typography>
                  </Box>
                )
            )}
        </Box>
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
              {jSon && (
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "white",
                    position: "absolute",
                    zIdndex: "1500",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <Box>
                    {`JSON:{
                    imageUrl: ${item.imageUrl},
                    collection: ${item.collection},
                    createdAt: ${item.createdAt},
                    prompt: ${item.prompt},
                  }`}
                  </Box>
                </Box>
              )}

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
                {Object.keys(item, index).map(
                  (key) =>
                    key !== "imageUrl" &&
                    key !== "id" &&
                    key !== "promt" &&
                    key !== "createdAt" &&
                    key !== "collection" && (
                      <Typography
                        key={key}
                        sx={{
                          fontSize: "14px",
                        }}
                      >
                        <strong>{key}:</strong> {item[key]}
                      </Typography>
                    )
                )}
              </Box>
              {hoveredItem === item.id && (
                <Box>
                  {/* <Box
                    sx={{
                      position: "absolute",
                      top: "16px",
                      left: "16px",
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
                  </Box> */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      transform: "translateX(-50%, -50%)",
                    }}
                  >
                    <Button
                      onClick={() => handleShowJson(index)}
                      className="delete"
                      sx={{
                        background: "#fff",
                        borderRadius: "8px",
                        "&&:hover": {
                          background: "rgba(225,225,225,0.9)",
                        },
                      }}
                    >
                      <svg
                        width="25"
                        height="8"
                        viewBox="0 0 25 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M24.1365 0.09375V6.93466H23.3349L19.6071 1.56348H19.5403V6.93466H18.7119V0.09375H19.5136L23.2547 5.47829H23.3215V0.09375H24.1365Z"
                          fill="#282828"
                        />
                        <path
                          d="M17.3185 3.51398C17.3185 4.23549 17.1883 4.85901 16.9277 5.38454C16.6672 5.91008 16.3098 6.31537 15.8555 6.60041C15.4012 6.88545 14.8824 7.02797 14.2989 7.02797C13.7155 7.02797 13.1966 6.88545 12.7423 6.60041C12.2881 6.31537 11.9307 5.91008 11.6701 5.38454C11.4096 4.85901 11.2793 4.23549 11.2793 3.51398C11.2793 2.79248 11.4096 2.16896 11.6701 1.64342C11.9307 1.11788 12.2881 0.712595 12.7423 0.427557C13.1966 0.142519 13.7155 0 14.2989 0C14.8824 0 15.4012 0.142519 15.8555 0.427557C16.3098 0.712595 16.6672 1.11788 16.9277 1.64342C17.1883 2.16896 17.3185 2.79248 17.3185 3.51398ZM16.5169 3.51398C16.5169 2.92164 16.4178 2.42171 16.2196 2.01419C16.0236 1.60668 15.7575 1.29826 15.4213 1.08893C15.0872 0.879609 14.7131 0.774947 14.2989 0.774947C13.8847 0.774947 13.5095 0.879609 13.1732 1.08893C12.8392 1.29826 12.5731 1.60668 12.3749 2.01419C12.1789 2.42171 12.081 2.92164 12.081 3.51398C12.081 4.10633 12.1789 4.60626 12.3749 5.01377C12.5731 5.42129 12.8392 5.72971 13.1732 5.93903C13.5095 6.14836 13.8847 6.25302 14.2989 6.25302C14.7131 6.25302 15.0872 6.14836 15.4213 5.93903C15.7575 5.72971 16.0236 5.42129 16.2196 5.01377C16.4178 4.60626 16.5169 4.10633 16.5169 3.51398Z"
                          fill="#282828"
                        />
                        <path
                          d="M9.28897 1.80376C9.24889 1.46527 9.08633 1.2025 8.80129 1.01545C8.51625 0.828391 8.16664 0.734863 7.75244 0.734863C7.44959 0.734863 7.18459 0.783854 6.95745 0.881836C6.73254 0.979818 6.55662 1.11454 6.42969 1.28601C6.30498 1.45748 6.24263 1.65233 6.24263 1.87056C6.24263 2.05316 6.28606 2.21016 6.3729 2.34154C6.46198 2.4707 6.57555 2.5787 6.71361 2.66555C6.85168 2.75017 6.99642 2.82032 7.14785 2.87599C7.29928 2.92943 7.43845 2.97286 7.56539 3.00626L8.26017 3.19332C8.43831 3.24008 8.6365 3.30466 8.85474 3.38705C9.0752 3.46945 9.28563 3.5819 9.48605 3.72442C9.68869 3.86471 9.85571 4.04509 9.98709 4.26555C10.1185 4.48601 10.1842 4.75657 10.1842 5.07724C10.1842 5.4469 10.0873 5.78092 9.89357 6.07932C9.70206 6.37772 9.42147 6.61488 9.05181 6.7908C8.68438 6.96673 8.2379 7.05469 7.71236 7.05469C7.22245 7.05469 6.79823 6.97563 6.43971 6.81753C6.08341 6.65942 5.80283 6.43896 5.59796 6.15615C5.39531 5.87334 5.28063 5.54488 5.25391 5.17077H6.10902C6.13129 5.42908 6.21814 5.64286 6.36956 5.8121C6.52322 5.97912 6.71695 6.10382 6.95077 6.18621C7.18682 6.26638 7.44068 6.30646 7.71236 6.30646C8.02857 6.30646 8.3125 6.25525 8.56413 6.15281C8.81577 6.04815 9.01507 5.9034 9.16204 5.71857C9.30902 5.53152 9.3825 5.31328 9.3825 5.06388C9.3825 4.83674 9.31904 4.65191 9.19211 4.50939C9.06517 4.36687 8.89816 4.25107 8.69106 4.162C8.48396 4.07292 8.26017 3.99498 8.01966 3.92818L7.17791 3.68768C6.64347 3.53402 6.22036 3.31468 5.9086 3.02964C5.59684 2.7446 5.44096 2.3716 5.44096 1.91064C5.44096 1.52763 5.54451 1.1936 5.75161 0.908559C5.96093 0.621294 6.24152 0.398608 6.59336 0.240501C6.94743 0.0801669 7.3427 0 7.77916 0C8.22008 0 8.61201 0.0790535 8.95495 0.23716C9.29788 0.39304 9.56956 0.606819 9.76998 0.878496C9.97262 1.15017 10.0795 1.45859 10.0906 1.80376H9.28897Z"
                          fill="#282828"
                        />
                        <path
                          d="M3.0597 0.09375H3.88809V4.98393C3.88809 5.4204 3.80793 5.79117 3.64759 6.09625C3.48726 6.40133 3.26123 6.63292 2.96952 6.79103C2.6778 6.94913 2.33375 7.02819 1.93737 7.02819C1.56325 7.02819 1.23034 6.96027 0.938621 6.82443C0.646902 6.68636 0.417536 6.4904 0.250522 6.23654C0.0835072 5.98268 0 5.68094 0 5.33132H0.81503C0.81503 5.52506 0.862907 5.6943 0.958662 5.83905C1.05664 5.98156 1.19026 6.09291 1.3595 6.17307C1.52874 6.25324 1.72136 6.29332 1.93737 6.29332C2.17564 6.29332 2.37828 6.24322 2.5453 6.14301C2.71231 6.0428 2.83924 5.89583 2.92609 5.70209C3.01517 5.50613 3.0597 5.26674 3.0597 4.98393V0.09375Z"
                          fill="#282828"
                        />
                      </svg>
                    </Button>
                  </Box>
                </Box>
              )}
            </Item>
          ))}
        </Masonry>
      </Box>
    </Box>
  );
};

DevDataRenderFromFirebase.propTypes = {};

export default DevDataRenderFromFirebase;
