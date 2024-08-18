import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import CBG from "../../assets/images/Firefly generate colorfull Crossword puzzle 9985.jpg";
import MBG from "../../assets/images/Firefly generate colorfull memo card game, on two of them images of animals 9985.jpg";
import { rightNav } from "./NavDB";
import { BootstrapTooltip } from "./Tooltip";
import Rightbar from "./Rightbar";
import { UserAuth } from "../../app/Auth";
import TextEditor from "./TextEditor";
import TextEditorDraft from "./DraftJsEditor";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";
import { fetchNotes, uploadNote } from "../../app/Slices/createData";
import { useDispatch, useSelector } from "react-redux";
import NoteRenderer from "./NoteRender";
import CustomTextEditor from "./CustomTextEditor";

const NotesNew = ({ state }) => {
  const { user } = UserAuth();
  const dispatch = useDispatch();
  const [newNoteState, setNewNoteState] = useState(false);
  const [rightNavState, setRightNavState] = useState("Crosswords");
  const [notes, setNotes] = useState([]);
  const [userDocId, setUserDocId] = useState(null);
  const notesFetched = useSelector((state) => state.data.notes);
  const globalStates = useSelector((state) => state.globalStates);
  const [hoverId, setHoverId] = useState(null);

  console.log("hoverId", hoverId);

  const handleSetId = (id) => {
    if (hoverId === id) {
      setHoverId(null);
    } else {
      setHoverId(id);
    }
  };

  console.log("notes", notes);

  const { mainNav, subNav } = globalStates;
  const [inputValue, setInputValue] = useState("");
  const [noteName, setNoteName] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleInputChangeName = (event) => {
    setNoteName(event.target.value);
  };

  const newNote = () => {
    setNewNoteState((open) => !open);
  };

  useEffect(() => {
    if (!user) return;

    const userDocRef = doc(db, "notes", user.uid);
    const subCollectionRef = collection(userDocRef, "notes");

    const unsubscribe = onSnapshot(
      subCollectionRef,
      (querySnapshot) => {
        const notes = [];
        querySnapshot.forEach((doc) => {
          notes.push({ id: doc.id, ...doc.data() });
        });
        setNotes(notes);
      },
      (error) => {
        console.error("Error fetching notes: ", error);
      }
    );

    // Cleanup function to unsubscribe from the snapshot listener when the component unmounts
    return () => unsubscribe();
  }, [dispatch, user]);

  const handleUpload = () => {
    dispatch(
      uploadNote({
        docName: "notes",
        user: user,
        data: {
          name: noteName,
          value: inputValue,
          mainNav: mainNav,
          subNav: subNav,
        },
      })
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        // border: "1px solid red",
        // position: "fixed",
        right: "4px",
        // flexDirection: "column",
        // alignItems: "flex-end",
        py: "4px",
        // top: "64px",
        gap: "4px",
        background: "rgba(0,0,0,0.08)",
        // height: "85vh",
        // width: "15%",
        borderRadius: "16px",
        flexDirection: "column",
        color: "#000",
        px: "4px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: "8px",
        }}
      >
        <Typography>Notes</Typography>
        <BootstrapTooltip title={newNoteState ? "Close" : "Create new Note"}>
          <IconButton onClick={newNote}>
            <svg
              style={{
                transition: "300ms",
                transform: newNoteState ? "rotate(45deg)" : "none",
              }}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 10H15"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10 15V5"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </IconButton>
        </BootstrapTooltip>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          // border: "1px solid red",
        }}
      >
        <Divider sx={{ width: "80%", solor: "blue" }} />
      </Box>
      <Collapse in={newNoteState}>
        <Box
          sx={{
            display: "flex",
            backgroundColor: "#fff",
            px: "4px",
            borderRadius: "8px",
            mb: "4px",
          }}
        >
          <InputBase
            fullWidth
            placeholder="Name the note"
            onChange={handleInputChangeName}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            backgroundColor: "#fff",
            px: "4px",
            borderRadius: "8px",
          }}
        >
          <InputBase
            fullWidth
            placeholder="Write your note"
            multiline
            rows={16}
            onChange={handleInputChange}
          />
        </Box>
        <Button onClick={handleUpload}>save</Button>
      </Collapse>
      <CustomTextEditor />
      <Box
        sx={{
          overflow: "auto",
        }}
      >
        <Collapse in={!newNoteState}>
          <Box
            sx={{
              color: "#000",
              display: "flex",
              // border: "1px solid red",
              // background: "grey",
              flexDirection: "column",
              gap: "4px",
              flexGrow: "1",
              // overflow: "auto",
            }}
          >
            {notes?.map(
              (note) =>
                note.mainNav === mainNav &&
                note.subNav === subNav && (
                  <Box
                    onClick={() => handleSetId(note.id)}
                    key={note.id}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      py: "4px",
                      px: "4px",
                      borderRadius: "4px",
                      background: "#fff",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                    >
                      {note.name}
                    </Typography>
                    <Collapse in={hoverId === note.id}>
                      {console.log("collapse", hoverId, note.id)}
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Typography>{note.value}</Typography>
                      </Box>
                    </Collapse>
                  </Box>
                )
            )}
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};

NotesNew.propTypes = {};

export default NotesNew;
