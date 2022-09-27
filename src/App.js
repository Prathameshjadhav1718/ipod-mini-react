import { useEffect, useState } from "react";
import "./App.css";
import "./components/screen.css";
import Buttons from "./components/Buttons";
import zingtouch from "zingtouch";


// Selects a single item from the list.
let index = 0,
  range = 0,
  visibility = true,
  selectItem;

  // Creates a new app.

function App() {
  const [list, setList] = useState([
    { listItem: "Songs", state: true, id: 0 },
    { listItem: "Workout", state: false, id: 1 },
    { listItem: "Playlist", state: false, id: 2 },
    { listItem: "Games", state: false, id: 3 },
    { listItem: "Spiritual", state: false, id: 4 },
  ]);

  // Sets the active item to the active state.
  const [activeItem, setActiveItem] = useState([]);

  // Rotate the button wheel
  useEffect(() => {
    let buttonWheel = document.getElementById("button-wheel");
    let activeRegion = zingtouch.Region(buttonWheel);
    activeRegion.bind(buttonWheel, "rotate", function (event) {
      range += Math.floor(event.detail.distanceFromLast);

      // Returns a list of items and their state.
      if (range > 70) {
        setList((prevList) => {
          return prevList.map((item) => {
            if (item.id === index) {
              return { ...item, state: true };
            } else {
              return { ...item, state: false };
            }
          });
        });
        index++;
        range = 0;

        if (index === 5) {
          index = 0;
        }
      } else if (range < -100) {
        index--;

        if (index < 0) {
          index = 4;
        }
        setList((prevList) => {
          return prevList.map((item) => {
            if (item.id === index) {
              return { ...item, state: true };
            } else {
              return { ...item, state: false };
            }
          });
        });
        range = 0;
      }
    });
  }, []);

  // select button position at middle
  const handleSelect = () => {
    selectItem = list.filter((item) => item.state === true);
    const title = selectItem[0].listItem;

    if (title === "Songs") {
      setActiveItem({
        ...selectItem,
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHrj6oy7e426gibXngTrohsvrtCRxC_9Vf_w&usqp=CAU",
      });
    } else if (title === "Spiritual") {
      setActiveItem({
        ...selectItem,
        src: "https://www.shutterstock.com/image-illustration/man-soul-yoga-lotus-pose-260nw-1958378269.jpg",
      });
    } else if (title === "Workout") {
      setActiveItem({
        ...selectItem,
        src: "https://media.istockphoto.com/photos/be-as-strong-as-you-were-born-to-be-picture-id1279902517?k=20&m=1279902517&s=612x612&w=0&h=RlVc-49u3noWYHy0XE4IHvRuKD3_kfelklxIGrYz9bI=",
      });
    } else if (title === "Games") {
      setActiveItem({
        ...selectItem,
        src: "https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400",
      });
    } else if (title === "Playlist") {
      setActiveItem({
        ...selectItem,
        src: "https://www.smartrapper.com/wp-content/uploads/2019/08/playlist-push-review-980x492.png",
      });
    }

    visibility = false;
  };

  // Sets the active menu item.
  const handleMenu = () => {
    visibility = true;
    setActiveItem([]);
  };

  // render function
  return (
    <div className="App">
      <div className="screen">
        {/* side-menu section */}
        <div
          style={!visibility ? { display: "none" } : {}}
          className="side-menu"
        >
          {list.map((item) => (
            <li key={item.id} className={item.state ? "active" : ""}>
              {item.listItem}
            </li>
          ))}
        </div>

        {/* display section */}
        <div className="display">
          <h2>{visibility ? "" : activeItem[0].listItem}</h2>
          {activeItem.src && (
            <img src={visibility ? "" : activeItem.src} alt="" />
          )}
        </div>
      </div>

      {/* Button Component */}
      <Buttons handleSelect={handleSelect} handleMenu={handleMenu} />
    </div>
  );
}

export default App;
