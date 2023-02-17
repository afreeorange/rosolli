import Links from "../Components/Links";
import Search from "../Components/Search";
import ListeningTime from "../Components/ListeningTime";

const Component = () => {
  return (
    <div className="panel half-width">
      <Search />
      <Links />
      <ListeningTime />
    </div>
  );
};

export default Component;
