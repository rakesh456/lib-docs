import React, { Fragment } from "react";
import { AddonPanel } from "@storybook/components";
import { useParameter } from "@storybook/api";
import { addons, types } from "@storybook/addons";
import { styled } from "@storybook/theming";


const Content = () => {
  const results = useParameter("html", []); // story's parameter being retrieved here
 
  const Li = styled.li({
    color:"blue",
    fontSize:"14px",
    padding:"2px 0px 2px 13px",
    fontFamily: "'Trebuchet MS', Helvetica, sans-serif"
  });

  const Lil = styled.li({
    color:"maroon",
    fontSize:"14px",
    padding:"2px 0px 2px 13px",
    fontFamily: "'Trebuchet MS', Helvetica, sans-serif"
  });

  return (
    
    <Fragment>
      {results.length ? (
        <ol>
          { results.map((i) => (
            <Li>{i}</Li>
           
          )) 
          }
        </ol>
      ) : null}
    </Fragment>
  );
};


addons.register("my/design-html", () => {
  addons.add("design-html/panel", {
    title: "HTML",
    type: types.PANEL,
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        <Content/>
      </AddonPanel>
    )
  });
});