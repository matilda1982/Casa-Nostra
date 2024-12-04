import { Apartment } from '../models/ApartmentModel.js';
import { connect } from "../db.js";

export const GetAllApartments = async (req, res) => {
    try {
      await connect();
      const apartments = await Apartment.find();
      res.status(200).json(apartments);
    } catch (error) {
      console.error('Error fetching apartments:', error);
      res.status(500).json({ error: 'Failed to fetch apartments' });
    }
  };

  export const PostApartment = async (req, res) => {
    try {
      await connect();
      const { name, price, description, image,image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13, image14, image15, image16, latitude, longitude  } = req.body;
      const newApartment = new Apartment({ 
        name: {
          en: name.en,
          de: name.de,
          hr: name.hr,
          cz: name.cz,
          pl: name.pl,
          sk: name.sk
        },
        description: {
          en: description.en,
          de: description.de,
          hr: description.hr,
          cz: description.cz,
          pl: description.pl,
          sk: description.sk
        },
         price,  image, image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13, image14, image15, image16, latitude, longitude });
      await newApartment.save();
      res.status(201).json(newApartment);
    } catch (e) {
      console.error('Error saving Apartment:', e.message || e);
      res.status(500).json({ error: 'Failed to save Apartment', details: e.message || e  });
    }
  };

export const GetSingleApartment = async (req, res) => {
    const id = req.params.id;
    try {
      await connect();
      const apartment = await Apartment.findById(id);
      if (apartment) {
        res.status(200).json(apartment);
      } else {
        res.status(404).json({ error: 'Apartment not found' });
      }
    } catch (e) {
      console.error('Error fetching Apartment by ID:', e);
      res.status(500).json({ error: 'Failed to fetch Apartment' });
    }
  };


export const DeleteSingleApartment = async (req, res) => {
    const id = req.params.id;
    try {
      await connect();
      await Apartment.findByIdAndDelete(id);
      res.status(204).send();
    } catch (e) {
      console.error('Error deleting Apartment:', e);
      res.status(500).json({ error: 'Failed to delete Apartment' });
    }
  };

export const UpdateSingleApartment = async (req, res) => {
    const id = req.params.id;
    try {
      await connect();
      const apartment = await Apartment.findByIdAndUpdate(id, req.body, { new: true });
      if (apartment) {
        res.status(200).json(apartment);
      } else {
        res.status(404).json({ error: 'Apartment not found' });
      }
    } catch (e) {
      console.error('Error updating Apartment:', e);
      res.status(500).json({ error: 'Failed to update Apartment' });
    }
  };

// import { Apartment } from '../models/ApartmentModel.js';
// import { connect } from "../db.js";
// import mongoose from 'mongoose';

// // Dobavljanje svih apartmana
// export const GetAllApartments = async (req, res) => {
//   try {
//     await connect();
//     const apartments = await Apartment.find();
//     res.status(200).json(apartments);
//   } catch (error) {
//     console.error('Error fetching apartments:', error);
//     res.status(500).json({ error: 'Failed to fetch apartments' });
//   }
// };

// // Kreiranje novog apartmana
// export const PostApartment = async (req, res) => {
//   try {
//     await connect();
//     const { name, price, description, image, image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13, image14, image15, image16, latitude, longitude } = req.body;
//     const newApartment = new Apartment({
//       name: {
//         en: name.en,
//         de: name.de,
//         hr: name.hr,
//         cz: name.cz,
//         pl: name.pl,
//         sk: name.sk
//       },
//       description: {
//         en: description.en,
//         de: description.de,
//         hr: description.hr,
//         cz: description.cz,
//         pl: description.pl,
//         sk: description.sk
//       },
//       price,
//       image, image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13, image14, image15, image16,
//       latitude,
//       longitude
//     });
//     await newApartment.save();
//     res.status(201).json(newApartment);
//   } catch (e) {
//     console.error('Error saving Apartment:', e.message || e);
//     res.status(500).json({ error: 'Failed to save Apartment', details: e.message || e });
//   }
// };

// // Dobavljanje pojedinačnog apartmana po ID-ju
// export const GetSingleApartment = async (req, res) => {
//   const { id } = req.params;

//   // Provera validnosti ObjectId
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ error: 'Invalid Apartment ID' });
//   }

//   try {
//     await connect();
//     const apartment = await Apartment.findById(id);
//     if (apartment) {
//       res.status(200).json(apartment);
//     } else {
//       res.status(404).json({ error: 'Apartment not found' });
//     }
//   } catch (e) {
//     console.error('Error fetching Apartment by ID:', e);
//     res.status(500).json({ error: 'Failed to fetch Apartment' });
//   }
// };

// // Brisanje pojedinačnog apartmana po ID-ju
// export const DeleteSingleApartment = async (req, res) => {
//   const { id } = req.params;

//   // Provera validnosti ObjectId
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ error: 'Invalid Apartment ID' });
//   }

//   try {
//     await connect();
//     const deletedApartment = await Apartment.findByIdAndDelete(id);
//     if (deletedApartment) {
//       res.status(204).send();  // Uspešno obrisano, bez sadržaja
//     } else {
//       res.status(404).json({ error: 'Apartment not found' });
//     }
//   } catch (e) {
//     console.error('Error deleting Apartment:', e);
//     res.status(500).json({ error: 'Failed to delete Apartment' });
//   }
// };

// // Ažuriranje pojedinačnog apartmana po ID-ju
// export const UpdateSingleApartment = async (req, res) => {
//   const { id } = req.params;

//   // Provera validnosti ObjectId
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ error: 'Invalid Apartment ID' });
//   }

//   try {
//     await connect();
//     const apartment = await Apartment.findByIdAndUpdate(id, req.body, { new: true });
//     if (apartment) {
//       res.status(200).json(apartment);
//     } else {
//       res.status(404).json({ error: 'Apartment not found' });
//     }
//   } catch (e) {
//     console.error('Error updating Apartment:', e);
//     res.status(500).json({ error: 'Failed to update Apartment' });
//   }
// };
