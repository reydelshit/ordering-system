import Cake from '@/assets/cake.png';
import Cake2 from '@/assets/cake2.png';

import { Button } from './ui/button';
import { useState } from 'react';

type Image = {
  img: string;
}[];

export default function View() {
  const [quantity, setQuantity] = useState(1);
  const [showImage, setShowImage] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);

  const images: Image = [
    {
      img: Cake,
    },
    {
      img: Cake2,
    },
    {
      img: Cake,
    },
    {
      img: Cake2,
    },
  ];

  const handleShowPicture = (index: number) => {
    setShowImage(true);
    setTrackIndex(index);
    console.log(index);
  };

  const ModalPicture = () => {
    return (
      <div
        onClick={() => setShowImage(false)}
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex flex-col justify-center items-center"
      >
        <Button
          className="self-end mr-[10rem]"
          onClick={() => setShowImage(false)}
        >
          Close
        </Button>
        <div className="w-[50%] h-[50%] flex justify-center items-center ">
          <img
            className="object-contain"
            src={images[trackIndex].img!}
            alt="cake"
          />
          B
        </div>
      </div>
    );
  };
  return (
    <div className="w-full h-[70vh] flex p-2 justify-between gap-[4rem] px-[4rem]">
      <div className="w-[100%] flex flex-col justify-center items-center">
        <img className="w-[90%]" src={Cake} alt="cake" />
        <div className="flex w-full justify-center h-[6rem] gap-4">
          {images.map((image, index) => (
            <img
              key={index}
              className="w-[8rem] h-[6.5rem] cursor-pointer"
              src={image.img!}
              alt="cake"
              onClick={() => handleShowPicture(index)}
            />
          ))}
        </div>
      </div>
      {showImage && <ModalPicture />}
      <div className="text-start flex flex-col item-start justify-center w-[100%] p-2">
        <span>CAKE NI BAI</span>
        <h1 className="font-bold text-4xl mb-4">Cake Cake</h1>
        <p className="mb-4 break-words">
          Life is too short to sweat the small stuff and pass up on the simple
          joys. So, why not savor the sweet moments? Delight in a delectable
          piece of cake, where every bite is a celebration of life's little
          pleasures.
        </p>
        <span className="flex items-center gap-5 mb-4">
          <h1 className="font-bold text-3xl">$125.00</h1>
          <p className="p-1 rounded-sm bg-[#3b0d0a] text-white">50%</p>
        </span>
        <div className="flex h-[2.8rem] gap-8">
          <div
            className="w-[50%] f-full rounded-md font-bold bg-gray-100
           flex justify-between items-center px-4"
          >
            <span
              onClick={() => setQuantity(quantity - 1)}
              className="font-bold text-2xl cursor-pointer"
            >
              -
            </span>
            <span>{quantity < 0 ? 0 : quantity}</span>
            <span
              onClick={() => setQuantity(quantity + 1)}
              className="font-bold text-2xl cursor-pointer"
            >
              +
            </span>
          </div>
          <Button className="w-[50%] h-full bg-[#3b0d0a]">
            Add to Order cart
          </Button>
        </div>
      </div>
    </div>
  );
}
