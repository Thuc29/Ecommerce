const mongoose = require("mongoose");

// Define Category Schema
const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    color: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Virtual ID field for JSON responses
categorySchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Set JSON serialization
categorySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id; // Remove _id field from the response
  },
});

// Export Category model
module.exports = mongoose.model("Category", categorySchema);
