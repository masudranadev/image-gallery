import { useState } from "react";
import "./App.css";

const values = [
  {
    id: 1,
    src: "/assets/images/image2.jpeg",
  },
  {
    id: 2,
    src: "/assets/images/image3.jpeg",
  },
  {
    id: 3,
    src: "/assets/images/image1.png",
  },
  {
    id: 4,
    src: "/assets/images/image4.png",
  },
  {
    id: 5,
    src: "/assets/images/image5.png",
  },
  {
    id: 6,
    src: "/assets/images/image6.png",
  },
  {
    id: 7,
    src: "/assets/images/image7.png",
  },
  {
    id: 8,
    src: "/assets/images/image8.png",
  },
  {
    id: 9,
    src: "/assets/images/image9.png",
  },
  {
    id: 10,
    src: "/assets/images/image10.png",
  },
];

function App() {
  const [photos, setPhotos] = useState(values);
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  const togglePhotoSelection = (photoId) => {
    if (selectedPhotos.includes(photoId)) {
      setSelectedPhotos(selectedPhotos.filter((id) => id !== photoId));
    } else {
      setSelectedPhotos([...selectedPhotos, photoId]);
    }
  };

  const deleteSelectedPhotos = () => {
    setPhotos(photos.filter((photo) => !selectedPhotos.includes(photo.id)));
    setSelectedPhotos([]);
  };

  const handleDragStart = (e, photoId) => {
    e.dataTransfer.setData("text/plain", photoId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetPhotoId) => {
    e.preventDefault();
    const draggedPhotoId = e.dataTransfer.getData("text/plain");
    const updatedPhotos = photos.slice();
    const draggedIndex = photos.findIndex(
      (photo) => photo.id === parseInt(draggedPhotoId, 10)
    );
    const targetIndex = photos.findIndex((photo) => photo.id === targetPhotoId);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      const [draggedPhoto] = updatedPhotos.splice(draggedIndex, 1);
      updatedPhotos.splice(targetIndex, 0, draggedPhoto);
      setPhotos(updatedPhotos);
    }
  };

  return (
    <>
      <main className="bg-[#F7F5F2] py-10 min-h-screen">
        <section className="bg-[#EDF2F7] w-full md:w-[1240px] p-5 mx-auto">
          {selectedPhotos.length > 0 && (
            <div className="h-[50px] bg-white flex justify-between items-center px-24 border-b rounded-tl rounded-tr">
              <div className="flex gap-2">
                <input
                  className="w-6 h-6"
                  type="checkbox"
                  name=""
                  checked={selectedPhotos.length}
                />
                <p>
                  {selectedPhotos.length}{" "}
                  {selectedPhotos.length > 1 ? "Files" : "File"} Selected
                </p>
              </div>
              <div>
                <button className="text-red-500" onClick={deleteSelectedPhotos}>
                  Delete Files
                </button>
              </div>
            </div>
          )}
          <div className="bg-white rounded grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 p-5">
            {photos.map((photo, index) => (
              <div
                className={`${
                  index === 0 && "md:col-span-2 md:row-span-2"
                } border-2 rounded hover:bg-gray-300 relative group`}
                key={photo.id}
                draggable={true}
                onDragStart={(e) => handleDragStart(e, photo.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, photo.id)}
              >
                <img src={photo.src} alt="images" />
                <div
                  key={index}
                  className={`absolute ${
                    selectedPhotos.includes(photo.id)
                      ? "opacity-100"
                      : "group-hover:opacity-100"
                  } opacity-0 top-5 left-5`}
                >
                  <input
                    className="w-5 h-5"
                    type="checkbox"
                    id={photo.id}
                    onChange={() => togglePhotoSelection(photo.id)}
                    checked={selectedPhotos.includes(photo.id)}
                  />
                </div>
              </div>
            ))}
            <div
              className={`
              border-2 border-dashed rounded hover:bg-gray-300 flex flex-col justify-center items-center cursor-pointer min-h-[200px]`}
            >
              <img
                className="w-7 h-7"
                src="/assets/images/image.svg"
                alt="images"
              />
              <p className="mt-2">Add Image</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
