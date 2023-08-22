import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import firebaseConfig from './firebaseconfig'; // Check the case here





const Cardata = () => {
    const [carData, setCarData] = useState({
        carcompany: '',
        carimageupload: null,
        carmode: '',
        cardescription: '',
    });

    const handleInputChange = (event) => {
        const { name, value, files } = event.target;

        if (name === 'carimageupload') {
            setCarData((prevData) => ({
                ...prevData,
                [name]: files[0],
            }));
        } else {
            setCarData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        const storage = getStorage(app);

        try {
            if (carData.carimageupload) {
                const storageRef = ref(storage, `car_images/${carData.carimageupload.name}`);
                await uploadBytes(storageRef, carData.carimageupload);
                const imageUrl = await getDownloadURL(storageRef);

                const carDataWithImage = {
                    ...carData,
                    carimageupload: imageUrl,
                };

                await addDoc(collection(db, 'cars'), carDataWithImage);
                console.log('Car data added to Firestore:', carDataWithImage);
                setCarData({
                    carcompany: '',
                    carimageupload: null,
                    carmode: '',
                    cardescription: '',
                });
            } else {
                await addDoc(collection(db, 'cars'), carData);
                console.log('Car data added to Firestore:', carData);
                setCarData({
                    carcompany: '',
                    carimageupload: null,
                    carmode: '',
                    cardescription: '',
                });
            }
        } catch (error) {
            console.error('Error adding car data to Firestore:', error);
        }
    };

    return (
        <div>
            <h1>Enter Car Data</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="carcompany">Car Company:</label>
                <input
                    type="text"
                    id="carcompany"
                    name="carcompany"
                    value={carData.carcompany}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="carmode">Car Mode:</label>
                <input
                    type="text"
                    id="carmode"
                    name="carmode"
                    value={carData.carmode}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="carimageupload">Car Image:</label>
                <input
                    type="file"
                    id="carimageupload"
                    name="carimageupload"
                    accept="image/*"
                    onChange={handleInputChange}
                />

                <label htmlFor="cardescription">Car Description:</label>
                <textarea
                    id="cardescription"
                    name="cardescription"
                    value={carData.cardescription}
                    onChange={handleInputChange}
                    required
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Cardata;
