import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { encrypt } from "../../Components/Components/Crypto";

// Async Thunk
// export const uploadData = createAsyncThunk(
//   "data/uploadData",
//   async ({ docName, data }, { rejectWithValue }) => {
//     try {
//       // Erstelle ein neues Dokument in der Sammlung
//       const docRef = await addDoc(collection(db, docName), {
//         ...data, // Übergebe alle Daten hier
//       });
//       return docRef.id; // Gibt die ID des neuen Dokuments zurück
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
//-----------------------------------------------------------------------Working
// export const uploadNote = createAsyncThunk(
//   "data/uploadNote",
//   async ({ docName, user, data }, { rejectWithValue }) => {
//     console.log("uploadeNote", docName, user, data);
//     console.log("docName", docName);
//     try {
//       const createdAt = serverTimestamp();
//       const userData = {
//         creator: user.uid,
//         allowed: [],
//         createdAt: createdAt,
//         private: false,
//       };
//       // Erstelle ein neues Dokument in der Sammlung mit den userData
//       const userDocRef = await addDoc(collection(db, docName), {
//         ...userData, // Übergebe alle userData hier
//         createdAt,
//       });
//       console.log("upload docname created");

//       // Füge die data als Unterkollektion zu dem userData-Dokument hinzu
//       const subCollectionRef = collection(db, docName, userDocRef.id, "note"); // Ersetze 'subCollectionName' mit dem gewünschten Namen der Unterkollektion

//       //   await addDoc(subCollectionRef, {
//       //     ...data, // Übergebe alle Daten hier
//       //   });
//       //   console.log("upload end");

//       await addDoc(subCollectionRef, {
//         data, // Übergebe jedes Daten-Objekt hier
//       });

//       return userDocRef.id; // Gibt die ID des neuen userData-Dokuments zurück
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
//-----------------------------------------------------------------------Working

export const createProject = createAsyncThunk(
  "data/createProject",
  async ({ docName, user, data }, { rejectWithValue }) => {
    console.log("uploadNote", docName, user.uid, data);
    console.log("docName", docName);
    try {
      const createdAt = serverTimestamp();
      const userDocRefToUpdate = await findUserDocument(user.uid);
      const userDocSnap = await getDoc(userDocRefToUpdate);
      let projectsId = null;
      const userData = userDocSnap.data();
      if (userData.projects && userData.projects.length > 0) {
        projectsId = userData.projects[0]; // Angenommen, nur ein Dokument existiert
      }
      let userDocRef;
      if (projectsId) {
        // Wenn bereits ein Dokument existiert, verwenden Sie es
        userDocRef = doc(db, "projects", projectsId);
      } else {
        // Andernfalls erstellen Sie ein neues Dokument
        userDocRef = await addDoc(collection(db, "projects"), {
          allowed: [],
          APIs: [],
          createdAt: createdAt,
          private: false,
        });
        // Füge die neue Dokument-ID in das Benutzer-Dokument ein
        await updateDoc(userDocRefToUpdate, {
          projects: arrayUnion(userDocRef.id),
        });
      }
      console.log("User document reference:", userDocRef.id);
      if (!userDocSnap.exists()) {
        const userData = {
          creator: user.uid,
          allowed: [],
          createdAt: serverTimestamp(),
          private: false,
        };
        await setDoc(userDocRef, userData);
        console.log("User document created");
      }
      let project;
      const subCollectionRef = collection(userDocRef, "projects");
      project = await addDoc(subCollectionRef, {
        ...data,
        createdAt,
      });

      console.log("Project created successfully", project);

      return project.id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//############################################################

// export const updateProject = createAsyncThunk(
//   "data/updateProject",
//   async ({ id, xid, content, prompt }, { rejectWithValue }) => {
//     try {
//       // Erstellen einer Dokumentreferenz
//       console.log("updateProjectsss", id, xid, content, prompt);
//       const projectRef = doc(db, "projects", xid, "projects", id);
//       const docSnap = await getDoc(projectRef);
//       // Aktualisieren des Dokuments mit neuen Daten
//       const projectData = docSnap.data();

//       await updateDoc(projectRef, { ...projectData, content, prompt });
//       console.log("Project, updated");
//       return { id }; // Rückgabe der aktualisierten Daten
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const updateProject = createAsyncThunk(
  "data/updateProject",
  async ({ id, xid, content, prompt }, { rejectWithValue }) => {
    try {
      console.log("Updating project", id, "in collection", xid);
      const projectRef = doc(db, "projects", xid, "projects", id);
      const docSnap = await getDoc(projectRef);

      if (!docSnap.exists()) {
        console.error("Document does not exist:", id);
        throw new Error("Document does not exist");
      }

      const projectData = docSnap.data();
      const updatedData = { ...projectData, content, prompt };

      await updateDoc(projectRef, updatedData);
      console.log("Project updated successfully:", id);

      return { id, updatedData }; // Rückgabe der aktualisierten Daten und deren Inhalt
    } catch (error) {
      console.error("Failed to update project:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const updateProjectSub = createAsyncThunk(
  "data/updateProjectSub",
  async ({ id, xid, newData }, { rejectWithValue }) => {
    try {
      const projectRef = doc(db, "projects", xid, "projects", id);
      const docSnap = await getDoc(projectRef);

      if (docSnap.exists()) {
        const projectData = docSnap.data();
        const contentArray = projectData.content[0].content;

        // Finden und aktualisieren des spezifischen Objekts im Array
        const updatedContentArray = contentArray.map((item) => {
          if (item.id === newData.targetId) {
            return {
              content: [...item],
              subTitle: newData.subTitle,
              subContent: newData.subContent,
            };
          }
          return item;
        });

        // Zurückschreiben des aktualisierten Arrays ins Dokument
        // await updateDoc(projectRef, {
        //   "content.0.content": updatedContentArray,
        // });

        console.log("Project subcontent updated");
        return { id, ...newData }; // Rückgabe der aktualisierten Daten
      } else {
        throw new Error("Document does not exist");
      }
    } catch (error) {
      console.error("Error updating project subcontent:", error);
      return rejectWithValue(error.message);
    }
  }
);
export const removeSub = createAsyncThunk(
  "data/removeSub",
  async ({ id, xid, subTitleId, titleId }, { rejectWithValue }) => {
    if (!id || !xid || !subTitleId || !titleId) {
      console.error("One of the required parameters is undefined");
      return rejectWithValue("Required parameter is undefined");
    }

    const projectRef = doc(db, "projects", xid, "projects", id);
    const docSnap = await getDoc(projectRef);

    if (!docSnap.exists()) {
      console.error("Document does not exist");
      return rejectWithValue("Document does not exist");
    }

    const projectData = docSnap.data();
    const titleObjectIndex = projectData.content.findIndex(
      (obj) => obj.id === titleId
    );

    if (titleObjectIndex === -1) {
      console.error("Title object not found");
      return rejectWithValue("Title object not found");
    }

    // Entferne das spezifische Unterobjekt aus dem content-Array
    projectData.content[titleObjectIndex].content = projectData.content[
      titleObjectIndex
    ].content.filter((item) => item.id !== subTitleId);

    // Aktualisiere das gesamte Dokument
    await updateDoc(projectRef, {
      ...projectData,
    });

    console.log("Sub content item removed");
    return { id, subTitleId };
  }
);
export const updateSub = createAsyncThunk(
  "data/updateSub",
  async (
    { id, xid, subTitleId, titleId, newSubTitle, newSubContent }, // Stelle sicher, dass die neuen Daten korrekt benannt sind
    { rejectWithValue }
  ) => {
    if (!id || !xid || !subTitleId || !titleId) {
      console.error("One of the required parameters is undefined");
      return rejectWithValue("Required parameter is undefined");
    }

    const projectRef = doc(db, "projects", xid, "projects", id);
    const docSnap = await getDoc(projectRef);

    if (!docSnap.exists()) {
      console.error("Document does not exist");
      return rejectWithValue("Document does not exist");
    }

    const projectData = docSnap.data();
    const titleObjectIndex = projectData.content.findIndex(
      (obj) => obj.id === titleId
    );

    if (titleObjectIndex === -1) {
      console.error("Title object not found");
      return rejectWithValue("Title object not found");
    }

    // Finde das Unterobjekt
    const subIndex = projectData.content[titleObjectIndex].content.findIndex(
      (item) => item.id === subTitleId
    );

    if (subIndex === -1) {
      console.error("SubTitle object not found");
      return rejectWithValue("SubTitle object not found");
    }

    // Aktualisiere die Daten des Unterobjekts
    projectData.content[titleObjectIndex].content[subIndex].subTitle =
      newSubTitle;
    projectData.content[titleObjectIndex].content[subIndex].subContent =
      newSubContent;

    // Aktualisiere das gesamte Dokument
    await updateDoc(projectRef, {
      ...projectData,
    });

    console.log("Sub content item updated");
    return { id, subTitleId };
  }
);
export const updateTitle = createAsyncThunk(
  "data/updateTitle",
  async (
    { id, xid, titleId, newTitle }, // Stelle sicher, dass die neuen Daten korrekt benannt sind
    { rejectWithValue }
  ) => {
    if (!id || !xid || !titleId) {
      console.error("One of the required parameters is undefined");
      return rejectWithValue("Required parameter is undefined");
    }

    const projectRef = doc(db, "projects", xid, "projects", id);
    const docSnap = await getDoc(projectRef);

    if (!docSnap.exists()) {
      console.error("Document does not exist");
      return rejectWithValue("Document does not exist");
    }

    const projectData = docSnap.data();
    const titleObjectIndex = projectData.content.findIndex(
      (obj) => obj.id === titleId
    );

    if (titleObjectIndex === -1) {
      console.error("Title object not found");
      return rejectWithValue("Title object not found");
    }

    // Aktualisiere die Daten des Unterobjekts
    projectData.content[titleObjectIndex].title = newTitle;

    // Aktualisiere das gesamte Dokument
    await updateDoc(projectRef, {
      ...projectData,
    });

    console.log("Sub content item updated");
    return { id, newTitle };
  }
);

export const addSubSub = createAsyncThunk(
  "data/addSubSub",
  async (
    { id, xid, subTitleId, titleId, newSubSubObject }, // Ein einzelnes Objekt, das hinzugefügt werden soll
    { rejectWithValue }
  ) => {
    console.log("updta-newSubSubObject", newSubSubObject);
    console.log("updta-id, ", id);
    console.log("updta-xid, ", xid);
    console.log("updta-subTitleId", subTitleId);
    console.log("updta-titleId ", titleId);
    console.log("updta-newSubSubObject ", newSubSubObject);
    if (!id || !xid || !subTitleId || !titleId) {
      console.error("One of the required parameters is undefined");
      return rejectWithValue("Required parameter is undefined");
    }

    const projectRef = doc(db, "projects", xid, "projects", id);
    const docSnap = await getDoc(projectRef);

    if (!docSnap.exists()) {
      console.error("Document does not exist");
      return rejectWithValue("Document does not exist");
    }

    const projectData = docSnap.data();
    const titleObjectIndex = projectData.content.findIndex(
      (obj) => obj.id === titleId
    );

    if (titleObjectIndex === -1) {
      console.error("Title object not found");
      return rejectWithValue("Title object not found");
    }

    // Finde das Unterobjekt (subTitle)
    const subIndex = projectData.content[titleObjectIndex].content.findIndex(
      (item) => item.id === subTitleId
    );

    if (subIndex === -1) {
      console.error("SubTitle object not found");
      return rejectWithValue("SubTitle object not found");
    }

    // Initialisiere das content-Array des Sub-Objekts, falls es nicht existiert
    if (!projectData.content[titleObjectIndex].content[subIndex].content) {
      projectData.content[titleObjectIndex].content[subIndex].content = [];
    }

    // Füge das neue Objekt dem content-Array hinzu
    projectData.content[titleObjectIndex].content[subIndex].content.push(
      newSubSubObject
    );
    console.log("upda-projectData", projectData);
    // Aktualisiere das gesamte Dokument in Firestore
    await updateDoc(projectRef, projectData);

    console.log("Sub content array updated with new subSub object");
    return { id, subTitleId };
  }
);

// export const removeSub = createAsyncThunk(
//   "data/removeSub",
//   async ({ id, xid, subTitleId, titleId }, { rejectWithValue }) => {
//     if (!id || !xid || !subTitleId || !titleId) {
//       console.error("One of the required parameters is undefined");
//       return rejectWithValue("Required parameter is undefined");
//     }

//     try {
//       const projectRef = doc(db, "projects", xid, "projects", id);
//       const docSnap = await getDoc(projectRef);

//       if (!docSnap.exists()) {
//         throw new Error("Document does not exist");
//       }

//       const projectData = docSnap.data();

//       const titleObjectIndex = projectData.content.findIndex(
//         (object) => object.id === titleId
//       );

//       if (titleObjectIndex === -1) {
//         console.error("Title object not found");
//         return rejectWithValue("Title object not found");
//       }

//       const titleObject = projectData.content[titleObjectIndex];

//       // Finde den Index des zu entfernenden Sub-Objekts
//       const subIndex = titleObject.content.findIndex(
//         (item) => item.id === subTitleId
//       );

//       if (subIndex === -1) {
//         console.error("Sub-title object not found");
//         return rejectWithValue("Sub-title object not found");
//       }

//       // Entferne das Sub-Objekt
//       titleObject.content.splice(subIndex, 1);

//       // Optional: Aktualisiere das Dokument in der Datenbank
//       await updateDoc(projectRef, {
//         [`content.${titleObjectIndex}.content`]: titleObject.content,
//       });

//       console.log("Sub content item removed");

//       return { id, subTitleId };
//     } catch (error) {
//       console.error("Error removing sub content item:", error);
//       return rejectWithValue(error.message);
//     }
//   }
// );

//---------------------------------------------------------------------Working

export const uploadNote = createAsyncThunk(
  "data/uploadNote",
  async ({ docName, user, data }, { rejectWithValue }) => {
    console.log("uploadNote", docName, user, data);
    console.log("docName", docName);
    try {
      const userDocRef = doc(db, docName, user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        const userData = {
          creator: user.uid,
          allowed: [],
          createdAt: serverTimestamp(),
          private: false,
        };
        await setDoc(userDocRef, userData);
        console.log("User document created");
      }

      const subCollectionRef = collection(userDocRef, "notes");
      const noteData = {
        ...data,
        createdAt: serverTimestamp(),
      };
      await addDoc(subCollectionRef, noteData);

      console.log("Note uploaded successfully");
      return userDocRef.id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//############################################################
export const findUserDocument = async (userId) => {
  const usersCollectionRef = collection(db, "users");
  const q = query(usersCollectionRef, where("uid", "==", userId));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw new Error("User not found");
  }

  let userDocRef;
  querySnapshot.forEach((doc) => {
    userDocRef = doc.ref;
  });

  return userDocRef;
};

export const uploadData = createAsyncThunk(
  "data/uploadData",
  async ({ docName, user, data }, { rejectWithValue }) => {
    try {
      const createdAt = serverTimestamp();
      const userDocRefToUpdate = await findUserDocument(user.uid);
      const userDocSnap = await getDoc(userDocRefToUpdate);

      // Überprüfen, ob bereits eine Dataset-ID im Benutzer-Dokument vorhanden ist
      let datasetDocId = null;
      const userData = userDocSnap.data();

      if (userData.datasets && userData.datasets.length > 0) {
        datasetDocId = userData.datasets[0]; // Angenommen, nur ein Dokument existiert
      }

      let userDocRef;
      if (datasetDocId) {
        // Wenn bereits ein Dokument existiert, verwenden Sie es
        userDocRef = doc(db, "datasets", datasetDocId);
      } else {
        // Andernfalls erstellen Sie ein neues Dokument
        userDocRef = await addDoc(collection(db, "datasets"), {
          allowed: [],
          APIs: [],
          createdAt: createdAt,
          private: false,
        });
        // Füge die neue Dokument-ID in das Benutzer-Dokument ein
        await updateDoc(userDocRefToUpdate, {
          datasets: arrayUnion(userDocRef.id),
        });
      }

      console.log("User document reference:", userDocRef.id);

      // Erstelle ein neues Dokument in der Unterkollektion mit den Daten
      const subCollectionRef = collection(userDocRef, "sets");
      await Promise.all(
        data.map(async (dataItem) => {
          await addDoc(subCollectionRef, {
            ...dataItem,
            createdAt,
            collection: docName,
          });
          console.log("Uploaded dataItem:", dataItem);
        })
      );

      const apiKey = `apiKey=api_${Math.random()
        .toString(36)
        .substr(2, 9)}&doc=${docName}&xgemini=${userDocRef.id}`; // Generiere einen einfachen API-Schlüssel

      // const encryptedQuery = encrypt(apiKey);
      // console.log("encryptedQuery", encryptedQuery);
      await updateDoc(userDocRef, {
        APIs: arrayUnion(apiKey),
        allowed: userData.uid !== user.uid ? arrayUnion(user.uid) : [],
      });

      return userDocRef.id; // Gibt die ID des neuen oder existierenden userData-Dokuments zurück
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// export const uploadData = createAsyncThunk(
//   "data/uploadData",
//   async ({ docName, user, data }, { rejectWithValue }) => {
//     try {
//       const datasetsCollectionRef = collection(db, "datasets");
//       const createdAt = serverTimestamp();

//       // Erstelle ein neues Dokument in der datasets-Sammlung mit einer automatisch generierten ID
//       const userDocRef = await addDoc(datasetsCollectionRef, {
//         allowed: [],
//         APIs: [],
//         createdAt: createdAt,
//         private: false,
//       });

//       console.log("User document created with ID: ", userDocRef.id);
//       //docRef into Users dataset
//       const userDocRefToUpdate = await findUserDocument(user.uid);

//       // Füge die neue Dokument-ID in das Benutzer-Dokument in der "users"-Sammlung ein
//       await updateDoc(userDocRefToUpdate, {
//         datasets: arrayUnion(userDocRef.id),
//       });

//       console.log("Dataset ID added to user document");

//       // Erstelle ein neues Dokument in der Unterkollektion mit den Daten
//       const subCollectionRef = collection(userDocRef, "sets");
//       await Promise.all(
//         data.map(async (dataItem) => {
//           await addDoc(subCollectionRef, {
//             ...dataItem,
//             createdAt,
//             collection: docName,
//           }); // Übergebe das Datenobjekt direkt
//           console.log("Uploaded dataItem:", dataItem);
//         })
//       );

//       return userDocRef.id; // Gibt die ID des neuen userData-Dokuments zurück
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

//############################################################

export const fetchNotes = createAsyncThunk(
  "data/fetchNotes",
  async ({ docName, userId }, { rejectWithValue }) => {
    try {
      const userDocRef = doc(db, docName, userId);
      const subCollectionRef = collection(userDocRef, "notes");

      return new Promise((resolve, reject) => {
        onSnapshot(
          subCollectionRef,
          (querySnapshot) => {
            const notes = [];
            querySnapshot.forEach((doc) => {
              notes.push({ id: doc.id, ...doc.data() });
            });
            resolve(notes);
          },
          (error) => {
            reject(rejectWithValue(error.message));
          }
        );
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// export const uploadData = createAsyncThunk(
//   "data/uploadData",
//   async ({ docName, user, data }, { rejectWithValue }) => {
//     try {
//       const userDocRef = doc(db, "datasets", user.uid);
//       const userDocSnap = await getDoc(userDocRef);
//       const createdAt = serverTimestamp();
//       if (!userDocSnap.exists()) {
//         const userData = {
//           creator: user.uid,
//           allowed: [],
//           APIs: [],
//           createdAt: createdAt,
//           private: false,
//         };
//         await setDoc(userDocRef, userData);
//         console.log("User document created");
//       }

//       // Erstelle ein neues Dokument in der Sammlung mit den userData
//       const subCollectionRef = collection(userDocRef, "sets");
//       await Promise.all(
//         data.map(async (dataItem) => {
//           await addDoc(subCollectionRef, {
//             ...dataItem,
//             createdAt,
//             collection: docName,
//           }); // Übergebe das Datenobjekt direkt
//           console.log("Uploaded dataItem:", dataItem);
//         })
//       );

//       return userDocRef.id; // Gibt die ID des neuen userData-Dokuments zurück
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

//---------------------------------realtime dev Data
export const listenToSubCollectionUpdates = (docName, userDocId, callback) => {
  // Referenz auf das Hauptdokument
  const userDocRef = doc(db, docName, userDocId);

  // Setze einen Listener auf das Hauptdokument
  onSnapshot(userDocRef, (userDocSnapshot) => {
    if (userDocSnapshot.exists()) {
      // Hauptdokument ist vorhanden, setze den Listener auf die Subkollektion
      const subCollectionRef = collection(db, docName, userDocId, "data");

      // Setze einen Echtzeit-Listener auf die Subkollektion
      const unsubscribe = onSnapshot(subCollectionRef, (snapshot) => {
        const changes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        callback(changes); // Führe die Callback-Funktion aus, um mit den Änderungen umzugehen
      });

      // Rückgabe der Unsubscribe-Funktion
      return unsubscribe;
    } else {
      console.log("Das Hauptdokument existiert nicht.");
    }
  });
};
//---------------------------------realtime dev Data

//
export const listDatasets = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    return documents;
  } catch (error) {
    console.error("Error listing documents: ", error);
    throw error;
  }
};

//read Doc
export const readDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("No such document!");
    }
  } catch (error) {
    console.error("Error reading document: ", error);
    throw error;
  }
};

// Update
// export const updateDataset = async (collectionName, docId, data) => {
//   try {
//     const docRef = doc(db, collectionName, docId);
//     await updateDoc(docRef, data);
//     console.log("Document updated with ID: ", docId);
//   } catch (error) {
//     console.error("Error updating document: ", error);
//     throw error;
//   }
// };

//
// Delete
export const deleteDataset = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    console.log("Document deleted with ID: ", docId);
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error;
  }
};

export const updateDataset = async (collectionName, docId, updates) => {
  try {
    const docRef = doc(db, collectionName, docId);

    const updateOperations = {};

    if (updates.addAllowed) {
      updateOperations.allowed = arrayUnion(...updates.addAllowed);
    }

    if (updates.removeAllowed) {
      updateOperations.allowed = arrayRemove(...updates.removeAllowed);
    }

    if (updates.addAPIs) {
      updateOperations.APIs = arrayUnion(...updates.addAPIs);
    }

    if (updates.removeAPIs) {
      updateOperations.APIs = arrayRemove(...updates.removeAPIs);
    }

    if (updates.hasOwnProperty("private")) {
      updateOperations.private = updates.private;
    }

    // if (updates.hasOwnProperty("createdAt")) {
    //   updateOperations.createdAt = serverTimestamp();
    // }

    await updateDoc(docRef, updateOperations);
    console.log("Document updated with ID: ", docId);
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};

//Subdocument

export const readSubDocument = async (
  collectionName,
  docId,
  subCollectionName,
  subDocId
) => {
  try {
    const docRef = doc(db, collectionName, docId, subCollectionName, subDocId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("No such sub-document!");
    }
  } catch (error) {
    console.error("Error reading sub-document: ", error);
    throw error;
  }
};

export const deleteSubDocument = async (
  collectionName,
  docId,
  subCollectionName,
  subDocId
) => {
  try {
    const docRef = doc(db, collectionName, docId, subCollectionName, subDocId);
    await deleteDoc(docRef);
    console.log("Sub-document deleted with ID: ", subDocId);
  } catch (error) {
    console.error("Error deleting sub-document: ", error);
    throw error;
  }
};

export const updateSubDocument = async (
  collectionName,
  docId,
  subCollectionName,
  subDocId,
  data
) => {
  try {
    const docRef = doc(db, collectionName, docId, subCollectionName, subDocId);
    await updateDoc(docRef, data);
    console.log("Sub-document updated with ID: ", subDocId);
  } catch (error) {
    console.error("Error updating sub-document: ", error);
    throw error;
  }
};

// Initial State
const initialState = {
  notes: [],
  loading: false,
  data: null,
  error: null,
};

// Create Slice
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadData.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(uploadData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dataSlice.reducer;
