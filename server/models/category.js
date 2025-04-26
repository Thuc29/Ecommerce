const mongoose = require("mongoose");

const subcategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subcategory name is required"],
      trim: true,
      minlength: [1, "Subcategory name cannot be empty"],
    },
  },
  { _id: true } // Ensure subdocuments have their own _id
);

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: [true, "Category name must be unique"],
      trim: true,
      minlength: [1, "Category name cannot be empty"],
    },
    images: [
      {
        type: String,
        validate: {
          validator: function (v) {
            return !v || /^https?:\/\/[^\s$.?#].[^\s]*$/.test(v);
          },
          message: (props) => `${props.value} is not a valid image URL`,
        },
      },
    ],
    color: {
      type: String,
      required: [true, "Color is required"],
      validate: {
        validator: function (v) {
          return /^#([0-9A-F]{3}){1,2}$/i.test(v);
        },
        message: (props) => `${props.value} is not a valid hex color code`,
      },
    },
    subcategories: [subcategorySchema], // Embed subcategories as an array of subdocuments
  },
  {
    timestamps: true,
  }
);

categorySchema.set("toJSON", {
  versionKey: false,
});

module.exports = mongoose.model("Category", categorySchema);
