// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mainNav: null,
  subNav: null,
  input: false,
  globalInput: {
    search: {
      Search: null,
    },
    dev: {
      Dataset: null,
      API: null,
      DB: null,
      Backend: null,
    },
    learning: {
      Words: null,
      Text: null,
      Memo: null,
      Tests: null,
    },
  },
  dataset: null,
  apis: null,
  addProject: false,
  projects: [],
  newProject: null,
  researchProject: [],
  activeSub: null,
  prompt: null,
  openChangeOn: null,
  uploaded: false,
};

const globalStatesSlices = createSlice({
  name: "globalStates",
  initialState,
  reducers: {
    setMainNav: (state, action) => {
      state.mainNav = action.payload; // Überprüfe, ob ein Benutzer vorhanden ist
    },
    setSubNav: (state, action) => {
      state.subNav = action.payload; // Überprüfe, ob ein Benutzer vorhanden ist
    },
    setInput: (state, action) => {
      state.input = action.payload; // Überprüfe, ob ein Benutzer vorhanden ist
    },
    setInputSearch: (state, action) => {
      state.globalInput.search.Search = action.payload; // Überprüfe, ob ein Benutzer vorhanden ist
    },
    setInputDevDataset: (state, action) => {
      state.globalInput.dev.Dataset = action.payload; // Überprüfe, ob ein Benutzer vorhanden ist
    },
    setInputDevAPI: (state, action) => {
      state.globalInput.dev.API = action.payload; // Überprüfe, ob ein Benutzer vorhanden ist
    },
    setInputDevDB: (state, action) => {
      state.globalInput.dev.DB = action.payload; // Überprüfe, ob ein Benutzer vorhanden ist
    },
    setInputDevBackend: (state, action) => {
      state.globalInput.dev.Backend = action.payload; // Überprüfe, ob ein Benutzer vorhanden ist
    },
    setInputLearningWords: (state, action) => {
      state.globalInput.learning.Words = action.payload; // Überprüfe, ob ein Benutzer vorhanden ist
    },
    setInputLearningText: (state, action) => {
      state.globalInput.learning.Text = action.payload; // Überprüfe, ob ein Benutzer vorhanden ist
    },
    setInputLearningMemo: (state, action) => {
      state.globalInput.learning.Memo = action.payload; // Überprüfe, ob ein Benutzer vorhanden ist
    },
    setInputLearningTests: (state, action) => {
      state.globalInput.learning.Tests = action.payload; // Überprüfe, ob ein Benutzer vorhanden ist
    },
    setDatasetId: (state, action) => {
      state.dataset = action.payload; // Überprüfe, ob ein Benutzer vorhanden ist
    },
    setDatasetAPIS: (state, action) => {
      state.apis = action.payload; // Überprüfe, ob ein Benutzer vorhanden ist
    },
    setAddProjectTrue: (state, action) => {
      state.addProject = action.payload; // Überprüfe, ob ein Benutzer vorhanden ist
    },
    setProjects: (state, action) => {
      state.projects = action.payload; // Überprüfe, ob ein Benutzer vorhanden ist
    },
    setProject: (state, action) => {
      state.projects = action.payload; // Überprüfe, ob ein Benutzer vorhanden ist
    },
    setResearchProject: (state, action) => {
      state.researchProject = action.payload; // Überprüfe, ob ein Benutzer vorhanden ist
    },
    setActiveSub: (state, action) => {
      state.activeSub = action.payload; // Überprüfe, ob ein Benutzer vorhanden ist
    },
    setPromptRedux: (state, action) => {
      state.prompt = action.payload; // Überprüfe, ob ein Benutzer vorhanden ist
    },
    setOpenChangeOn: (state, action) => {
      state.openChangeOn = action.payload; // Überprüfe, ob ein Benutzer vorhanden ist
    },
    setUploaded: (state, action) => {
      state.uploaded = action.payload; // Überprüfe, ob ein Benutzer vorhanden ist
    },
  },
});

export const {
  setMainNav,
  setSubNav,
  setInput,
  setInputSearch,
  setInputDevDataset,
  setInputDevAPI,
  setInputDevDB,
  setInputDevBackend,
  setInputLearningWords,
  setInputLearningText,
  setInputLearningMemo,
  setInputLearningTests,
  setDatasetId,
  setDatasetAPIS,
  setAddProjectTrue,
  setProjects,
  setProject,
  setResearchProject,
  setActiveSub,
  setPromptRedux,
  setOpenChangeOn,
  setUploaded,
} = globalStatesSlices.actions;

export default globalStatesSlices.reducer;
