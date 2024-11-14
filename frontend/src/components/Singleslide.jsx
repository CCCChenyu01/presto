import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStore } from './dataprovider';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { grey } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ImageIcon from '@mui/icons-material/Image';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import CodeIcon from '@mui/icons-material/Code';
import ReorderIcon from '@mui/icons-material/Reorder';
import StyleIcon from '@mui/icons-material/Style';
import PreviewIcon from '@mui/icons-material/Preview';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const boxStyle = {
  width: '400px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  alignItems: 'center',
  '@media (max-width: 768px)': {
    width: '90%',
    padding: '15px',
  },
  '@media (max-width: 400px)': {
    width: '100%',
    padding: '10px',
  },
};

const SingleSlide = () => {
  const navigate = useNavigate();
  const { id, currentIndex: initialIndex } = useParams();
  const [presentation, setPresentation] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [currentIndex, setCurrentIndex] = useState(Number(initialIndex) || 1);
  const [slideCount, setSlideCount] = useState(1);
  const [errorOpen, setErrorOpen] = useState(false);
  const [textOpen, setTextOpen] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [codeOpen, setCodeOpen] = useState(false);
  const [textareasize, setTextAreaSize] = useState('');
  const [text, setText] = useState('');
  const [fontsize, setfontSize] = useState('');
  const [textcolour, settextColour] = useState('');
  const [imageareasize, setImageAreaSize] = useState('');
  const [imageURL, setimageURL] = useState('');
  const [descriptionalttag, setDescriptionAltTag] = useState('');

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);
  const handleErrorClose = () => setErrorOpen(false);
  const handleTextClose = () => {
    setImageOpen(false);
    setTextAreaSize('')
    setText('')
    setfontSize('')
    settextColour('')
  };    
  const handleTextOpen = () => setTextOpen(true);
  const handleImageClose = () => {
    setImageOpen(false);
    setImageAreaSize('')
    setimageURL('')
    setDescriptionAltTag('')
  };    
  const handleImageOpen = () => setImageOpen(true);
  const handleVideoClose = () => setVideoOpen(false);
  const handleVideoOpen = () => setVideoOpen(true);
  const handleCodeClose = () => setCodeOpen(false);
  const handleCodeOpen = () => setCodeOpen(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getPresentation = () => {
    getStore().then(data => {
      const singlePresentation = data.store[id];
      setPresentation(singlePresentation);
      const slides = Object.keys(singlePresentation).filter(key => key !== 'title');
      setSlideCount(slides.length);
    });
  };

  useEffect(() => {
    getPresentation();
    navigate(`/presentation/${id}/${currentIndex}`, { replace: true });
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') goToPrevious();
      if (event.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [id, currentIndex, slideCount]);

  const handleText = () => {
    console.log("Text option selected");
    const textBox = {
      size: textareasize,
      text: text,
      fontsize: fontsize,
      color: textcolour,
      position: { x: 0, y: 0 },
    };

    getStore().then(data => {
      const presentationdata = data.store[id];
      if (!presentationdata[currentIndex].elements) {
        presentationdata[currentIndex].elements = [];
      }
      presentationdata[currentIndex].elements.push(textBox);

      const userToken = localStorage.getItem('token');
      const url = 'http://localhost:5005/store';
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ store: data.store }),
      })
        .then(res => res.json())
        .then(() => {
          getPresentation();
          handleTextClose();
        });
    });
  };

  const currentElements = presentation[currentIndex]?.elements || [];
  console.log(currentElements);

  const handleImage = () => {
    console.log("Image option selected");
    const imageElement = {
      size: imageareasize,
      img: imageURL,
      tag: descriptionalttag,
      position: { x: 0, y: 0 },
    };
    console.log(imageElement)

    getStore().then(data => {
      const presentationdata = data.store[id];
      console.log(presentationdata)

      if (!presentationdata[currentIndex].elements) {
        presentationdata[currentIndex].elements = [];
      }
      presentationdata[currentIndex].elements.push(imageElement);

      if (!presentationdata.thumbnail) {
        presentationdata.thumbnail = imageURL;
      }

      const userToken = localStorage.getItem('token');
      const url = 'http://localhost:5005/store';
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ store: data.store }),
      })
        .then(res => res.json())
        .then(() => {
          getPresentation();
          console.log("Updated presentation data:", presentationdata);

