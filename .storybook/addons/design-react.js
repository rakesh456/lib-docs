import React, { Fragment } from "react";
import { AddonPanel } from "@storybook/components";
import { useParameter } from "@storybook/api";
import { addons, types } from "@storybook/addons";


const Content = () => {
  const results = useParameter("react", []); // story's parameter being retrieved here
 
  return (
    
    <Fragment>
      {results.length ? (
        <ol>
          {results.map(i => (
            <li>{i}</li>
          ))}
        </ol>
      ) : null}
    </Fragment>
  );
};


addons.register("my/design-react", () => {
  addons.add("design-react/panel", {
    title: "react",
    type: types.PANEL,
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        <Content/>
      </AddonPanel>
    )
  });
});