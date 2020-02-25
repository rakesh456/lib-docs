import React, { Fragment } from "react";
import { AddonPanel } from "@storybook/components";
import { useParameter } from "@storybook/api";
import { addons, types } from "@storybook/addons";
import { styled } from "@storybook/theming";

const Content = () => {
  const results = useParameter("react", []); // story's parameter being retrieved here
 
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
          {results.map((i,index) => (
             (index===17)?<Lil>{i}</Lil>: <Li>{i}</Li>
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