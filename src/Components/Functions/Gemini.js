import { initializeApp } from "firebase/app";
import { getVertexAI, getGenerativeModel } from "firebase/vertexai";
import { model } from "../../firebase";
import { createClient } from "pexels";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

async function run(prompt) {
  // Generate content stream with the provided prompt
  const result = await model.generateContentStream(
    `requirement 0: response directly the JSON object {{...generated keys, imageUrl:""}, {...generated keys, imageUrl:""}...},
    requirement 1: response using this JSON  Shema, and generate realistic data,
    requiremnt 2: create an key inside of obect caled promt, and put the 3 first values of first keys of object: promt : "value1, value2, value3"
    requiremnt 3: Create JUST This requirement, without suggestions, JUST JSON
    requiremnt 4: i need just clean JSON, so i can automate the next steps, no questions, no suggestions.
    requiremnt 4: detect the LANGUAGE wich one the user want to learn!
    }, ${prompt}`
  );
  // requiremnt 2: create an key inside of obect caled promt, generate promt so that ist short but clear to search this object is"

  let chunks = [];

  for await (const chunk of result.stream) {
    const chunkText = chunk.text();

    console.log("Received chunk: ", chunkText); // Logging the received chunk
    chunks.push(chunkText);
  }

  console.log("chunks", chunks);
  // Combine all chunks into a single string
  //   let completeResponse = chunks.join("");
  let status = false;
  console.log("status", status);
  let responseJson;
  const completeResponse = chunks.join("").trim();
  console.log("Complete response: ", completeResponse);
  try {
    // Cleaning the JSON response
    const cleanResponse = completeResponse
      .replace(/```json|```/g, "") // Remove markdown JSON delimiters
      .replace(/(\r\n|\n|\r)/gm, "") // Remove newlines
      .replace(/\s{2,}/g, " ") // Remove extra spaces
      .replace(/,(\s*])/, "]"); // Remove trailing commas

    // Try to parse the cleaned response
    let jsonObjects;

    try {
      jsonObjects = JSON.parse(cleanResponse);
      console.log("Parsed JSON: ", jsonObjects);
      status = true;
      console.log("status", status);
    } catch (e) {
      console.error("Error parsing JSON response:", e, cleanResponse);
      return null;
    }
    // const jsonObjects = JSON.parse(cleanResponse);
    console.log("Parsed JSON: ", jsonObjects);
    jsonObjects = jsonObjects.map((obj) => ({ ...obj, id: uuidv4() }));

    // for (const obj of responseJson) {
    //   if (obj.prompt) {
    //     const photos = await searchImages(obj.prompt);
    //     console.log("search1");
    //     if (photos.length > 0) {
    //       obj.imageUrl = photos[0].src.medium;
    //       console.log("url", photos[0].src.medium);
    //     }
    //   }
    // }

    console.log("Updated JSON objects with image URLs json: ", jsonObjects);
    responseJson = jsonObjects;
    return jsonObjects;
  } catch (e) {
    console.error("Error parsing complete JSON response:", e, completeResponse);
  }

  console.log("Updated JSON objects with image URLs: ", completeResponse);
  return responseJson;
}

// const searchImages = async (query) => {
//   try {
//     const response = await client.photos.search({ query, per_page: 2 });

//     return response.photos;
//   } catch (error) {
//     console.error("Error fetching photos:", error);
//     return [];
//   }
// };

export const runDataset = async (prompt) => {
  return await run(prompt);
};

//search Component

// async function runSearch(prompt) {
//   // Generate content stream with the provided prompt
//   const result = await model.generateContentStream(prompt);

//   let chunks = [];

//   for await (const chunk of result.stream) {
//     const chunkText = chunk.text();

//     console.log("Received chunk: ", chunkText); // Logging the received chunk
//     chunks.push(chunkText);
//   }

//   console.log("chunks", chunks);
//   // Combine all chunks into a single string

//   const completeResponse = chunks.join("").trim();
//   console.log("Complete response: ", completeResponse);

//   return completeResponse;
// }

async function runSearch(prompt) {
  // Generate content stream with the provided prompt
  const result = await model.generateContentStream(
    `requirement 0: create JSON with keys: {answer, prompt, suggestions},
    requirement 1: create for answer JSON with the keys of Data which you give as answer
    requirement 2: create for prompt JSON, and generate prompt:[short pompts to search the google].
    requirement 3: create for suggestions JSON, with keys
    }, ${prompt}`
  );

  let chunks = [];

  // Process each chunk as it arrives
  for await (const chunk of result.stream) {
    const chunkText = await chunk.text();
    chunks.push(chunkText);

    // Process and/or render the chunk as soon as it's received
    console.log("Received chunk: ", chunkText);
  }

  const completeResponse = chunks.join("").trim();
  let resultObject;
  try {
    // Cleaning the JSON response
    const cleanResponse = completeResponse
      .replace(/```json|```/g, "") // Remove markdown JSON delimiters
      .replace(/(\r\n|\n|\r)/gm, "") // Remove newlines
      .replace(/\s{2,}/g, " ") // Remove extra spaces
      .replace(/,(\s*])/, "]"); // Remove trailing commas

    // Try to parse the cleaned response
    try {
      resultObject = JSON.parse(cleanResponse); // Parse the cleaned response
      console.log("Parsed JSON: ", resultObject);
      // Optionally add UUIDs to each object if needed
      // resultObject = resultObject.map((obj) => ({ ...obj, id: uuidv4() }));
      // console.log("Updated JSON objects with UUIDs: ", resultObject);
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError, cleanResponse);
      return null; // Return null on JSON parsing error
    }
  } catch (error) {
    console.error("Error generating content stream:", error);
    return null; // Return null on errors during content stream generation
  }

  return resultObject;
  // Optional: If you want to do something after all chunks have been processed
  // console.log("All chunks processed.");
}

// Funktion zum direkten Rendern oder Verarbeiten eines Chunks
// function renderChunk(chunkText) {
//   // Ersetze doppelte Sternchen durch HTML <b>-Tags für fett markierten Text
//   let formattedText = chunkText
//     .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Fett markierten Text
//     .replace(/\*\s/g, "<br />"); // Umbrüche

//   // Entferne unerwünschte Teile (z.B. Fehler oder Debug-Nachrichten)
//   formattedText = formattedText.replace(/Gemini\.js:\d+/g, ""); // Entferne "Gemini.js:136" oder ähnliches

//   // Teile den formatierten Text in einzelne Wörter auf
//   const words = formattedText.split(/\s+/); // Aufteilen nach Leerzeichen

//   // Verarbeite jedes Wort einzeln
//   words.forEach((word) => {
//     if (word.trim()) {
//       processWord(word); // Hier kannst du eine Funktion zur Verarbeitung des Wortes aufrufen
//     }
//   });
// }
// function processWord(word) {
//   const outputElement = document.getElementById("output");

//   // Füge das Wort als neuen Absatz hinzu
//   const wordElement = document.createElement("p");
//   wordElement.innerHTML = word;
//   outputElement.appendChild(wordElement);
// }

// Exportiere die Funktion, falls du sie woanders verwenden möchtest
export const runSearchFunc = async (prompt) => {
  await runSearch(prompt);
};

export async function runLanguageLearning(prompt) {
  // Generate content stream with the provided prompt
  const result = await model.generateContentStream(
    `requirement 0: create 3 JSON {starter:{text, words }, medium:{text, words}, intermediate:{text, words}}
     requirement 1: starter : create text inside the text key, without 18 words, but mark this places with Numbers starting #0 (index), create in key words for each number 3 diferent words, and 1 of them is right for this place. Text about simple Ideas, with 150 Words, Exemple(family, hobby, musik, cinema.... and similar topics).
     requirement 2: medium : create text inside the text key, without 18 words, but mark this places with Numbers starting #0 (index), create in key words for each number 3 diferent words, and 1 of them is right for this place. Text about medium Ideas, with 150 Words, Exemple(cars, environment, relationship, universities.... and similar topics)..
     requirement 3: medium : create text inside the text key, without 18 words, but mark this places with Numbers starting #0 (index), create in key words for each number 3 diferent words, and 1 of them is right for this place. Text about intermediate Ideas, with 150 Words, Exemple(profession, space, science, literature.... and similar topics)..
      }, ${prompt}`
    // prompt
  );
  // requiremnt 2: create an key inside of obect caled promt, generate promt so that ist short but clear to search this object is"

  let chunks = [];

  for await (const chunk of result.stream) {
    const chunkText = chunk.text();

    console.log("Received chunk: ", chunkText); // Logging the received chunk
    chunks.push(chunkText);
  }

  console.log("chunks", chunks);
  // Combine all chunks into a single string
  //   let completeResponse = chunks.join("");
  let status = false;
  console.log("status", status);
  const completeResponse = chunks.join("").trim();
  console.log("Complete response: ", completeResponse);
  let resultObject;
  try {
    // Cleaning the JSON response
    const cleanResponse = completeResponse
      .replace(/```json|```/g, "") // Remove markdown JSON delimiters
      .replace(/(\r\n|\n|\r)/gm, "") // Remove newlines
      .replace(/\s{2,}/g, " ") // Remove extra spaces
      .replace(/,(\s*])/, "]"); // Remove trailing commas

    // Try to parse the cleaned response
    let jsonObjects;

    try {
      jsonObjects = JSON.parse(cleanResponse); // Versuchen, die bereinigte Antwort zu parsen
      console.log("Parsed JSON: ", jsonObjects);
      // jsonObjects = jsonObjects.map((obj) => ({ ...obj, id: uuidv4() })); // Füge UUIDs hinzu
      // console.log("Updated JSON objects with UUIDs: ", jsonObjects);
      resultObject = jsonObjects;
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError, cleanResponse);
      return null; // Rückgabe von null bei JSON Parsing Fehler
    }
  } catch (error) {
    console.error("Error generating content stream:", error);
    return null; // Rückgabe von null bei Fehlern während der Stream-Erzeugung
  }
  return resultObject;
}

export const runLanguageLearningFunc = async (prompt) => {
  return await runLanguageLearning(prompt);
};
