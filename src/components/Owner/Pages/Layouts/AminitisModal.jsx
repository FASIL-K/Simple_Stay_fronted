import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Card, Typography } from "@material-tailwind/react";
import table from "../../../../assets/table.jpg";
import { BiFridge } from "react-icons/bi";
import { GiWashingMachine } from "react-icons/gi";
import cctv from "../../../../assets/Cctv.jpeg";
import ac from "../../../../assets/AC.jpeg";
import sofa from '../../../../assets/icon/sofa.svg'
import microwave from "../../../../assets/icon/microwave.svg"
import stove from "../../../../assets/icon/stove.svg"
import gas from "../../../../assets/icon/gas.svg"
import bed from "../../../../assets/icon/bed.svg"
import tv from "../../../../assets/icon/tv.svg"
import lift from "../../../../assets/icon/lift.svg";

const FurnishingCard = ({ amenity, onSelect, selectedAmenities }) => {
  const isSelected = selectedAmenities.some(
    (selectedAmenity) => selectedAmenity.id === amenity.id
  );

  const handleCardClick = () => {
    onSelect(amenity);
  };


  return (
    <Card
      className={`m-2 p-2 w-1/5 shadow-2xl ${isSelected ? 'bg-blue-200' : ''}`}
      onClick={handleCardClick}
    >
      <div className="w-24 h-24  flex flex-col items-center">
        {amenity.icon ? (
          React.cloneElement(amenity.icon, { className: 'w-14 h-14' })
        ) : (
          <img src={amenity.logo} alt="" className="w-14 h-14" />
        )}
        <Typography variant="paragraph" className="mt-2 text-xs">
          {amenity.name}
        </Typography>
      </div>
    </Card>
  );
};

export default function ScrollDialog({ onAmenitiesSelect }) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [selectedAmenities, setSelectedAmenities] = React.useState([]);
  console.log(selectedAmenities, "Selected Amenities");

  const amenitiesData = [
    { id: 1, name: "Dining Table", logo: table, isSelected: false },
    { id: 2, name: "WashingMachine", logo: table, isSelected: false, icon: <GiWashingMachine /> },
    { id: 3, name: "Sofa", logo: table, isSelected: false, icon: <img src={sofa} alt="" className="w-14 h-14" /> },
    { id: 4, name: "Microwave", logo: table, isSelected: false, icon: <img src={microwave} alt="" className="w-14 h-14" /> },
    { id: 5, name: "Stove", logo: table, isSelected: false, icon: <img src={stove} alt="" className="w-14 h-14" /> },
    { id: 6, name: "Fridge", logo: null, isSelected: false, icon: <BiFridge />, },
    { id: 7, name: "Water Purifier", logo: table, isSelected: false },
    { id: 8, name: "Gas Pipeline", logo: table, isSelected: false, icon: <img src={gas} alt="" className="w-14 h-14" /> },
    { id: 9, name: "Ac", logo: ac, isSelected: false },
    { id: 10, name: "Bed", logo: table, isSelected: false, icon: <img src={bed} alt="" className="w-14 h-14" /> },
    { id: 11, name: "TV", logo: table, isSelected: false, icon: <img src={tv} alt="" className="w-14 h-14" /> },
    { id: 12, name: "Wifi", logo: table, isSelected: false },
    { id: 13, name: "Cupboard", logo: table, isSelected: false },
  ];

  const amenitiesData2 = [
    { id: 14, name: "Lift", logo: table, isSelected: false, icon: <img src={lift} alt="" className="w-14 h-14" /> },
    { id: 15, name: "CCTV", logo: cctv, isSelected: false },
    { id: 16, name: "Gym", logo: table, isSelected: false },
    { id: 17, name: "Garden", logo: table, isSelected: false },
    { id: 18, name: "Kids Area", logo: table, isSelected: false },
    { id: 19, name: "Sports", logo: table, isSelected: false },
    { id: 20, name: "Swimming Pool", logo: table, isSelected: false },
    { id: 21, name: "Intercom", logo: table, isSelected: false },
    { id: 22, name: "Gated Community", logo: table, isSelected: false },
    { id: 23, name: "Club House", logo: table, isSelected: false },
    { id: 24, name: "Community Hall", logo: table, isSelected: false },
    { id: 25, name: "Regular Water Supply", logo: table, isSelected: false },
    { id: 26, name: "Power Backup", logo: table, isSelected: false },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAmenitySelection = (amenity) => {
    const isAlreadySelected = selectedAmenities.some(
      (selectedAmenity) => selectedAmenity.id === amenity.id
    );

    if (isAlreadySelected) {
      setSelectedAmenities((prevSelected) =>
        prevSelected.filter((selectedAmenity) => selectedAmenity.id !== amenity.id)
      );
    } else {
      setSelectedAmenities((prevSelected) => [...prevSelected, amenity]);
    }
  };

  const handleSave = () => {
    onAmenitiesSelect(selectedAmenities);
    handleClose();
  };  

  const descriptionElementRef = React.useRef(null);

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>+ Add Furnishings / Amenities</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          Add Furnishings and Amenities
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          ></DialogContentText>
          <Typography className="text-sm opacity-55">Furnishings</Typography>

          <div className="flex flex-wrap">
            {amenitiesData.map((amenity) => (
              <FurnishingCard
                key={amenity.id}
                amenity={amenity}
                onSelect={handleAmenitySelection}
                selectedAmenities={selectedAmenities}
              />
            ))}
          </div>

          <Typography className="text-sm opacity-65 mt-9">Society Amenities</Typography>

          <div className="flex flex-wrap">
            {amenitiesData2.map((amenity) => (
              <FurnishingCard
                key={amenity.id}
                amenity={amenity}
                onSelect={handleAmenitySelection}
                selectedAmenities={selectedAmenities}
              />
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
