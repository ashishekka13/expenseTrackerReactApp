import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import RestoreIcon from "@material-ui/icons/Restore";
import { Link } from "react-router-dom";
import routes from "../../extras/menuRoutes";

export const MainListItems = ({ logoutClick }) => {
  const renderMenu = (menuItems) =>
    menuItems.map(({ title, path, img, key }) => (
      <Link to={path} style={{ textDecoration: "none", color: "inherit" }}>
        <ListItem button key={key}>
          <ListItemIcon>
            {" "}
            <i class="material-icons">{img}</i>{" "}
          </ListItemIcon>
          {/* {title} */}
          <ListItemText primary={title} />
        </ListItem>
      </Link>
    ));

  return <div>{renderMenu(routes)}</div>;
};

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Admin Section</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <RestoreIcon />
      </ListItemIcon>
      <ListItemText primary="Activity Log" />
    </ListItem>
  </div>
);
