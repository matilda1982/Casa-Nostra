import mongoose from "mongoose";

const ApartmentSchema = new mongoose.Schema({
  name: {
    en: { type: String, required: true },
    de: { type: String },  // German translation
    hr: { type: String },  // Croatian translation
    cz: { type: String }, // Czech translation
    sk: { type: String }, // Slovak translation
    pl: { type: String }, // Polish translation
  },
  price: {
    type: Number,
    required: true,
  },

  description: {
    en: { type: String, required: true },
    de: { type: String },  // German translation
    hr: { type: String },  // Croatian translation
    cz: { type: String }, // Czech translation
    sk: { type: String }, // Slovak translation
    pl: { type: String }, // Polish translation
  },
  image: {
    type: String,
  },
  image1: {
    type: String,
  },
  image2: {
    type: String,
  },
  image3: {
    type: String,
  },
  image4: {
    type: String,
  },
  image5: {
    type: String,
  },
  image6: {
    type: String,
  },
  image7: {
    type: String,
  },
  image8: {
    type: String,
  },
  image9: {
    type: String,
  },
  image10: {
    type: String,
  },
  image11: {
    type: String,
  },
  image12: {
    type: String,
  },
  image13: {
    type: String,
  },
  image14: {
    type: String,
  },
  image15: {
    type: String,
  },
  image16: {
    type: String,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
});

export const Apartment = mongoose.model("Apartment", ApartmentSchema);
