import * as React from "react";
import Box from "@mui/material/Box";
import {
  Button,
  Card,
  Grid,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { Instance } from "@popperjs/core";
import { useRef, useState } from "react";
import { SERVER_BASE } from "../../constants";
import useSWR from "swr";
import { fetcher } from "../../api/fetcher";
import ClearIcon from "@mui/icons-material/Clear";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const drawerWidth = 330;

const CommentBox = (props: any) => {
  console.log(props.isImportant)
  const y_pos = props.y_position;
  const [isImportant, setIsImportant] = useState(props.isImportant);
  const [content, setContent] = useState(props.content);
  const [isEdited, setIsEdited] = useState(false);

  const handleUpdateComment = () => {
    fetch(SERVER_BASE + `comment/${props.id}/update`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ content: content, is_important: isImportant }),
    })
      .then((res) => {
        if (res.status == 200) {
          props.mutate();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteComment = (id: number) => {
    fetch(SERVER_BASE + `comment/${id}/delete`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.status == 200) {
          props.mutate();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        textAlign: "center",
        fontSize: 12,
        position: "absolute",
        top: y_pos,
        p: 2,
        right: 0,
        width: "110%",
        height: "auto",
        bgcolor: "white",
        boxShadow: 2,
        zIndex: "1250",
        border: isImportant ? 1 : null,
        borderColor: isImportant ? "red" : null,
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent={"flex-start"}
          alignItems={"center"}
        >
          <Tooltip title="Save Changes" placement="top" arrow>
            <span>
              <IconButton
                disabled={!isEdited}
                size="small"
                onClick={() => {
                  handleUpdateComment();
                  setIsEdited(false);
                }}
              >
                <SaveIcon sx={{ width: 15, height: 15 }} />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Mark as important" placement="top" arrow>
            <IconButton
              size="small"
              onClick={() => {
                setIsImportant(!isImportant);
                setIsEdited(true);
              }}
            >
              <PriorityHighIcon sx={{ width: 15, height: 15 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete comment" placement="top" arrow>
            <IconButton
              size="small"
              onClick={() => {
                handleDeleteComment(props.id);
              }}
            >
              <ClearIcon sx={{ width: 15, height: 15 }} />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid
          item
          display="flex"
          justifyContent={"flex-start"}
          alignItems={"center"}
          xs={12}
          sx={{ mt: 1 }}
        >
          <TextField
            name="content"
            value={content || ""}
            size="small"
            sx={{ width: "100%" }}
            multiline
            onChange={(e) => {
              setIsEdited(true);
              setContent(e.target.value);
            }}
          ></TextField>
        </Grid>
      </Grid>
    </Box>
  );
};

const CommentSidebar = (props: any) => {
  const [comments, setComments] = useState({ comments: [] });

  const { data, error, mutate } = useSWR(
    SERVER_BASE + `method/${props.methodId}/comments`,
    fetcher
  );

  const positionRef = useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const popperRef = useRef<Instance>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent) => {
    positionRef.current = { x: event.clientX, y: event.clientY };

    if (popperRef.current != null) {
      popperRef.current.update();
    }
  };

  const handleCreateComment = () => {
    const y_position =
      positionRef.current.y - cardRef.current!.getBoundingClientRect().y;

    const newComment = {
      content: "",
      y_position: y_position,
      method_id: props.methodId,
    };
    fetch(SERVER_BASE + "comment/create", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newComment),
    })
      .then((res) => {
        if (res.status == 200) {
          mutate();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {/* <Tooltip
        title="Add comment"
        placement="left"
        arrow
        PopperProps={{
          popperRef,
          anchorEl: {
            getBoundingClientRect: () => {
              return new DOMRect(
                cardRef.current!.getBoundingClientRect().x,
                positionRef.current.y,
                0,
                0
              );
            },
          },
        }}
      > */}
      <Box
        sx={{
          position: "relative",
          bgcolor: "#bbdefb",
          width: "100%",
          height: "100%",
        }}
      >
        <Card
          ref={cardRef}
          onMouseMove={handleMouseMove}
          sx={{
            ml: 2,
            backgroundColor: "white",
            height: "100%",
            width: 8,
            zIndex: "1000",
          }}
        >
          <Button
            sx={{ backgroundColor: "white", height: "100%", width: "2%" }}
            onClick={handleCreateComment}
          ></Button>
        </Card>
        {!data
          ? null
          : data.map((comment: any) => (
              <React.Fragment key={comment.id}>
                <CommentBox
                  id={comment.id}
                  content={comment.content}
                  y_position={comment.y_position}
                  isImportant={comment.is_important}
                  mutate={mutate}
                ></CommentBox>
              </React.Fragment>
            ))}
      </Box>
      {/* </Tooltip> */}
    </>
  );
};

export default CommentSidebar;
