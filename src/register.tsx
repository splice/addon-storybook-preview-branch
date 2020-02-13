import React, { Fragment } from 'react';
import { addons, types } from '@storybook/addons';
import styled from '@emotion/styled';

import { ADDON_ID } from './constants';
// import { BackgroundSelector } from './containers/BackgroundSelector';
// import { GridSelector } from './containers/GridSelector';

const Label = styled.label`
  color: hotpink;
`;

// const style = css`
//   color: hotpink;
// `;

addons.register(ADDON_ID, api => {
  addons.add(ADDON_ID, {
    title: 'Preview Branch',
    type: types.TOOL,
    match: ({ viewMode }) => viewMode === 'story',
    render: () => (
      <form>
        <Label htmlFor="preview-branch">Branch:</Label>
        <input id="preview-branch" type="text" defaultValue="hello" />
      </form>
    ),
  });
});
