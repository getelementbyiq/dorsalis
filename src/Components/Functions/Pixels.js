import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import { createClient } from "pexels";

const client = createClient(process.env.REACT_APP_PEXELS_KEY);

const ImageSearch = (props) => {
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await client.photos.search({ query, per_page: 10 });
      setPhotos(response.photos);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px",
        color: "white",
        background: "#282c34",
      }}
    >
      <TextField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        label="Search for images"
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{ backgroundColor: "white", borderRadius: "4px" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        sx={{ marginTop: "16px" }}
      >
        Search
      </Button>
      <Grid container spacing={2} sx={{ marginTop: "16px" }}>
        {photos.map((photo) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={photo.id}>
            <img
              src={photo.src.medium}
              alt={photo.alt}
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <Typography
              variant="caption"
              display="block"
              sx={{ textAlign: "center", marginTop: "8px", color: "white" }}
            >
              {photo.alt}
            </Typography>
            <Typography>{photo.src.medium}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

ImageSearch.propTypes = {
  apiKey: PropTypes.string.isRequired,
};

export default ImageSearch;
