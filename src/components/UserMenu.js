import React from "react";

import { Menu, Text } from "grommet";

import { Avatar } from "./Avatar";

export const UserMenu = ({ user = {}, items = [], ...rest }) => (
  <Menu
    dropAlign={{ bottom: "top" }}
    icon={false}
    items={items.map(item => ({
      ...item,
      label: <Text size="small">{item.label}</Text>,
      onClick: () => {} // no-op
    }))}
    label={<Avatar name={user.settings.displayName} url={user.avatar} />}
    {...rest}
  />
);
