import React from "react";

import { Box } from "grommet";

export const Avatar = ({ name, url, ...rest }) => (
  <Box
    a11yTitle={`${name} avatar`}
    height="64px"
    width="64px"
    round="full"
    background={url ? `url(data:image/png;base64,${url})` : { color: "brand" }}
    {...rest}
  />
);
