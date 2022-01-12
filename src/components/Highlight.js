import ViewColumnRoundedIcon from "@mui/icons-material/ViewColumnRounded";
import ScatterPlotRoundedIcon from "@mui/icons-material/ScatterPlotRounded";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@mui/styles";
import { Fab } from "@mui/material";
import Interface from "./Interface";
import colors from "../assets/colors";
import { Text } from "react-native";
import NoteAddIcon from '@mui/icons-material/NoteAdd';

const useStyles = makeStyles((theme) => ({
  board: {
    width: "100vw",
    height: "100vh",
  },
  title: {
    position: "fixed",
    fontWeight: "bold",
    top: 20,
    left: 20,
    zIndex: 30000,
    display: "flex",
    alignItems: "center",
  },
  toolbar: {
    position: "fixed",
    fontWeight: "bold",
    top: 20,
    right: 20,
    zIndex: 30000,
  },
}));

const newHighlight = {
  title: "Enter Bucket Name",
  body: "Right Click to Add Insight",
  w: 230,
  h: 250,
  bucket: null,
};

const Highlight = ({ title = "Untitled" }) => {
  const classes = useStyles();

  const [highlights, setHighlights] = useState([]);
  const [edit, setEdit] = useState(false);
  const [bucketView, setBucketView] = useState(false);

  const removeHighlight = (id) => {
    setHighlights(highlights.filter((el) => el.id !== id));
  };

  return (
    <div className={classes.board}>
      <Text style={{fontWeight: 'bold'}}>
        Messaging /
        <Text style={{color: 'grey'}}> Affinity Map</Text>
      </Text>
      <div className={classes.toolbar}>
        <Fab
          color="primary"
          onClick={() => {
            setHighlights([
              ...highlights,
              {
                ...newHighlight,
                id: uuidv4(),
                x: window.innerWidth / 2 - 80,
                y: window.innerHeight / 2 - 100,
                ...colors[parseInt(Math.random() * colors.length)],
              },
            ]);
          }}
          size="medium"
        >
          <NoteAddIcon />
        </Fab>
      </div>
      <Interface
        highlights={highlights}
        onChange={(id, conf) => {
          setHighlights(
            highlights.map((el) => {
              if (el.id === id) return { ...el, ...conf };
              return el;
            })
          );
        }}
        deleteHighlight={removeHighlight}
      />
    </div>
  );
};

export default Highlight;
