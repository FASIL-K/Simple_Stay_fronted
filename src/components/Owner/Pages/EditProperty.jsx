// EditProperty.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Layouts/Navbar';
import PropertyForm from '../../../components/Owner/Pages/PostCreation';
import { useParams } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { OwnerUrl } from '../../../constants/constant';
import { PropertyEdit } from '../../../services/ownerApi';

function EditProperty() {
  const { propertyId } = useParams();
  console.log(propertyId,"asdasproperty id");
  const [propertyDetails, setPropertyDetails] = useState(null);
  
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);

  const userId = decode.user_id; 
   useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await PropertyEdit(userId,propertyId)
       
        setPropertyDetails(response.data);

      } catch (error) {
        console.error('Error fetching property details:', error);
      }
    };

    
    fetchData();
  }, [propertyId]);

  return (
    <div>
      {propertyDetails && (
        <PropertyForm isEditing  initialValues={propertyDetails} />
        )}
    </div>
  );
}

export default EditProperty;
