import React from "react";
// import clsx from "clsx";
// import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
// import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
// import Divider from "@mat    erial-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Divider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import StarBorder from "@material-ui/icons/StarBorder";

const classes = {
  drawer: {
    // opacity: 0.5,
    borderBottomRightRadius: "25px",
    borderTopRightRadius: "25px",
  },
  list: {
    width: 250,
    flexGrow: 1,
    color: "blue",
    paddingTop: "20%",
  },
  fullList: {
    width: "auto",
  },
  title: {
    // flexGrow: 1,
    textAlign: "center",
    color: "black",
  },
  nested: {
    paddingLeft: "10%",
    color: "Blue",
  },
};

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarItems: ["Login", "Register", "Categories", "Trending"],
      categories: ["Smartphones", "Vehicles", "Sharks", "Whales"],
      expanded: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
  }
  static get propTypes() {
    return {
      open: PropTypes.bool,
      onOpen: PropTypes.func,
      onClose: PropTypes.func,
    };
  }
  handleOpen(value) {
    console.log("opening sidebar");
    console.log(value);
    this.props.onOpen(value);
  }
  handleClose(value) {
    console.log("closing" + value);
    this.props.onClose(value);
  }
  handleExpand() {
    console.log("expanding");
    console.log(this.state.expanded);
    this.setState({ expanded: !this.state.expanded });
  }
  render() {
    const renderExpanded = this.state.expanded ? (
      <ExpandLess />
    ) : (
      <ExpandMore />
    );
    const renderCategoriesOpen = (
      <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {this.state.categories.map((category) => (
            <div key={category}>
              <ListItem button style={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary={category} />
              </ListItem>
            </div>
          ))}
        </List>
      </Collapse>
    );
    return (
      <div
        role="presentation"
        // onClick={() => this.handleClose("closing sidebar")}
        style={classes.drawer}
      >
        <SwipeableDrawer
          style={classes.drawer}
          open={this.props.open}
          // variant="persistent"
          // anchor={anchor}
          // open={state[anchor]}
          onClose={() => this.handleClose("closing sidebar")}
          onOpen={() => this.handleOpen("opening sidebar")}
        >
          {/* {list(anchor)} */}
          <Typography variant="h6" style={classes.title}>
            Switch Space
          </Typography>
          <List style={classes.list}>
            {this.state.sidebarItems.map((text, index) => (
              <div key={text}>
                <ListItem
                  button
                  onClick={() =>
                    text === "Categories" ? this.handleExpand() : null
                  }
                >
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                  {text === "Categories" ? renderExpanded : ""}
                </ListItem>
                {text === "Categories" ? renderCategoriesOpen : ""}
                <Divider></Divider>
              </div>
            ))}
          </List>
        </SwipeableDrawer>
      </div>
    );
  }
}

export default withRouter(Sidebar);
