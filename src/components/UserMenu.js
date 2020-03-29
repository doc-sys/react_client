import React from "react";

import { Menu, Text } from "grommet";

import { Avatar } from "./Avatar";

import { userService } from "../redux/_services/user.service";

export const UserMenu = ({ user = {}, items = [], ...rest }) => (
  <Menu
    dropAlign={{ bottom: "top" }}
    icon={false}
    items={items.map(item => ({
      ...item,
      label: <Text size="small">{item.label}</Text>,
      onClick: e => {
        switch (e.target.innerHTML) {
          case "Logout":
            userService.logout();
            break;

          case "Plan":
            break;

          default:
            break;
        }
      } // no-op
    }))}
    label={
      <Avatar
        /* name={user.settings ? user.settings.displayName : null} */
        url={user.avatar}
        width={"48px"}
        height={"48px"}
      />
    }
    {...rest}
  />
);
