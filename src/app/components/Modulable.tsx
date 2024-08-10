"use client";

import React, { useRef, useState } from 'react';
import { ResizableBox } from 'react-resizable';
import Draggable from 'react-draggable';
import 'react-resizable/css/styles.css';
import { useZIndex } from './ZIndexContext';

const Modulable = React.forwardRef(({ id, title, children, onClose, initialWidth = 640, initialHeight = 360 }, ref) => {
  const [width, setWidth] = useState(initialWidth); // Etat local pour la largeur
  const [height, setHeight] = useState(initialHeight); // Etat local pour la hauteur
  const [isDragging, setIsDragging] = useState(false);
  const { zIndices, bringToFront } = useZIndex();
  const modulableRef = ref || useRef(null);

  const handleResize = (event, { size }) => {
    setWidth(size.width); // Mise à jour de la largeur de manière indépendante
    setHeight(size.height); // Mise à jour de la hauteur de manière indépendante
  };

  const handleDragStart = () => {
    setIsDragging(true);
    bringToFront(id);
  };

  const handleDragStop = () => {
    setIsDragging(false);
  };

  return (
    <Draggable
      handle=".handle"
      onStart={handleDragStart}
      onStop={handleDragStop}
      nodeRef={modulableRef}
    >
      <div
        ref={modulableRef}
        className={`bg-gray-900 rounded-lg shadow-lg overflow-hidden ${
          isDragging ? 'ring-4 ring-purple-600' : ''
        }`}
      >
        <ResizableBox
          width={width}
          height={height}
          minConstraints={[320, 180]}
          maxConstraints={[1280, 720]}
          onResize={handleResize}
          resizeHandles={['se']}
          className="w-full h-full"
        >
          <div className="h-full w-full">
            <div className="handle bg-gray-800 text-white flex justify-between items-center p-2">
              <span>{title}</span>
              <button onClick={onClose} className="text-gray-400 hover:text-white">✖</button>
            </div>
            <div className="relative w-full h-[calc(100%-30px)]">
              {children}
            </div>
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
});

export default Modulable;
