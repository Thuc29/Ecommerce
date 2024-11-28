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

// Define Virtual ID to allow use of _id as "id" for JSON responses
categorySchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Set toJSON method to include virtuals and remove _id and __v
categorySchema.set("toJSON", {
  virtuals: true,
  versionKey: false, // Removes __v
  transform: (doc, ret) => {
    delete ret._id; // Removes _id
  },
});

// Create Category Model based on the schema
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
