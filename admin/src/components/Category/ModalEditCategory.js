import React from "react";
import { Button, TextField, Modal, Box, Typography } from "@mui/material";

function ModalEditCategory({
  show,
  onHide,
  formData,
  onInputChange,
  onFileChange,
  onSubmit,
}) {
  return (
    <Modal open={show} onClose={onHide}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          className="text-center !text-black !font-semibold"
        >
          Edit Category
        </Typography>
        <form>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={onInputChange}
            variant="outlined"
            margin="normal"
            placeholder="Enter category name"
          />

          <TextField
            fullWidth
            label="Color"
            name="color"
            value={formData.color}
            onChange={onInputChange}
            variant="outlined"
            margin="normal"
            placeholder="Enter category color"
          />

          <TextField
            fullWidth
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={onInputChange}
            variant="outlined"
            margin="normal"
            placeholder="Paste image URL or upload a file below"
          />

          <Button variant="contained" component="label" sx={{ marginTop: 2 }}>
            Or Upload Image
            <input type="file" hidden onChange={onFileChange} />
          </Button>

          {(formData.image || formData.file) && (
            <div className="text-center mt-3">
              <img
                src={
                  formData.file
                    ? URL.createObjectURL(formData.file)
                    : formData.image
                }
                alt="Preview"
                style={{
                  maxWidth: "100px",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
            </div>
          )}
        </form>
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={onHide}
            sx={{ marginRight: 2 }}
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={onSubmit}>
            Save Changes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ModalEditCategory;
