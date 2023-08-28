import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton: React.FC = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#b0b0b0"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="159" y="42" rx="0" ry="0" width="2" height="0" />
    <circle cx="140" cy="125" r="120" />
    <rect x="-1" y="262" rx="9" ry="9" width="280" height="24" />
    <rect x="0" y="300" rx="10" ry="10" width="280" height="70" />
    <rect x="1" y="386" rx="10" ry="10" width="95" height="54" />
    <rect x="108" y="386" rx="12" ry="12" width="172" height="53" />
  </ContentLoader>
);

export default Skeleton;
