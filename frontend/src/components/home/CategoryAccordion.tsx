import React, { MouseEvent } from "react";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  IconButton,
  ListItemButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { SERVER_BASE } from "../../constants";
import { redirect, useNavigate } from "react-router-dom";

const CategoryAccordion = (props: any) => {
  const navigate = useNavigate();
  const handleDelete = () => {
    fetch(SERVER_BASE + `category/${props.id}/delete`, { method: "POST" })
      .then((res) => {
        if (res.status == 200) {
          props.mutate();
        } else {
          window.alert("Category could not be deleted.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{props.name}</Typography>
        <IconButton size="small" sx={{ ml: "auto" }} onClick={handleDelete}>
          <DeleteIcon></DeleteIcon>
        </IconButton>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {!props.methodsData
            ? null
            : props.methodsData.map((item: any) => (
                <ListItem key={item.id}>
                  <ListItemButton
                    onClick={() => {
                      navigate("/newmethod", { state: { methodId: item.id } });
                    }}
                  >
                    {item.name}
                  </ListItemButton>
                </ListItem>
              ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default CategoryAccordion;
